import "./mainFilm.css"
import Content from "../../components/content";
import Header from "../../components/header";
import { getFilm, getRandomFilmId, top250Id, pop100Film, fulterFilm} from "../../api";
import { useState,useEffect,useRef } from "react";
import { getRandomId } from "../../tools";
import { minFilmId , maxFilmId } from "../../const";
import LoadIndicator from "../../components/loadIndicator";
import Modal from "../../components/modal";
import FavoriteFilm from "../../components/favoriteFilm";
import Button from "../../components/button";
import ModalFulterFilm from "../../components/modalFulterFilm";
import { getRandomInt } from "../../tools";
import { objGenre, objCountris, arrTypeFilm } from "../../const";
import axios from "axios";

export function MainFilm () {
    // в useState передаем начальное состояние оно может быть null undefaind
    // или пропс что угодно, как работает хук - один раз вызывается useState в него передаем начальное состоаяние.
    // это состояние подхватывает переменная film, а уже то что мы передаем в setFilm передает состояние в переменную film
    const [filmId,setFilmId] = useState(null);
    const [loading,setloading] = useState(false);
    const [errLoad,seterrLoad] = useState(null);
    const [checkedTOP250, setChecked] = useState();
    const [checkedPOP100, setCheckedPOP100] = useState(false)
    const [checkedStar, setCheckedStar] = useState(false);
    const [valueSearch,setValueSearch] = useState()
    const [checkedTypeEmpty, setCheckedTypeEmpty] = useState(true);
    const [modalVisibility,setModalVisibility] = useState();
    const [adviceAboutButton,setAdviceAboutButton] = useState(true);
    const [adviceText,setAdviceText] = useState(false);
    const [arrFilmId,setArrFilmId] = useState([]);
    const [arrFilmPOP100Id,setArrFilmPOP100Id] = useState();
    const [numberArrCarousel,setNumberArrCarousel] = useState();
    const [selectedGeners, setSelectedGeners] = useState()
    const [modalFulter, setModalFulter] = useState(false)
    const [arrAllGeners, setArrAllGeners] = useState()
    const [arrAllCountris, setArrAllCountris] = useState()
    const [arrAllTypeFilm, setArrAllTypeFilm] = useState()
    const [valueGener,setValueGener] = useState("1")
    const [valueCountris,setValueCountris] = useState(objCountris[0].id)
    const [valueTypeFilm,setValueTypeFilm] = useState(arrTypeFilm[0].id)
    const [errTextButton,setErrTextButton] = useState()
    const [errSwitchTextErr,setErrSwitchTextErr] = useState()
    const [valueRangeAfter, setValueRangeAfter] = useState("2000");
    const [valueRangeBefore, setValueRangeBefore] = useState("2022");
    const [addAnimationCarousel, setAddAnimationCarousel]= useState(0)
    const contentMainRef = useRef();
    useEffect(()=>{
        console.log("привет")
        },[])
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
    const handleRangeAfter = (value) => {
        setValueRangeAfter(value);
    }
    const handleRangeBefore = (value) => {
        setValueRangeBefore(value);
    }
    const cheangeStar = (newValue) =>{
        setCheckedStar(newValue)
        cheangeArrFilm(filmId)
    }
    const ckeckIncludeFilmId = (value) => {
        console.log(arrFilmId)
        if(arrFilmId.includes(value)){
            console.log("да")
            setCheckedStar(true)
        }
        else{
            console.log("ytn")
            setCheckedStar(false)
        }
    }
    const cheangeArrFilm = (id) =>{
        if(checkedStar == false)
        {
            let temporaryArr = [...arrFilmId]; 
            temporaryArr.push(id);
            setArrFilmId(temporaryArr);
            console.log(arrFilmId)
        }
        else
        {
            let temporaryArr = [...arrFilmId]; 
            temporaryArr.splice(temporaryArr.indexOf(id), 1); // splice удалет конкетрный елемент массива но по инедсу а что бы узнать елемент мы юзаем ndexOf(filmId) узнаем индекс по значению
            setArrFilmId(temporaryArr);
        }
    }
    const generateGeners = () => { // прокидываем в переменную список всех жанров индекс + 1 так как id начинаются с 1
        console.log()
        let allGeners = objGenre.map((geners,index) => 
        <option key={geners.toString()} value={index + 1}> {geners} </option>
        )
        return allGeners
    }
    const generatCountris = () =>{
        let allCountris = objCountris.map((countris)=>
        <option key={countris.name.toString()} value={countris.id}> {countris.name} </option>
        )
        return allCountris
    }

    const handleCliclFulterFilm = () => { //клик по кнопке Найти фильм по параметрам
       setModalFulter(true)
       setArrAllGeners(generateGeners()) // прокидываем в стосяние весь массив жанров
       setArrAllCountris(generatCountris()) // прокидываем в стосяние весь массив стран
    }
    const handleClickCheckBox = (value) => {
        setChecked(value)
    }

    const handleGeners = (value) => {
        setValueGener(value)
    }

    const handleCountris = (value) => {
        setValueCountris(value)
    }

    const handleTypeFilm = (value) => {
        setValueTypeFilm(value)
    }
    const handleSumbmitFulterFilm = () => {
        setValueSearch("Фильм по параметрам")
        setAdviceText(false)
        setCheckedTypeEmpty(false)
        setValueRangeBefore("2022")
        setValueRangeAfter("2000")
        setCheckedStar(false);
        setModalFulter(false)
        setModalVisibility(false);
        seterrLoad(null)
        setloading(true)
        setArrFilmPOP100Id(null)
        fulterFilm(valueGener,valueCountris,valueTypeFilm,valueRangeAfter,valueRangeBefore)
        .then((id)=>{
//            console.log(respons.items[0].kinopoiskId)
            setFilmId(id)
            setloading(false)
        })
        .catch((error1)=>{
            setModalFulter(false)
            setModalVisibility(true)
            setErrTextButton("Поменять Параметры")
            setloading(false)
            setErrSwitchTextErr("Fulter")
            seterrLoad("Фильма с такими параметрами не существует ")
        })
    }
    const handleClickCheckBoxPOP = (value) => {
        setCheckedPOP100(value)
    }
    const carouselCheangeFilmLeft = () => {
        let newNumOfArr = numberArrCarousel
        setAddAnimationCarousel(numberArrCarousel)
        console.log(contentMainRef.current.__reactFiber$z6zgw9yyhno            )
        contentMainRef.current.style.animationName= "carouselMoveRight";
        setTimeout(() => {
            console.log("setTimeout")
            contentMainRef.current.style.animationName= "none";
        }, 500);
        if(numberArrCarousel== 0){
            newNumOfArr = 9
            console.log(newNumOfArr)
            setNumberArrCarousel(newNumOfArr)
            setFilmId(arrFilmPOP100Id[newNumOfArr])
            ckeckIncludeFilmId(arrFilmPOP100Id[newNumOfArr])

        }
        else{
            newNumOfArr = numberArrCarousel - 1
            console.log(newNumOfArr)
            setNumberArrCarousel(newNumOfArr)
            setFilmId(arrFilmPOP100Id[newNumOfArr])
            console.log(arrFilmPOP100Id[newNumOfArr])
            ckeckIncludeFilmId(arrFilmPOP100Id[newNumOfArr])

        }
    }
    const carouselCheangeFilmRight = () => {
        let newNumOfArr = numberArrCarousel
        setAddAnimationCarousel(numberArrCarousel)
        contentMainRef.current.style.animationName= "carouselMoveLift";
        setTimeout(() => {
            console.log("setTimeout")
            contentMainRef.current.style.animationName= "none";
        }, 500);
        if(numberArrCarousel== 9){
            newNumOfArr = 0
            console.log(newNumOfArr)
            setNumberArrCarousel(newNumOfArr)
            setFilmId(arrFilmPOP100Id[newNumOfArr])
            ckeckIncludeFilmId(arrFilmPOP100Id[newNumOfArr])
        }
        else{
            newNumOfArr = numberArrCarousel + 1
            console.log(newNumOfArr)
            setNumberArrCarousel(newNumOfArr)
            setFilmId(arrFilmPOP100Id[newNumOfArr])
            ckeckIncludeFilmId(arrFilmPOP100Id[newNumOfArr])
        }
    }
    const handleCloseModalAdvice = () =>{
        setAdviceAboutButton(false)
        setAdviceText(true)
    }
    const deletFilmContent = () =>{
        console.log("удаление")
        setArrFilmPOP100Id(null)
        setFilmId(null);
    }
    const handleCloseModalFunc = () => {
        setValueRangeBefore("2022")
        setValueRangeAfter("2000")
        setErrSwitchTextErr(null)
        setErrTextButton(null)
        seterrLoad(null)
        setModalVisibility(false);
        setModalFulter(false)
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
    const callFunc = () =>{
        console.log(errSwitchTextErr)
        console.log(errTextButton)
        if(errSwitchTextErr == "Random"){
            handleSearchClickFunc();
            setModalVisibility(false)
            setErrTextButton(null)
            seterrLoad(null)
        }
        else{
            console.log("тектывыа")
            setModalVisibility(false)
            setErrTextButton(null)
            seterrLoad(null)
            handleCliclFulterFilm();
        }
    }
    const handleSearchRandomClickFunc = () => {
        setAdviceText(false)
        setArrFilmPOP100Id(null)
        setErrTextButton(null)
        setCheckedStar(false);
        setModalVisibility(false);
        seterrLoad(null)
        setloading(true)
        setValueSearch("Абсалютно случайный фильм")
        getRandomFilmId()
        .then((id)=>{
            console.log("getRandomFilmId " + id)
            setFilmId(id);
            setloading(false)
        })
        .catch((error1)=>{
            setErrTextButton("Повторить")
            setErrSwitchTextErr("Random")
            setModalVisibility(true)
            setloading(false)
            seterrLoad(error1)
        })
    }
    const handleSearchClickFunc = () => {
        setAdviceText(false)
        setErrTextButton(null)
        setCheckedStar(false);
        setModalVisibility(false);
        seterrLoad(null)
        setloading(true)
        setCheckedTypeEmpty(true)
        if(checkedTOP250 == "checkedTOP250"){
            setValueSearch("Подборка Фильмов из ТОП 250")
            setloading(false);
            top250Id()
            .then((response) =>{ // вызываем промис нужен .then
                //setFilmId(responsePOP100)
                setArrFilmPOP100Id(response)
                console.log(response[0])
                setFilmId(response[0])
                setNumberArrCarousel(0)
            })
            //setloading(false);
            //let idTop250 = top250Id()    
            //setFilmId(idTop250);
            //return
            // arrFilmId.unshift(idTop250)
            // setFavorits([item, ...arrFilmId])
            // console.log(listItems)
        }
        else{
            setloading(false);
            setValueSearch("Подборка Фильмов из ТОП Недели")
            pop100Film()
            .then((responsePOP100) =>{ // вызываем промис нужен .then
                //setFilmId(responsePOP100)
                setArrFilmPOP100Id(responsePOP100)
                console.log(responsePOP100[0])
                setFilmId(responsePOP100[0])
                setNumberArrCarousel(0)
            })
        }
        }
    // expr ? true : false
    // expr && <div></div>
    return (
        
        <div >
        { adviceAboutButton && 
        <div className="backDiv" onClick={handleCloseModalAdvice}>
            <div className="adviceAboutTOP">
                <div className="adviceArrow">🢁 🢁</div> 
                Найти подборку Фильмов из <br /> ТОП 250 Кинопоиска или ТОП Этой недели 
                </div>
            <div className="adviceAboutParametr">
                <div className="adviceArrow">🢁 🢁</div>
                Найти Фильм или сериал <br /> по указанным параметрам 
                </div>
            <div className="adviceAboutRandom">
                <div className="adviceArrow">🢁 🢁</div>
                Найти случайный Фильм</div>
        </div>}
            
            <Header onClick={handleSearchClickFunc} checkBoxValue={handleClickCheckBox} handleSearchRandomClickFunc ={handleSearchRandomClickFunc} clickFulterFilm ={handleCliclFulterFilm} checkedTypeEmpty={checkedTypeEmpty}/>
            {
                loading == true && <LoadIndicator />
            }
            <div>
                {adviceText && 
                <div className="adviceText">
                    Не можешь определиться какой фильм посмотреть перед сном? <br /> 
                    Данный сервис поможет найти случайный фильм для твоего отдыха.<br />Выбирай Фильмы, добавляй в подборку. Удачи!"<br />
                    <img className="adviceImg" src="https://cdn.cancerhistoryproject.com/media/2020/12/27174202/magnify-glass.png" ></img>
                </div>
                }
            </div>
            <div  className="mainContent">
                {
                //<div className="emptyCarouselContent"></div>
                }
                {
                    arrFilmPOP100Id && <Button className="carouselButton" text="Влево" onClick={carouselCheangeFilmLeft} />
                }
                <div className="mainBlockCarousel"  ref = {contentMainRef}>
                
                    {  
                    loading == false && errLoad == null && filmId != null &&
                    <div className="mainBlockInfo">
                        <div className="mainBlockText">
                        {valueSearch == "Фильм по параметрам" ?
                            valueSearch
                           // valueSearch +":"+ valueCountris + valueTypeFilm + valueRangeAfter + valueRangeBefore
                            :
                            valueSearch
                            
                        }
                        </div>
                        <Content
                            addAnimationCarousel={addAnimationCarousel}
                            filmId={filmId} 
                            moreGetId={moreGetId} 
                            onChangeFavorite={cheangeStar}
                            deletFilmContent={deletFilmContent}
                            isFavorite={checkedStar}
                            />
                    </div>
                    }

                </div>
                {
                    arrFilmPOP100Id && <Button className="carouselButton"text="Вправо" onClick={carouselCheangeFilmRight}/>
                }

                {
                //<div className="emptyCarouselContent"></div>
                }
            </div>
            {arrFilmId.length != 0 && <div className="favorite">
                {
                    <div className="faoriteLable">Подборка избранных фильмов</div>
                }
                <Button className="favoriteButtonRandomSelect" text ="Случайный фильм из Подборки" onClick = {selectRandomFavoriteFilm}/>
                <Button className="favoriteButtonDelet" text ="Удалить Подборку" onClick = {deletAllFavotireFilms}/>
                </div>
                }
            <div className="favoritFilmPoster">
            {
                arrFilmId.length != 0 && arrFilmId.map((filmIdArr)=>
                <FavoriteFilm key={filmIdArr.toString()} filmId={filmIdArr} onCliclButon={deletFavoriteFilm}/>)
            }
            </div>
            {
                modalVisibility  && <Modal textModal={errLoad} onSubmit={callFunc} onClose={handleCloseModalFunc} text={errTextButton}/>
            }
            {
                modalFulter  && 
                <ModalFulterFilm 
                    textModal={"Укажите параметры фильма"} 
                    onSubmit={handleSumbmitFulterFilm} 
                    onClose={handleCloseModalFunc} 
                    text={"Найти!"} 
                    allGeners={arrAllGeners}
                    allCountris={arrAllCountris}
                    handleGeners={handleGeners}
                    handleCountris={handleCountris}
                    handleTypeFilm={handleTypeFilm}
                    valueRangeBefore={valueRangeBefore}
                    valueRangeAfter={valueRangeAfter}
                    handleRangeBefore={handleRangeBefore}
                    handleRangeAfter={handleRangeAfter}
                    
                />
            }
        </div>
    )
}
