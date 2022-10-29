import "./mainFilm.css"
import Content from "../../components/content";
import Header from "../../components/header";
import { getFilm } from "../../api";
import { useState } from "react";
export function MainFilm () {
    // в useState передаем начальное состояние оно может быть null undefaind 
    // или пропс что угодно, как работает хук - один раз вызывается useState в него передаем начальное состоаяние. 
    // это состояние подхватывает переменная film, а уже то что мы передаем в setFilm передает состояние в переменную film
    const [film,setFilm] = useState(null);
    const handleSearchClickFunc = () =>{
        getFilm(301)
        .then((response)=>{
            console.log(response)
            setFilm(response);
        })
    }
    return (
        <div>
            <Header  onClick={handleSearchClickFunc}/>
            <Content fotoURL="https://img1.akspic.ru/previews/9/2/2/9/6/169229/169229-fioletovyj_esteticheskoj-estetika-purpur-tsvetnoy-temno_fioletovyj-x750.jpg" RuNameFilm="fdsfsdfs"/>
        </div>
    )
}
