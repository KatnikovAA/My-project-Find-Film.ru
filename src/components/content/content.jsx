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
                <div className="textFilm">
                    <div class="DivName">О Фильме</div>
                    <div className="textFilmDivResp">{contentText}</div>
                </div>
                <div class="yearFilm">
                    <div class="DivName">Год</div>
                    <div class="textFilmDivResp">{contentYear}</div>
                </div>
                <div class="sloganFilm">
                    <div class="DivName">Слоган</div>
                    <div class="sloganFilmDivResp">{contentSlogan}</div>
                </div>
                <div class="pleaceOnTop250">
                    <div class="DivName">Топ 250 </div>
                    <div class="divPleaceOnTop250DivResp">{contentTop250}</div>
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