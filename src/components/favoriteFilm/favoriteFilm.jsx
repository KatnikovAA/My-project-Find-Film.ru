import { getFilm } from "../../api";
import { useEffect,useState } from "react";
import Button from "../button";
import "./favoriteFilm.css"

export const FavoriteFilm = ({filmId,onCliclButon}) => {
const [favoriteFilm,setFavoriteFilm] = useState();
const [faoritFilmGenres,setfaoritFilmGenres] = useState();
useEffect(() =>{
    console.log(filmId)
    getFilm(filmId)
    .then((response)=>{
        console.log(response)
        setFavoriteFilm(response);
        const listGenres = response.genres.map((genresRow) =>
        <li key={genresRow.toString()}>{genresRow}</li>
        )
        setfaoritFilmGenres(listGenres)
    })
},[filmId]);
const deletFilmId = () =>{
    onCliclButon(filmId)
}
if(favoriteFilm == null) {
    return (
    <> </>
    )
}
    return(
        <>
            <div className="FilmLogo">
                <div className="posterFilm">
                    {<img src={favoriteFilm.posterUrl} />}
                    <div className="hortDiscriptionFilm">
                    
                        <div className="RuNameFavoriteFilm">
                            {favoriteFilm.nameRu}
                        </div>
                        <div className="yearFilm flexFavoriteDiv">
                            <div className="DivName">Год: {favoriteFilm.year}</div>
                        </div>
                        <div className="generalFilm flexFavoriteDiv">
                            <div className="DivName">Жанр {faoritFilmGenres}</div>
                            <div className="generalList"></div>
                            <div className="genres"></div>
                        </div> 
                    </div>
                    <Button className="close" icon="✘" onClick={deletFilmId}/>
                </div>
            </div>
        </>
    )
}