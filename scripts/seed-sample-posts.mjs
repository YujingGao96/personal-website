#!/usr/bin/env node

/**
 * Seed script: creates sample blog posts in Vercel Blob.
 *
 * Usage:
 *   1. Make sure .env.local is loaded (e.g. via `vercel env pull`)
 *   2. Run: node scripts/seed-sample-posts.mjs
 *
 * Posts are created as "published" so they appear on /blog immediately.
 * Re-running is safe — existing slugs are overwritten.
 */

import {put, list} from "@vercel/blob";
import matter from "gray-matter";

const BLOG_POSTS_PREFIX = "blog/posts/";
const BLOG_INDEX_PATH = "blog/index.json";

function getToken() {
    return (
        process.env.BLOG_CONTENT_BLOB_READ_WRITE_TOKEN ||
        process.env.BLOG_CONTENT_READ_WRITE_TOKEN ||
        process.env.BLOB_READ_WRITE_TOKEN ||
        ""
    );
}

const token = getToken();
if (!token) {
    console.error("No blob token found. Run `vercel env pull` first.");
    process.exit(1);
}

const SAMPLE_POSTS = [
    {
        metadata: {
            title: "Kubernetes Networking Deep Dive",
            slug: "kubernetes-networking-deep-dive",
            summary: "Understanding pod-to-pod communication, ingress controllers, and service mesh patterns in production clusters.",
            labels: ["Cloud", "DevOps", "Kubernetes"],
            keywords: ["k8s", "networking", "ingress", "service mesh", "pods"],
            status: "published",
            publishedAt: "2026-04-18T10:00:00.000Z",
            updatedAt: "2026-04-18T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 8,
        },
        content: `Kubernetes networking is one of those topics that seems simple on the surface but hides a lot of nuance. Every pod gets its own IP address, every service gets a stable DNS name, and traffic just... flows. Until it doesn't.

## The Flat Network Model

Kubernetes mandates that all pods can communicate with each other without NAT. This is the "flat network" model and it's one of the most important design decisions in the entire system. It means that your application code doesn't need to care about the underlying network topology.

In practice, this is implemented by CNI (Container Network Interface) plugins like Calico, Cilium, or Flannel. Each takes a different approach:

- **Calico** uses BGP to distribute routes across nodes
- **Cilium** leverages eBPF for high-performance, kernel-level packet processing
- **Flannel** creates a simple overlay network using VXLAN

## Service Discovery and DNS

Every Kubernetes service gets a DNS entry in the form \`<service>.<namespace>.svc.cluster.local\`. CoreDNS handles the resolution, and it's surprisingly fast — most queries resolve in under a millisecond.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: my-api
  namespace: production
spec:
  selector:
    app: my-api
  ports:
    - port: 80
      targetPort: 8080
\`\`\`

This service is reachable at \`my-api.production.svc.cluster.local\` from anywhere in the cluster.

## Ingress Controllers

Getting traffic into the cluster is where ingress controllers come in. NGINX Ingress Controller is the most common, but Traefik and Envoy-based solutions like Contour are gaining ground.

The key insight is that an ingress controller is just a reverse proxy that watches the Kubernetes API for Ingress resources and reconfigures itself accordingly. It's a beautiful pattern — declarative infrastructure at its finest.

## Service Mesh: Do You Need One?

Service meshes like Istio and Linkerd add a sidecar proxy to every pod, giving you mTLS, traffic splitting, retries, and observability for free. The trade-off is complexity and resource overhead.

My rule of thumb: if you have fewer than 20 services, you probably don't need a service mesh. If you have more than 50, you probably do. In between, it depends on your team's maturity and your observability requirements.

## What I've Learned

After running Kubernetes in production for three years, the networking layer is where most subtle bugs hide. Misconfigured network policies, DNS caching issues, and conntrack table exhaustion have all bitten me at least once. The best defense is understanding the fundamentals deeply — once you know how packets actually flow through the system, debugging becomes much more tractable.`,
    },
    {
        metadata: {
            title: "Building a Type-Safe API with tRPC",
            slug: "building-type-safe-api-trpc",
            summary: "End-to-end type safety without code generation — a practical walkthrough of tRPC in a Next.js monorepo.",
            labels: ["TypeScript", "Backend", "API"],
            keywords: ["trpc", "type safety", "next.js", "monorepo", "typescript"],
            status: "published",
            publishedAt: "2026-04-10T10:00:00.000Z",
            updatedAt: "2026-04-10T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 6,
        },
        content: `Every API I've built in the last decade has had the same fundamental problem: the client and server disagree about the shape of the data. You change a field name on the backend, deploy, and the frontend breaks in production because nobody updated the fetch call.

tRPC eliminates this entire class of bugs by sharing TypeScript types between your client and server at build time. No code generation, no OpenAPI specs, no GraphQL schemas. Just TypeScript.

## The Setup

In a Next.js monorepo, the setup is surprisingly minimal. You define your router on the server:

\`\`\`typescript
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  posts: t.router({
    list: t.procedure
      .input(z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      }))
      .query(async ({ input }) => {
        const posts = await db.post.findMany({
          take: input.limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
        });

        return {
          items: posts.slice(0, input.limit),
          nextCursor: posts[input.limit]?.id,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
\`\`\`

And on the client, you get full autocomplete and type checking:

\`\`\`typescript
const { data } = trpc.posts.list.useQuery({ limit: 10 });
// data is fully typed: { items: Post[]; nextCursor?: string }
\`\`\`

## Zod for Runtime Validation

One of tRPC's best features is its integration with Zod. Every input is validated at runtime, so you get both compile-time type safety and runtime protection against malformed requests. This is the best of both worlds.

## Mutations and Optimistic Updates

tRPC's mutation support works seamlessly with React Query under the hood:

\`\`\`typescript
const createPost = trpc.posts.create.useMutation({
  onSuccess: () => {
    utils.posts.list.invalidate();
  },
});
\`\`\`

Optimistic updates follow the same React Query patterns you already know, but with full type safety on the update payload.

## When Not to Use tRPC

tRPC is fantastic for internal APIs in a TypeScript monorepo. But if you need to expose a public API that non-TypeScript clients will consume, REST or GraphQL is still the better choice. tRPC is a tool for teams, not for ecosystems.

## The Verdict

After six months of using tRPC in production, I can't imagine going back to manually typed fetch calls. The developer experience improvement is dramatic — catching API contract violations at build time instead of in production is genuinely transformative.`,
    },
    {
        metadata: {
            title: "Observability in Distributed Systems",
            slug: "observability-distributed-systems",
            summary: "Traces, metrics, and logs — the three pillars and how to wire them together with OpenTelemetry.",
            labels: ["Cloud", "DevOps", "Monitoring"],
            keywords: ["observability", "opentelemetry", "traces", "metrics", "distributed systems"],
            status: "published",
            publishedAt: "2026-03-28T10:00:00.000Z",
            updatedAt: "2026-03-28T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 10,
        },
        content: `Last month, a request to our checkout service started timing out intermittently. The service itself was healthy — CPU and memory were fine, error rates were low. But 2% of requests were taking 30 seconds instead of 300 milliseconds. Without distributed tracing, we would have spent days bisecting the problem. With it, we found the root cause in 20 minutes.

## The Three Pillars

Observability rests on three pillars, and you need all three:

**Logs** tell you what happened. They're the most familiar tool, but they're also the hardest to scale. Structured logging (JSON, not plaintext) is non-negotiable in a distributed system.

**Metrics** tell you how things are behaving in aggregate. They're cheap to collect and query, and they're your first line of defense for alerting. The RED method (Rate, Errors, Duration) is a good starting framework.

**Traces** tell you why something happened by following a single request across service boundaries. This is the pillar that most teams adopt last, but it's arguably the most valuable.

## OpenTelemetry: The Standard

OpenTelemetry has won. It's the CNCF project that unified OpenTracing and OpenCensus, and it provides a vendor-neutral SDK for instrumenting your code.

\`\`\`javascript
const { trace } = require('@opentelemetry/api');

const tracer = trace.getTracer('checkout-service');

async function processOrder(orderId) {
  return tracer.startActiveSpan('processOrder', async (span) => {
    span.setAttribute('order.id', orderId);

    try {
      await validateInventory(orderId);
      await chargePayment(orderId);
      await sendConfirmation(orderId);
      span.setStatus({ code: SpanStatusCode.OK });
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      throw error;
    } finally {
      span.end();
    }
  });
}
\`\`\`

## Context Propagation

The magic of distributed tracing is context propagation. When Service A calls Service B, the trace ID and span ID are passed in HTTP headers (typically using the W3C Trace Context format). This is what allows you to see the entire request path across dozens of services in a single waterfall view.

## The Cost Question

Observability is expensive. Datadog, New Relic, and Honeycomb all charge based on data volume, and a busy microservices architecture can generate terabytes of telemetry per day.

My approach: sample traces aggressively (1-5% in production), but always capture traces for errors and slow requests. Metrics are cheap — collect everything. Logs should be structured and filtered at the source.

## What Changed Our Debugging Culture

The biggest impact wasn't technical — it was cultural. Once engineers could see a request flow through the entire system in a single view, they started thinking about distributed systems differently. Instead of "my service is fine, the problem must be somewhere else," the conversation became "let me trace this request and find exactly where the latency is coming from."

That shift in mindset is worth more than any tool.`,
    },
    {
        metadata: {
            title: "The Mental Model Behind Rust's Borrow Checker",
            slug: "rust-borrow-checker-mental-model",
            summary: "Ownership and lifetimes demystified: once you see the invariants, the compiler becomes your best friend.",
            labels: ["Rust", "Systems"],
            keywords: ["rust", "borrow checker", "ownership", "lifetimes", "memory safety"],
            status: "published",
            publishedAt: "2026-03-15T10:00:00.000Z",
            updatedAt: "2026-03-15T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 12,
        },
        content: `Everyone who learns Rust goes through the same arc: excitement about the language's promise, frustration with the borrow checker, and eventually a moment of clarity where the ownership model clicks. I want to try to shortcut that journey by sharing the mental model that made it click for me.

## The Core Invariant

Rust's ownership system enforces one simple rule at compile time: **at any given point, a value is either being read by many references or written by exactly one, but never both.**

That's it. Every borrow checker error you've ever seen is a violation of this invariant. Once you internalize this, the compiler's error messages transform from cryptic roadblocks into helpful guardrails.

## Ownership as a Physical Metaphor

Think of a Rust value as a physical book. When you create a value, you own the book. You can:

1. **Read it yourself** — this is using an owned value
2. **Lend it to someone** — this is a shared reference (\`&T\`)
3. **Give someone your only copy to annotate** — this is a mutable reference (\`&mut T\`)
4. **Give the book away permanently** — this is a move

What you can't do is lend the book to five people for reading while simultaneously giving someone else permission to scribble in the margins. That would be chaos — and it's exactly the kind of data race that Rust prevents.

## Lifetimes Are Scopes

Lifetimes are the most intimidating part of Rust's type system, but they're conceptually simple: a lifetime is just the scope during which a reference is valid.

\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

The \`'a\` annotation says: "the returned reference will live at least as long as the shorter of the two input references." The compiler uses this to ensure you never use a dangling reference.

## Common Patterns That Fight the Borrow Checker

### Pattern 1: Iterating and Mutating

\`\`\`rust
// This won't compile — you can't mutate while iterating
for item in &mut vec {
    if some_condition(item) {
        vec.push(new_item); // Error: can't borrow vec as mutable
    }
}

// Solution: collect indices first, then mutate
let indices: Vec<usize> = vec.iter()
    .enumerate()
    .filter(|(_, item)| some_condition(item))
    .map(|(i, _)| i)
    .collect();

for i in indices.into_iter().rev() {
    vec.insert(i + 1, new_item);
}
\`\`\`

### Pattern 2: Self-Referential Structs

If you find yourself wanting a struct that contains a reference to its own data, stop. This is the one pattern that Rust makes genuinely hard, and for good reason — self-referential data is a common source of use-after-free bugs in C++.

Use \`Pin\`, an arena allocator, or restructure your data to avoid the self-reference.

## The Compiler as Collaborator

After months of fighting the borrow checker, something shifted. I started designing my data structures and APIs with the ownership model in mind from the beginning. The compiler stopped being an obstacle and became a design partner — every error message was pointing out a real design flaw, not an arbitrary restriction.

The secret to Rust isn't learning to satisfy the borrow checker. It's learning to think in terms of ownership, and letting the compiler verify that your thinking is correct.`,
    },
    {
        metadata: {
            title: "DynamoDB Single-Table Design",
            slug: "dynamodb-single-table-design",
            summary: "Access patterns first, schema second — a counterintuitive approach that scales to billions of items.",
            labels: ["AWS", "Database", "Cloud"],
            keywords: ["dynamodb", "nosql", "single table", "access patterns", "aws"],
            status: "published",
            publishedAt: "2026-03-02T10:00:00.000Z",
            updatedAt: "2026-03-02T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 9,
        },
        content: `DynamoDB single-table design is the most counterintuitive database pattern I've ever learned. You take all your entities — users, orders, products, reviews — and jam them into one table with generic partition and sort keys. It sounds like madness until you understand why it works.

## Why Single Table?

DynamoDB charges you per table for on-demand capacity and per-request for provisioned capacity. But the real reason for single-table design isn't cost — it's performance. When related entities share a partition key, you can fetch them all in a single query instead of making multiple requests to different tables.

## Access Patterns Drive Everything

In relational databases, you design the schema first and figure out queries later. In DynamoDB, you flip that: **list every access pattern your application needs, then design the key schema to support them.**

Here's an example for an e-commerce app:

| Access Pattern | PK | SK |
|---|---|---|
| Get user by ID | \`USER#123\` | \`PROFILE\` |
| List user's orders | \`USER#123\` | \`ORDER#2026-03-01#abc\` |
| Get order details | \`ORDER#abc\` | \`DETAIL\` |
| Get order items | \`ORDER#abc\` | \`ITEM#sku-1\` |

## GSI Overloading

Global Secondary Indexes (GSIs) are the other key tool. By creating a GSI with a different partition key, you enable entirely different query patterns on the same data.

\`\`\`javascript
// GSI1: query orders by status
// GSI1PK: STATUS#shipped
// GSI1SK: 2026-03-01T10:00:00Z

const params = {
  TableName: 'MyTable',
  IndexName: 'GSI1',
  KeyConditionExpression: 'GSI1PK = :status AND GSI1SK > :since',
  ExpressionAttributeValues: {
    ':status': 'STATUS#shipped',
    ':since': '2026-02-01T00:00:00Z',
  },
};
\`\`\`

## The Trade-Offs

Single-table design isn't free. The downsides are real:

- **Steeper learning curve** — new team members will be confused by the generic key names
- **Harder to evolve** — adding a new access pattern sometimes requires a new GSI or even a data migration
- **CloudFormation complexity** — your table definition becomes a sprawling artifact

For small applications with simple access patterns, separate tables are fine. Single-table design shines when you have complex, interrelated entities and need predictable, single-digit-millisecond latency at any scale.

## Lessons from Production

After running a single-table DynamoDB setup serving 50 million requests per day, here's what I wish I'd known:

1. **Hot partitions are real.** If one partition key gets too much traffic, DynamoDB will throttle it. Design your keys to distribute load evenly.
2. **TTL is your friend.** Use DynamoDB's built-in TTL to automatically clean up expired data instead of running batch deletion jobs.
3. **Always project only the attributes you need** in GSIs. Full projections waste storage and increase write costs.

The initial investment in access pattern analysis pays dividends for years. Take the time to get it right.`,
    },
    {
        metadata: {
            title: "React Server Components Explained",
            slug: "react-server-components-explained",
            summary: "What RSC actually means for the component model, data fetching, and bundle sizes — with concrete examples.",
            labels: ["React", "Frontend", "TypeScript"],
            keywords: ["react", "rsc", "server components", "next.js", "frontend"],
            status: "published",
            publishedAt: "2026-02-20T10:00:00.000Z",
            updatedAt: "2026-02-20T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 7,
        },
        content: `React Server Components changed my mental model of React more than hooks did. The core idea is deceptively simple: some components run only on the server and never ship JavaScript to the client. But the implications ripple through everything — data fetching, state management, bundle sizes, and how you architect an application.

## The Mental Model

In the RSC world, components fall into two categories:

**Server Components** (the default in Next.js App Router) run only on the server. They can directly access databases, read files, call internal APIs. Their code is never sent to the browser. They cannot use state, effects, or browser APIs.

**Client Components** (marked with \`"use client"\`) are the React you already know. They ship JavaScript to the browser and can use all of React's interactive features.

\`\`\`tsx
// Server Component — no "use client" directive
async function BlogPost({ slug }) {
  const post = await db.post.findUnique({ where: { slug } });

  return (
    <article>
      <h1>{post.title}</h1>
      <LikeButton postId={post.id} />  {/* Client Component */}
      <MarkdownRenderer content={post.body} />
    </article>
  );
}
\`\`\`

The \`BlogPost\` component runs on the server. The \`LikeButton\` is a client component that handles interactivity. The markdown renderer could be either, depending on whether it needs browser APIs.

## The Bundle Size Win

This is where RSC gets exciting. If your \`MarkdownRenderer\` uses a 50KB markdown parsing library, and it's a server component, that library is never shipped to the browser. The client only receives the rendered HTML.

In a traditional React app, every dependency in every component ends up in the JavaScript bundle. With RSC, only client component dependencies are bundled. For content-heavy sites, this can reduce bundle sizes by 30-60%.

## Data Fetching Without Waterfalls

Server components can be async, which means data fetching is just... function calls:

\`\`\`tsx
async function Dashboard() {
  const [user, stats, notifications] = await Promise.all([
    getUser(),
    getStats(),
    getNotifications(),
  ]);

  return (
    <div>
      <UserHeader user={user} />
      <StatsPanel stats={stats} />
      <NotificationList notifications={notifications} />
    </div>
  );
}
\`\`\`

No \`useEffect\`. No loading states for initial data. No client-side waterfalls. The data is fetched on the server, in parallel, and the fully rendered HTML is sent to the client.

## The Composition Pattern

The most powerful pattern is composing server and client components:

\`\`\`tsx
// Server Component
async function ProductPage({ id }) {
  const product = await getProduct(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Pass server data to client component as props */}
      <AddToCartButton
        productId={product.id}
        price={product.price}
      />
    </div>
  );
}
\`\`\`

The server fetches the data, renders the static parts, and passes only the necessary props to the interactive client component. It's a clean separation of concerns.

## What I Changed in My Architecture

After adopting RSC, I restructured my applications around a simple principle: **push client boundaries as deep as possible.** Pages and layouts are server components. Only the interactive leaf nodes — buttons, forms, dropdowns — are client components.

This gives you the best of both worlds: fast initial loads with server-rendered content, and rich interactivity where you need it.`,
    },
    {
        metadata: {
            title: "Lessons from Running a Side Project for 2 Years",
            slug: "lessons-side-project-two-years",
            summary: "What worked, what didn't, and what I'd tell myself on day one if I could go back.",
            labels: ["Reflections", "Product"],
            keywords: ["side project", "lessons", "product", "engineering", "reflections"],
            status: "published",
            publishedAt: "2026-02-05T10:00:00.000Z",
            updatedAt: "2026-02-05T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 5,
        },
        content: `Two years ago, I launched a small developer tool as a side project. It started as a weekend hack to scratch my own itch and grew into something that a few thousand people use regularly. Here's what I learned.

## Ship the Ugly Version

My first instinct was to build a beautiful, polished product before showing it to anyone. I spent three months on the initial version — custom design system, comprehensive test suite, CI/CD pipeline, the works.

Then I launched and realized nobody cared about my pixel-perfect buttons. They cared about whether the tool solved their problem. The lesson: get something functional in front of real users as fast as possible. Polish is a luxury you earn after validation.

## Pick Boring Technology

I initially built the backend in Rust because I was excited about the language. Six months later, I rewrote it in Node.js because I was spending more time fighting the build system than shipping features.

For side projects, optimize for developer velocity above everything else. Use the language and framework you're fastest in. Save the exotic technology for learning projects where shipping speed doesn't matter.

## Marketing Is the Hard Part

Building the product took 20% of my total time. Getting people to find and use it took the other 80%. I tried:

- **Writing blog posts** about the problem the tool solves — this was by far the most effective
- **Posting on Hacker News** — hit the front page once, got a spike of traffic that mostly didn't convert
- **Twitter/X threads** — modest, steady growth
- **Product Hunt launch** — got some initial users but the long tail was minimal

The takeaway: content marketing (blog posts, tutorials, documentation) compounds over time. Everything else is a one-time spike.

## Revenue Is Clarifying

I added a paid tier after year one, and it changed how I thought about every decision. When people pay you money, their feedback carries more weight. Feature requests from paying customers are almost always better than feature requests from free users, because paying customers have a real workflow they're trying to optimize.

## What I'd Do Differently

If I started over, I'd spend the first week building a landing page with a waitlist, write three blog posts about the problem, and only start coding once I had 100 email signups. Building first and marketing later is the classic engineer trap, and I fell right into it.

The most important skill for a side project isn't technical ��� it's the discipline to ship something imperfect and iterate based on real feedback. The code doesn't matter if nobody uses it.`,
    },
    {
        metadata: {
            title: "S3: More Than Just a Storage Bucket",
            slug: "s3-more-than-storage",
            summary: "Exploring Amazon S3 storage patterns and best practices for modern cloud architecture.",
            labels: ["Cloud", "AWS"],
            keywords: ["s3", "aws", "storage", "cloud", "architecture"],
            status: "published",
            publishedAt: "2026-04-25T10:00:00.000Z",
            updatedAt: "2026-04-25T10:00:00.000Z",
            coverImageUrl: "",
            readingTime: 6,
        },
        content: `Amazon S3 launched in 2006 as "simple storage service," but twenty years later it's anything but simple. It's the backbone of the modern internet — Netflix streams from it, Airbnb stores images on it, and half the startups in the world use it as their primary data lake. Here's what I've learned about using it well.

## The Durability Promise

S3 Standard offers 99.999999999% durability (eleven nines). To put that in perspective, if you store 10 million objects, you can statistically expect to lose one object every 10,000 years. This isn't marketing fluff — it's achieved through automatic replication across at least three Availability Zones.

This durability guarantee is why S3 is the default choice for anything you can't afford to lose.

## Storage Classes Matter

Most teams use S3 Standard for everything, but the storage class tiers can save significant money:

- **S3 Standard** — hot data, frequent access. This is the default.
- **S3 Intelligent-Tiering** — automatically moves objects between tiers based on access patterns. Set it and forget it.
- **S3 Glacier Instant Retrieval** — for archives you rarely access but need immediately when you do.
- **S3 Glacier Deep Archive** — the cheapest option at $0.00099/GB/month, but retrieval takes 12-48 hours.

For our production setup, we save about 40% on storage costs by using Intelligent-Tiering for user uploads and Glacier for compliance archives.

## Key Naming and Performance

S3 used to have a limitation where keys with sequential prefixes (like timestamps) could cause hot partitions. As of 2018, S3 automatically handles this, so you no longer need to add random prefixes to your keys.

That said, the key naming convention still matters for organization:

\`\`\`
# Good: logical hierarchy
s3://my-bucket/uploads/2026/04/user-123/photo.jpg

# Bad: flat mess
s3://my-bucket/photo-abc123.jpg
\`\`\`

## Pre-Signed URLs

One of S3's most powerful features is pre-signed URLs. Instead of proxying file downloads through your server, you generate a temporary URL that grants direct access to the object:

\`\`\`javascript
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const client = new S3Client({ region: "us-east-1" });

const url = await getSignedUrl(client, new GetObjectCommand({
  Bucket: "my-bucket",
  Key: "uploads/photo.jpg",
}), { expiresIn: 3600 });
\`\`\`

This offloads bandwidth from your servers to S3's global infrastructure. For file-heavy applications, this is a game changer.

## Event-Driven Architectures

S3 event notifications are the foundation of many serverless architectures. When a file lands in a bucket, you can trigger a Lambda function, send a message to SQS, or notify an SNS topic.

We use this pattern for image processing: user uploads a photo to S3, which triggers a Lambda that generates thumbnails and stores them back in S3. The entire pipeline is serverless, scales to zero, and costs practically nothing at low volume.

## The Bottom Line

S3 is one of those services that seems simple but rewards deep understanding. Lifecycle policies, replication rules, access points, and Object Lock are all features that can save you significant time and money once you know they exist. Take an afternoon to read through the S3 documentation — you'll almost certainly find something useful you didn't know about.`,
    },
];

async function writeBlob(path, body, contentType = "text/plain; charset=utf-8") {
    return put(path, body, {
        access: "private",
        allowOverwrite: true,
        contentType,
        cacheControlMaxAge: 60,
        token,
    });
}

async function run() {
    console.log(`Seeding ${SAMPLE_POSTS.length} sample posts...`);

    for (const post of SAMPLE_POSTS) {
        const markdown = matter.stringify(post.content.trim() + "\n", post.metadata);
        const path = `${BLOG_POSTS_PREFIX}${post.metadata.slug}.md`;
        await writeBlob(path, markdown);
        console.log(`  ✓ ${post.metadata.title} (${post.metadata.slug})`);
    }

    // Regenerate index
    console.log("Regenerating index...");
    const listResult = await list({ prefix: BLOG_POSTS_PREFIX, limit: 1000, token });
    const indexPosts = [];

    for (const blob of listResult.blobs) {
        if (!blob.pathname.endsWith(".md")) continue;

        const response = await fetch(blob.downloadUrl);
        const source = await response.text();
        const parsed = matter(source);
        const slug = blob.pathname.replace(BLOG_POSTS_PREFIX, "").replace(/\.md$/, "");

        indexPosts.push({
            ...parsed.data,
            slug: parsed.data.slug || slug,
        });
    }

    const index = {
        version: 1,
        updatedAt: new Date().toISOString(),
        posts: indexPosts.sort((a, b) =>
            (b.publishedAt || b.updatedAt || "").localeCompare(a.publishedAt || a.updatedAt || "")
        ),
    };

    await writeBlob(
        BLOG_INDEX_PATH,
        JSON.stringify(index, null, 2) + "\n",
        "application/json; charset=utf-8"
    );

    console.log(`Done! ${indexPosts.length} posts in index.`);
}

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
