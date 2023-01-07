import Button from "../button";
import Switch from "../switch";
import { useRef, useEffect} from "react";
import "./header.css";
export function Header ({onClick,checkBoxValue,handleSearchRandomClickFunc,clickFulterFilm,checkedTypeEmpty}) {
const switchEmptyRef = useRef();

    return (
        <header className="header">
                {
                //<SearchFilm />
                }
                <div>
                <div className="TypeSwitchz">
                    {
                    /*
                    <div className="switchzText">
                        Случайный фильм из 
                    </div>
                    */
                    }

                    <div className="headerSwitchz">
                        <Switch label="TOП 250" className="header__switchz top250" name="typeArr" checkBoxValue={checkBoxValue} valueRadio={"checkedTOP250"} checkedTypeEmpty={checkedTypeEmpty}/>
                        <Switch label="ТОП Недели" className="header__switchz topWeek" name="typeArr" checkBoxValue={checkBoxValue} valueRadio={"checkedPOP100"} checkedTypeEmpty={checkedTypeEmpty}/>
                    </div>
                    
                    <div className="SearchButtonFromSwitch">
                        <Button className="SearchFilmFromSwitchButton" text="Поиск" onClick={onClick}></Button>
                    </div>
                </div>
                </div>
                <Button className="findFulterFilmButton" text="Найти фильм по параметрам" onClick={clickFulterFilm}/>
                <Button className="findFilmButton" icon="▶" text="Случайный фильм" onClick={handleSearchRandomClickFunc}/>
        </header>   
    )
}
