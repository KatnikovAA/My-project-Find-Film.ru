import SearchFilm from "../../components/searchFilm";
import Button from "../button";
import Switch from "../switch";
import "./header.css";
export function Header () {
    return (
        <header className="header">
                <SearchFilm />
                <Switch label="TOP 250" className="header__switch--top250"/>
                <Button icon="▶" text="Случайный фильм" />
        </header>   
    )
}
