import { getRandomId } from "../tools"
import { minFilmId, maxFilmId } from "../const"

export const getRandomFilmId = () => {
    let count = 0;
    let maxCount = 9;
    const repeat = () => {
        let id = getRandomId(minFilmId, maxFilmId)
        console.log("начало")
        return fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '5086766a-6459-4303-b5e7-0163dcefa45b',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) 
            {   
                
                return id;
                console.log("конце")
                // return fetch(`https://kinopoiskapiunofficial.tech/images/posters/kp/${id}.jpg`, {
                //     method: 'GET',
                //     redirect: 'follow',
                //     mode: "no-cors",
                //     headers: {
                //         'Access-Control-Allow-Origin': '*',
                //         'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                //         'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
                //     },
                // })
                // .catch((error)=>{
                //     console.log("аываы", {...error})
                // })
                // .then((response) => {
                //     console.log(response.json())
                //     return id;
                // })
                // .then((response)=>{
                //     console.log(response)
                //     return id;
                // })
                // console.log(response.json())
                //     return id
            }
            if (count < maxCount && !response.ok)
            {
                count++
                return repeat();
            }
            else
            {
                throw "На данный момент поиск фильма невозможен, просьба повторить позднее"
            }
            
        })
    }
    return repeat();
}
export const getFilm = (id) =>{
    //1 log
    console.log("Вызов fetch")
    //2 asyn call
    return fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        method: 'GET',
        headers: {
            'X-API-KEY': '5086766a-6459-4303-b5e7-0163dcefa45b',
            'Content-Type': 'application/json',
        },
    })  
    .then((response) => {
        if(response.ok){
            console.log("авыа" , response)
            return response.json();
        } else {
            throw "Фильма с таким Id на Кинопосике не существует.\n Просьба попробовать другой Id !";
        }
    })
    .then((response)=>{
        const result = {
            nameOriginal: response.nameOriginal,
            nameRu: response.nameRu,
            posterUrl: response.posterUrl,
            ratingKinopoisk: response.ratingKinopoisk,
            slogan: response.slogan,
            year: response.year,
            shortDescription: response.shortDescription,
            countries: response.countries.map((item) => item.country),
            genres: response.genres.map((item) => item.genre)
        }
        console.log(result)
        return result;
    })
    .catch((error1)=>{
        alert(error1)
    })
    //3exit
}
/*
 new Promise ((resolve, reject) => {
    resolve();
    reject();
 })
*/


