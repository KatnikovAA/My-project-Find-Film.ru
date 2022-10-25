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
                    <div class="DivName">О Фильме</div>
                    <div className="textFilmDivResp">{contentText} О Фильме</div>
                </div>
                <div class="yearFilm flexDiv">
                    <div class="DivName">Год</div>
                    <div class="yearFilmDivResp">{contentYear} Год</div>
                </div>
                <div class="sloganFilm flexDiv">
                    <div class="DivName">Слоган</div>
                    <div class="sloganFilmDivResp">{contentSlogan} Слоган</div>
                </div>
                <div class="pleaceOnTop250 flexDiv">
                    <div class="DivName">Топ 250 </div>
                    <div class="divPleaceOnTop250DivResp">{contentTop250} Топ 250</div>
                </div>
                <div class="generalFilm flexDiv">
                    <div class="DivName">Жанр</div>
                    <div class="generalList">
                        <div class="genres_0">• драма</div>
                        <div class="genres_1">• военный</div>
                    </div>  
                </div>
            </div>
        </div>
    )
}