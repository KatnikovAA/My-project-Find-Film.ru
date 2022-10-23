import Button from "../button";
export function SearchFilm () {
    return (
    <div className="search-film">
        <label className="search-film__label" htmlFor="search-film__input">
            Фильм по рандомному Id:
        </label>
        <input id="search-film__input" type="text" className='search-film__input' placeholder="Попробуй случайный Id"></input>
        <Button icon="🔎" text="Найти Фильм по Id" className="search-film__button"/>
    </div>
    )   
}
