import "./mainFilm.css"
import Content from "../../components/content";
import Header from "../../components/header";
export function MainFilm () {
    const handleSearchClickFunc = () =>{
        console.log("Вызов fetch")
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/100`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '5086766a-6459-4303-b5e7-0163dcefa45b',
                'Content-Type': 'application/json',
            },
        })  
        .then((response) => {
            if(response.ok){
                return response.json();
            } else {
                throw "Фильма с таким Id на Кинопосике не существует.\n Просьба попробовать другой Id !";
            }
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((error1)=>{
            alert(error1)
        })
    }
    return (
        <div>
            <Header  onClick={handleSearchClickFunc}/>
            <Content fotoURL="https://img1.akspic.ru/previews/9/2/2/9/6/169229/169229-fioletovyj_esteticheskoj-estetika-purpur-tsvetnoy-temno_fioletovyj-x750.jpg" RuNameFilm="fdsfsdfs"/>
        </div>
    )
}
