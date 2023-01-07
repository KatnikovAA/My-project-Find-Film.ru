import "./content.css";
import { useEffect, useState } from "react";
import { getFilm } from "../../api";
import LoadIndicator from "../loadIndicator";
import Button from "../button";
import Switch from "../switch";
import SwitchStar from "../switchStar";
export function Content ({filmId, moreGetId, countFilmd, onChangeFavorite,isFavorite}) {

    //useEffect получает на выходи функцию которая что то делает, если изменилась переменная которая в []
    //мы вызываем фетч по Id когда приходит ответ вызываем useState что бы отрисовать страницу
    const [film, setFilm] = useState(null);
    const [star, setStar] = useState(false);
    const [newFilm, setNewFilm] = useState();
    const [loadContentStatus, setloadContentStatus] = useState(null);
    useEffect(() =>{
        console.log(filmId)
        setNewFilm(true)
        getFilm(filmId)
        
        .then((response)=>{
            setFilm(response);
        })
    },[filmId])
    const deletFilmId = () =>{
        console.log("удаление")
        setFilm(null);
    }
    if(film == null) {
        return (
        <> </>
        )
    }
    const listGenres = film.genres.map((genresRow) =>
    <li key={genresRow.toString()}>{genresRow}</li>
    );
    const listCountries = film.countries.map((countriesRow) =>
    <div key={countriesRow.toString()}> {countriesRow}</div>
    );

    return (
        <div className="contentMain">
            <div className="contentFoto">
                <img src={film.posterUrl} />
            </div>
            <div className="contentInfo">
                <div className="RuNameFilm">
                {film.nameRu}
                </div>
                <div className="nameFilm">
                {film.nameOriginal}
                </div>
                <div className="textFilm flexDiv">
                    <div className="DivName">О Фильме</div>
                    <div className="textFilmDivResp">{film.shortDescription == null ? "Нет информации" : film.shortDescription}</div>
                </div>
                <div className="sloganFilm flexDiv">
                    <div className="DivName">Слоган</div>
                    <div className="sloganFilmDivResp">{film.slogan == null ? "Нет информации": film.slogan}</div>
                </div>
                <div className="countrieslFilm flexDiv">
                    <div className="DivName">Страна</div>
                    <div className="countriesList">
                        <div className="countries">{listCountries}</div>
                    </div>  
                </div>
                <div className="yearFilm flexDiv">
                    <div className="DivName">Год</div>
                    <div className="yearFilmDivResp">{film.year}</div>
                </div>
                <div className="pleaceOnTop250 flexDiv">
                    <div className="DivName">Топ 250 </div>
                    <div className="divPleaceOnTop250DivResp">{film.ratingKinopoisk} Топ 250</div>
                </div>
                <div className="generalFilm flexDiv">
                    <div className="DivName">Жанр</div>
                    <div className="generalList">
                        <div className="genres">{listGenres}</div>
                    </div>  
            </div>
            </div>
                    <div className="buttonFild">
                    <Button className="close" icon="✘" onClick={deletFilmId}/>
                    <div>
                        {

                        <SwitchStar onChange={onChangeFavorite} checked={isFavorite}/>

                        }   
                        </div>
                    </div>
        </div>
    )
}