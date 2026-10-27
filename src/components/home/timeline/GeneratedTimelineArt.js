import FilmArtwork from "../../common/FilmArtwork";

export default function GeneratedTimelineArt({entry, className = ""}) {
    return (
        <FilmArtwork
            subject={entry?.id || entry?.title || entry?.organization}
            className={`timeline-art ${className}`.trim()}
            width={360}
            height={126}
        />
    );
}
