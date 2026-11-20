export default function SignalArrow({down = false}) {
    return (
        <svg className="signal-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false">
            <path d={down ? "M3.5 3.5l9 9m0-7v7h-7" : "M3.5 12.5l9-9m-7 0h7v7"}/>
        </svg>
    );
}
