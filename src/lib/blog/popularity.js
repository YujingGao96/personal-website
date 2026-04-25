import {Redis} from "@upstash/redis";
import {POPULAR_POST_WINDOW_DAYS, VIEW_COUNTER_TTL_DAYS, getRedisToken, getRedisUrl, hasRedisConfig} from "./config";

let redisClient = null;
let cachedPopularity = null;

function getRedis() {
    if (!hasRedisConfig()) {
        return null;
    }

    if (!redisClient) {
        redisClient = new Redis({
            url: getRedisUrl(),
            token: getRedisToken(),
            enableTelemetry: false,
        });
    }

    return redisClient;
}

function formatDay(date) {
    return date.toISOString().slice(0, 10);
}

function getDayKey(date) {
    return `blog:views:${formatDay(date)}`;
}

function getDays(days) {
    return Array.from({length: days}, (_, index) => {
        const date = new Date();
        date.setUTCDate(date.getUTCDate() - index);
        return date;
    });
}

export async function recordPostView(slug) {
    const redis = getRedis();

    if (!redis || !slug) {
        return {tracked: false};
    }

    const key = getDayKey(new Date());
    await redis.hincrby(key, slug, 1);
    await redis.expire(key, VIEW_COUNTER_TTL_DAYS * 24 * 60 * 60);

    cachedPopularity = null;

    return {tracked: true};
}

export async function getPopularityScores(days = POPULAR_POST_WINDOW_DAYS) {
    const redis = getRedis();

    if (!redis) {
        return {};
    }

    const now = Date.now();

    if (cachedPopularity && cachedPopularity.expiresAt > now && cachedPopularity.days === days) {
        return cachedPopularity.scores;
    }

    const scoreMap = {};
    const dailyCounts = await Promise.all(
        getDays(days).map((date) => redis.hgetall(getDayKey(date)).catch(() => null)),
    );

    for (const counts of dailyCounts) {
        if (!counts) {
            continue;
        }

        for (const [slug, count] of Object.entries(counts)) {
            scoreMap[slug] = (scoreMap[slug] || 0) + Number(count || 0);
        }
    }

    cachedPopularity = {
        days,
        scores: scoreMap,
        expiresAt: now + 6 * 60 * 60 * 1000,
    };

    return scoreMap;
}

export async function rankPostsByPopularity(posts, limit = 4) {
    const scores = await getPopularityScores();
    const hasScores = Object.values(scores).some((score) => score > 0);
    const sorted = [...posts].sort((a, b) => {
        if (hasScores) {
            const scoreDiff = (scores[b.slug] || 0) - (scores[a.slug] || 0);

            if (scoreDiff !== 0) {
                return scoreDiff;
            }
        }

        return (b.publishedAt || b.updatedAt || "").localeCompare(a.publishedAt || a.updatedAt || "");
    });

    return sorted.slice(0, limit).map((post) => ({
        ...post,
        viewCount: scores[post.slug] || 0,
    }));
}
