import "./content.css";
export function Content ({fotoURL, contentText, contentYear, contentSlogan, contentTop250, RuNameFilm, nameFilm}) {
    return (
        <div className="contentMain">
            <div className="contentFoto">
                <img src={fotoURL} />
            </div>
            <div className="contentInfo">   
                <div className="RuNameFilm">
                {RuNameFilm}
                </div>
                <div className="nameFilm">
                {nameFilm}
                </div>
                <div className="textFilm flexDiv">
                    <div className="DivName">О Фильме</div>
                    <div className="textFilmDivResp">{contentText} О Фильме</div>
                </div>
                <div className="yearFilm flexDiv">
                    <div className="DivName">Год</div>
                    <div className="yearFilmDivResp">{contentYear} Год</div>
                </div>
                <div className="sloganFilm flexDiv">
                    <div className="DivName">Слоган</div>
                    <div className="sloganFilmDivResp">{contentSlogan} Слоган</div>
                </div>
                <div className="pleaceOnTop250 flexDiv">
                    <div className="DivName">Топ 250 </div>
                    <div className="divPleaceOnTop250DivResp">{contentTop250} Топ 250</div>
                </div>
                <div className="generalFilm flexDiv">
                    <div className="DivName">Жанр</div>
                    <div className="generalList">
                        <div className="genres_0">• драма</div>
                        <div className="genres_1">• военный</div>
                    </div>  
                </div>
            </div>
        </div>
    )
}