import SearchFilm from "../../components/searchFilm";
import Button from "../button";
import Switch from "../switch";
import "./header.css";
export function Header ({onClick,checkBoxValue}) {

    return (
        <header className="header">
                <SearchFilm />
                <Switch label="TOP 250" className="header__switchz__top250" checkBoxValue={checkBoxValue}/>
                <Button className="findFilmButton" icon="▶" text="Случайный фильм" onClick={onClick}/>
        </header>   
    )
}
