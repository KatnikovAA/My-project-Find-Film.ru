import "./mainFilm.css"
import Content from "../../components/content";
import Header from "../../components/header";
import { getFilm, getRandomFilmId} from "../../api";
import { useState } from "react";
import { getRandomId } from "../../tools"; 
import { minFilmId , maxFilmId } from "../../const";


export function MainFilm () {
    // в useState передаем начальное состояние оно может быть null undefaind 
    // или пропс что угодно, как работает хук - один раз вызывается useState в него передаем начальное состоаяние. 
    // это состояние подхватывает переменная film, а уже то что мы передаем в setFilm передает состояние в переменную film
    const [filmId,setFilmId] = useState(null);
    
    const handleSearchClickFunc = () => {
//    getRandomId(300,10000)
//    .then((response)=>{
//     console.log(response)
        
        //setFilmId(getRandomId(minFilmId,maxFilmId));
        getRandomFilmId()
        .then((id)=>{
            setFilmId(id);
            
        })
        .catch((error1)=>{
            console.log(error1)
            alert(error1)
        })
    }
    // expr ? true : false
    // expr && <sfdsf></sdfdf>
    return (
        <div>
            <Header  onClick={handleSearchClickFunc}/>
        
            {
                filmId != null && <Content filmId={filmId}/>
                //film != null ? <Content film={film}/> : null

            }
        </div>
    )
}
