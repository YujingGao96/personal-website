import {hashText} from "../../util/GenArtUtil";

// Different crops share one photograph and one cached download across the site.
export default function FilmArtwork({subject, className = "", width = 400, height = 200}) {
    const seed = hashText(subject);
    const crops = ["xMinYMin", "xMidYMid", "xMaxYMax", "xMidYMin", "xMinYMax"];

    return (
        <svg
            className={`film-artwork ${className}`.trim()}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <image
                href="/art/blue-hour.webp"
                width={width}
                height={height}
                preserveAspectRatio={`${crops[seed % crops.length]} slice`}
            />
            <rect width={width} height={height} fill="#081828" opacity="0.12"/>
        </svg>
    );
}
