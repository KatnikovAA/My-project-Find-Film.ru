import "./mainFilm.css"
import Content from "../../components/content";
import Header from "../../components/header";
import { getFilm, getRandomFilmId, top250Id} from "../../api";
import { useState } from "react";
import { getRandomId } from "../../tools";
import { minFilmId , maxFilmId } from "../../const";
import LoadIndicator from "../../components/loadIndicator";
import Modal from "../../components/modal";
import FavoriteFilm from "../../components/favoriteFilm";
import Button from "../../components/button";
import { getRandomInt } from "../../tools";

export function MainFilm () {
    // в useState передаем начальное состояние оно может быть null undefaind
    // или пропс что угодно, как работает хук - один раз вызывается useState в него передаем начальное состоаяние.
    // это состояние подхватывает переменная film, а уже то что мы передаем в setFilm передает состояние в переменную film
    const [filmId,setFilmId] = useState(null);
    const [loading,setloading] = useState(false);
    const [errLoad,seterrLoad] = useState(null);
    const [checkedTOP250, setChecked] = useState(false);
    const [checkedStar, setCheckedStar] = useState(false);
    const [modalVisibility,setModalVisibility] = useState();
    const [addFilmId,setAddFilmId] = useState(310);
    const [arrFilmId,setArrFilmId] = useState([]);
    const moreGetId = (newValue) => {

    }
    const deletFavoriteFilm = (idFilmForDel) =>{
        console.log("удаление " + idFilmForDel)
        // оператов spread для массивов делает копию или может вставлят данные из нее  например const numbers1 = [1, 2];
        //const numbers2 = [ ...numbers1, 7,8]; this will be [1, 2, 7, 8]
        let temporaryArr = [...arrFilmId]; 
        console.log("удаление " + temporaryArr)
        temporaryArr.splice(temporaryArr.indexOf(idFilmForDel), 1);
        console.log("удаление " + temporaryArr)
        setArrFilmId(temporaryArr);
    }
    let mainArrFilmId = []
    const cheangeStar = (newValue) =>{
        setCheckedStar(newValue)
        cheangeArrFilm(filmId)

    }
    const cheangeArrFilm = (id) =>{
        if(checkedStar == false)
        {
            console.log("упал в unshift" + id )
            let temporaryArr = [...arrFilmId]; 
            temporaryArr.push(id);
            setArrFilmId(temporaryArr);
            console.log(arrFilmId)
            // creatCopyArr(arrFilmId)

        }
        else
        {
            console.log("провека!")
            let temporaryArr = [...arrFilmId]; 
            console.log("упал в splice")
            temporaryArr.splice(temporaryArr.indexOf(id), 1); // splice удалет конкетрный елемент массива но по инедсу а что бы узнать елемент мы юзаем ndexOf(filmId) узнаем индекс по значению
            setArrFilmId(temporaryArr);
            // creatCopyArr(arrFilmId)
        }
    }
    // const creatCopyArr = (value) =>{
    //     mainArrFilmId = value.slice(0);
    //     console.log(mainArrFilmId)
    //     setAddFilmId(mainArrFilmId)
    // }

    const handleClickCheckBox = (value) => {
        setChecked(value)
        console.log(value)
    }

    const handleCloseModalFunc = () => {
        setModalVisibility(false);
    }
    const deletAllFavotireFilms = () => {
        setArrFilmId([])
        setCheckedStar(false)
    }
    const selectRandomFavoriteFilm = () => {
        let arrFilmKey = getRandomInt(0,arrFilmId.length)
        console.log("arrFilmKey " + arrFilmKey)
        setFilmId(arrFilmId[arrFilmKey])
        deletAllFavotireFilms();
    }
    
    const handleSearchClickFunc = () => {
    setCheckedStar(false);
    setModalVisibility(false);
    seterrLoad(null)
    setloading(true)
//    getRandomId(300,10000)
//    .then((response)=>{
//     console.log(response)
        //setFilmId(getRandomId(minFilmId,maxFilmId));
        if(checkedTOP250 == true){
            let idTop250 = top250Id()
            console.log("let idTop250 =  " + idTop250)        
            setFilmId(idTop250);
            setloading(false);
            // arrFilmId.unshift(idTop250)
            // setFavorits([item, ...arrFilmId])
            // console.log(listItems)
        }
        else{
        getRandomFilmId()
            .then((id)=>{
                console.log("getRandomFilmId " + id)
                setFilmId(id);
                setloading(false)
            })
            .catch((error1)=>{
                setModalVisibility(true)
                setloading(false)
                seterrLoad(error1)
            })
        }
    }
    // expr ? true : false
    // expr && <sfdsf></sdfdf>
    return (
        <div>
            <Header  onClick={handleSearchClickFunc} checkBoxValue={handleClickCheckBox}/>
            {
                loading == true && <LoadIndicator/>
            }
                 {/* {arrFilmId.length != 0 ?
                    arrFilmId.map((filmIdArr)=>
                      
                    loading == false && errLoad == null && filmIdArr != null &&
                    <Content key={filmIdArr.toString()} filmId={filmIdArr} moreGetId={moreGetId} cheangeLabelStar={cheangeStar}/>
                    )
                    :
                    loading == false && errLoad == null && filmId != null &&
                    <Content filmId={filmId} moreGetId={moreGetId} cheangeLabelStar={cheangeStar}/>
                } */
                loading == false && errLoad == null && filmId != null &&
                <Content filmId={filmId} moreGetId={moreGetId} onChangeFavorite={cheangeStar} isFavorite={checkedStar}/>
                }
                {arrFilmId.length != 0 && <div className="favorite">
                {
                    <div className="faoriteLable">Подборка избранных фильмов</div>
                }
                <Button className="favoriteButtonRandomSelect" text ="Случайный фильм из Подборки" onClick = {selectRandomFavoriteFilm}/>
                <Button className="favoriteButtonDelet" text ="Удалить Подборку" onClick = {deletAllFavotireFilms}/>
                </div>}
            <div className="favoritFilmPoster">
                {
                    arrFilmId.length != 0 && arrFilmId.map((filmIdArr)=>
                    <FavoriteFilm key={filmIdArr.toString()} filmId={filmIdArr} onCliclButon={deletFavoriteFilm}/>)
                }
            </div>
            {
                modalVisibility  && <Modal textModal={errLoad} onSubmit={handleSearchClickFunc} onClose={handleCloseModalFunc}/>
            }

        </div>
    )
}
