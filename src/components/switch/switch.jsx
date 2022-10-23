export function Switch ({label, className}) {
    return (
        <div className={`switch ${className}`}>
            <input type="checkbox" id ="switch__checkbox" />
            <label htmlFor="switch__checkbox">{label}</label>
        </div>
    )
}