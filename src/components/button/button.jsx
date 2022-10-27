export function Button (props) {
    const {
        className,
        icon,
        text,
        onClick
    } = props;

    const handlyFirstEventClick = () =>{
        console.log("Прервый клик!")
        if(typeof onClick === "function"){
            onClick();
        }
        
    }
    return (
        <button className={`button ${className}`} onClick={handlyFirstEventClick}>
            <span className="button__icon">
                {icon}
            </span>
            <span className="button__text">
                {text}
            </span>
        </button>
    )
}