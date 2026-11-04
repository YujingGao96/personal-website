import MotionBoundary from "./MotionBoundary";

// Only the artwork enters this layer; captions and controls stay outside it.
export default function BannerTreatment({children, className = ""}) {
    return (
        <MotionBoundary className={`generated-banner-treatment ${className}`.trim()} aria-hidden="true">
            {children}
        </MotionBoundary>
    );
}
