import "./content.css";
import { useEffect, useState } from "react";
import { getFilm } from "../../api";
export function Content ({filmId}) {
    //useEffect получает на выходи функцию которая что то делает, если изменилась переменная которая в []
    //мы вызываем фетч по Id когда приходит ответ вызываем useState что бы отрисовать страницу
    const [film, setFilm] = useState(null);
    useEffect(() =>{
        getFilm(filmId)
        .then((response)=>{
            setFilm(response);
        })
    },[filmId])

    if(film == null) {
        return <></>
    }
    
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
                    <div className="textFilmDivResp">{film.shortDescription}</div>
                </div>
                <div className="yearFilm flexDiv">
                    <div className="DivName">Год</div>
                    <div className="yearFilmDivResp">{film.year[0]}</div>
                </div>
                <div className="sloganFilm flexDiv">
                    <div className="DivName">Слоган</div>
                    <div className="sloganFilmDivResp">{film.slogan}</div>
                </div>
                <div className="pleaceOnTop250 flexDiv">
                    <div className="DivName">Топ 250 </div>
                    <div className="divPleaceOnTop250DivResp">{film.ratingKinopoisk} Топ 250</div>
                </div>
                <div className="generalFilm flexDiv">
                    <div className="DivName">Жанр</div>
                    <div className="generalList">
                        <div className="genres_0">{film.genres[0]}</div>
                    </div>  
                </div>
            </div>
        </div>
    )
}