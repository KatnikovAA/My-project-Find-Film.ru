import { getRandomId, getRandomInt } from "../tools"
import { minFilmId, maxFilmId } from "../const"

export const getRandomFilmId = () => {
    let count = 0;
    let maxCount = 15;
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
                return response.json()
                .then((response)=>{
                    if(response.nameRu == null || response.ratingKinopoisk == null)
                    {
                        console.log("нет инфы" , response.nameRu , response.ratingKinopoisk )
                        count++
                        return repeat();
                    } else
                    {
                    console.log("Вышел")
                    return id;
                    }
                })
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

export function top250Id() {
    const top250IdValue = [0,435,329,326,448,3498,328,312,535341,342,258687,679486,476,42664,2360,111543,361,370,474,279102,447301,430,46708,44386,77263,43395,522,526,4374,32898,397667,324,25108,957887,573759,301,42770,41519,381,470553,649917,1143242,325,49684,2213,689,586397,389,322,42782,41520,5502,77335,43869,4871,63991,42736,355,1108577,387556,8124,327,45146,44027,775276,958722,46225,195334,725190,346,437410,444,4541,280172,688,44168,5619,44745,63912,89514,407636,395787,7103,714248,441,458,530,104938,9691,399,102124,5273,42571,462682,77269,5277,42172,4996,7724,1009142,456,848894,839,2361,278522,395,2656,470191,6877,8221,527,345,835086,775273,81733,46285,16117,41381,377,77283,77264,963343,819101,7640,12198,1949,46745,408876,46068,382,8125,41431,349,645118,436263,6006,450213,843649,920265,325381,740,81297,694633,512883,46789,627,61237,44811,538,336,8129,26656,7097,592260,5928,8227,45660,126196,371,356,8147,572553,2513,540,251733,44238,46063,965754,8408,3797,808639,46638,485311,408410,341,966036,77203,46368,519,7226,392541,1991,683999,17579,1091,77531,338,689066,864138,89515,77132,843650,693126,46089,1188529,597,5167,5492,81555,1008113,841081,447,281251,7908,368937,751,279850,394,367,1178267,86326,8222,7660,841263,3442,2950,571896,263531,472,707,39259,41956,929348,255611,2428,658,738,276762,406,350,333,46512,94296,46066,461939,803422,3561,4695,838,471,885317,386,1846,8240,43602,596125,48356,466581,462867,1191022];
    let lngNameValue  = top250IdValue.length;
    let nmbrName = getRandomInt(1,lngNameValue);
    return top250IdValue[nmbrName];
  }


