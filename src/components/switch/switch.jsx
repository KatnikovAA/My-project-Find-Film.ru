import { useState,useEffect } from "react";
export function Switch ({label, className,value,onChange,checkBoxValue}) {
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
    const chengeCheckbox = () => {
        console.log("8 строка на в свич" + checked)
        let newValue = !checked // сделал через переменную потому что хук выполняется асинхрон.
        setChecked(newValue);
        starChenge()
        checkBoxValue(newValue);


    }
//ретерн обернул в label потому что можно нажимать по люблму месту label и checkbox будет отрабатывать 
    return (
        <label className={`switch ${className}`}> 
            <input className="checkbox" type="checkbox" id ="switch__checkbox" checked={checked} onChange={chengeCheckbox}/>
            <div htmlFor="switch__checkbox">{label}</div>
        </label>
    )
}