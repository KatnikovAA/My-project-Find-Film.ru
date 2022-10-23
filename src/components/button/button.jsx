export function Button (props) {
    const {
        className,
        icon,
        text
    } = props;

    return (
        <button className={`button ${className}`}>
            <span className="button__icon">
                {icon}
            </span>
            <span className="button__text">
                {text}
            </span>
        </button>
    )
}