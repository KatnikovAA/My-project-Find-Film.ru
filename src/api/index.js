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
        return {
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


