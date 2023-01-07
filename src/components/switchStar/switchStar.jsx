import { useState,useEffect } from "react";
export function SwitchStar ({className,checked,onChange}) {

    const chengeCheckbox = () => {
        let newValue = !checked // сделал через переменную потому что хук выполняется асинхрон.
        onChange(newValue);
    }
//ретерн обернул в label потому что можно нажимать по люблму месту label и checkbox будет отрабатывать 
    return (
        <label className={`switch ${className}`}> 
            <input className="checkbox" type="checkbox" id ="switch__checkbox" checked={checked} onChange={chengeCheckbox}/>
            <div htmlFor="switch__checkbox">{checked == true ? "★" : "☆" }</div>
        </label>
    )
}