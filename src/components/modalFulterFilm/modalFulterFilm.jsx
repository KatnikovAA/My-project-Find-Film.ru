import Button from "../button"
import { useState, useEffect} from "react";
import React from "react"
import "./modalFulterFilm.css"
import { arrTypeFilm } from "../../const";
export function ModalFulterFilm ({textModal,onSubmit,onClose,text,allGeners,handleGeners,allCountris,handleCountris,handleTypeFilm,valueRangeAfter,valueRangeBefore,handleRangeAfter,handleRangeBefore}) {
    const [valueBetween,setValueBetween] = useState(73 / 100 * (valueRangeBefore - valueRangeAfter) * 2 )
    const [valueMarginLeft,setValueMarginLeft] = useState(valueRangeAfter-1950 + (valueRangeAfter-1950) * 0.46)
    const [valueMarginRight,setValueMarginRight] = useState(2023-valueRangeBefore + (2023-valueRangeBefore) * 0.46)
    const [valueTextRangeAfter,setVlueTextRangeAfter] = useState(valueRangeAfter)
    const [valueTextRangeBefore,setVlueTextRangeBefore] = useState(valueRangeBefore)

    const calcValueBetween = (rangeBefore = valueRangeBefore ,rangeAfter = valueRangeAfter ) => {
        let fullRangeValue = 73
        let frsRangeValue = rangeBefore - rangeAfter
        console.log(frsRangeValue)
        return (fullRangeValue / 100 * frsRangeValue) * 2
    }
    const clickModal = () =>{
        onClose();
    }

    const onChangeRangeAfter = (event) =>{
        let valueEventRangeAfter = event.target.value
        calcMarginLeft(valueEventRangeAfter)
        if(valueEventRangeAfter > valueRangeBefore)
            {
            handleRangeAfter(valueRangeBefore)
            setVlueTextRangeAfter(valueRangeBefore)
            setValueBetween(calcValueBetween(valueRangeBefore ,valueRangeBefore))
            }
        else{
            handleRangeAfter(valueEventRangeAfter)
            setVlueTextRangeAfter(valueEventRangeAfter)
            setValueBetween(calcValueBetween(valueRangeBefore ,valueEventRangeAfter))
        }
    }
    
    const onFocusTextAfter= () =>{
        setVlueTextRangeAfter(null)
    }
    const onFocusTextBefore= () =>{
        setVlueTextRangeBefore(null)
    }

    const keyEnterAfter = (event) =>{
        if (event.key =="Enter"){
            let textValue = event.target.value
            setTextValueLeft(textValue)
            setVlueTextRangeAfter()
        }
    }
    const keyEnterBefore = (event) =>{
        if (event.key =="Enter"){
            let textValue = event.target.value
            setTextValueRight(textValue)
            setVlueTextRangeBefore()
        }
    }

    const setTextValueLeft = (textValue) => {
        if(1950 <= +textValue && +textValue <= +valueRangeBefore){ // поставил + в начале переменной что бы стринг сделать нумбер
            handleRangeAfter(textValue)
            calcMarginLeft(textValue)
            return setValueBetween(calcValueBetween(valueRangeBefore,textValue))
        }
    }

    const setTextValueRight = (textValue) => {
        if(+valueRangeAfter <= +textValue && +textValue <= 2023){ // поставил + в начале переменной что бы стринг сделать нумбер
            handleRangeBefore(textValue)
            calcMarginRight(textValue)
            return setValueBetween(calcValueBetween(textValue,valueRangeAfter))
        }
    }

    const onBlurTextAfter = (event) =>{
        let textValue = event.target.value
        setTextValueLeft(textValue)
        if(1950 > +textValue || +textValue > +valueRangeBefore){
            setVlueTextRangeAfter(valueRangeAfter)
        }
    }

    const onBlurTextBefore = (event) =>{
        let textValue = event.target.value
        setTextValueRight(textValue)
        if(+valueRangeAfter > +textValue || +textValue > 2023){
            setVlueTextRangeBefore(valueRangeBefore)
        }
    }
    const calcMarginLeft = (valueLeft) => {
        let minValueAfter = "1950"
        let defrentLeft = valueLeft - minValueAfter
        setValueMarginLeft(defrentLeft + (defrentLeft * 0.46))
    }

    const calcMarginRight = (valueRight) => {
        let maxValueBefore = "2023"
        let defrentRigth = maxValueBefore - valueRight
        setValueMarginRight(defrentRigth + (defrentRigth * 0.46))
    }

    const onChangeRangeBefore= (event) =>{
        let valueEventRangeBefore = event.target.value
        calcMarginRight(valueEventRangeBefore)
        if(valueEventRangeBefore < valueRangeAfter)
        {  
            handleRangeBefore(valueRangeAfter)  
            setVlueTextRangeBefore(valueRangeAfter)  
            setValueBetween(calcValueBetween(valueRangeAfter,valueRangeAfter))
        }

        else
        {
            handleRangeBefore(valueEventRangeBefore)
            setVlueTextRangeBefore(valueEventRangeBefore)  
            setValueBetween(calcValueBetween(valueEventRangeBefore,valueRangeAfter))
        }
    }
    const generatTypeFilm = () =>{
        let allTypeFilm = arrTypeFilm.map((type) =>
        <label key={type.name.toString()} htmlFor={type.name}>{type.name}
            <input key={type.name.toString()} type="radio" id={type.name} name="TYPE" onChange={checkedRadio} value={type.id}></input> 
        </label>
        )
    return allTypeFilm;
    }
    const handleChangeGenres = (event) =>{
        handleGeners(event.target.value);
	}
    const handleChangeCountris = (event) =>{
        handleCountris(event.target.value);
	}
    const checkedRadio = (event) =>{
        console.log(event.target.value)
        handleTypeFilm(event.target.value);
    }
    return (
    <div>  
        <div className="backDiv" onClick={clickModal}></div>
        <div className="modalFulterFilm">
            <div className="textModal">{textModal}</div>
            <div className="range_container">
            </div>
            <div className="fulterBlockText">
                <div> Жанр: 
                    <select className='selectGenres'onChange={handleChangeGenres}>
                    {
                        allGeners
                    }
                    </select>
                </div>
                <div> Страна:
                    <select className='selectCountris' onChange={handleChangeCountris}>
                    {
                        allCountris
                    }
                    </select>
                </div>   
            </div>

            <div className="radioType">
                {   
                    generatTypeFilm()
                }
                </div>
            <div className="sliders_control" >
                <div> Год c: 
                    <input type="text" className="sliderTextValue" value={valueTextRangeAfter} onFocus={onFocusTextAfter} onBlur={onBlurTextAfter} onKeyUp={keyEnterAfter}/>
                </div>
                <div className="rangeYear">
                    <div className="valueBetween" style={{width:`${valueBetween}px`, margin:`0 ${valueMarginRight}px 0 ${valueMarginLeft}px`}}></div>
                    <input id="fromSlider" type="range" min="1950" max="2023" value={valueRangeAfter} onChange={onChangeRangeAfter} className="slider After"></input>
                    <input id="toSlider" type="range" min="1950" max="2023" value={valueRangeBefore} onChange={onChangeRangeBefore} className="slider Before"></input>
                </div> 
                <div> Год до: 
                    <input type="text" className="sliderTextValue" value={valueTextRangeBefore} onFocus={onFocusTextBefore} onBlur={onBlurTextBefore} onKeyUp={keyEnterBefore}/>
                </div>
            </div>
            <Button text={text} onClick={onSubmit}/>
        </div>
    </div> 
    )
}