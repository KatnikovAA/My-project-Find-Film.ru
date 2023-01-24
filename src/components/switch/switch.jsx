import { useState,useEffect } from "react";
export function Switch ({label, className,value,onChange,checkBoxValue,valueRadio,checkedTypeEmpty}) {
    const [checked, setChecked] = useState(false);
    const [labelStar, setLabelStar] = useState("☆");

    const starChenge = () =>{
        if(checked == false){
            setLabelStar("★")
        }
        else{
            setLabelStar("☆")
        }
    }
    const chengeCheckbox = (event) => {
        let newValue = !checked // сделал через переменную потому что хук выполняется асинхрон.
        setChecked(newValue);
        starChenge()
        checkBoxValue(event.target.value);
    }
//ретерн обернул в label потому что можно нажимать по люблму месту label и checkbox будет отрабатывать 
//<input className="checkbox" type="checkbox" id ="switch__checkbox" checked={checked} onChange={chengeCheckbox}/>
    return (
        <label className={`switch ${className}`}>
            <input type="radio" name="findFilm" value={valueRadio} onChange={chengeCheckbox} checked={checked}/>
            {label}
        </label>
    )
}