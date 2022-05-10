import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Main() {
    /* usestate roda para pedir a localização */
    const [location,setLocation] = useState(false);

    /* armazena os dados da api */
    const [weather , setWeather] = useState(false);

    let getWeather = async (lat,long) => {
        let res = await axios.get("https://api.openweathermap.org/data/2.5/weather" , {
            params: {
                lat: lat,
                lon: long,
                appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
                lang: 'pt',
                units: 'metric'
            }
        });
        setWeather(res.data)
    }

    /* useeffect roda assim que o app for aberto pedindo a localização */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
            setLocation(true);
        })
    }, [/* usado para chamar somente quando for aberto */]);

    if(location === false){
        return(
            <>Você precisa Habilitar a localização no browser!</>
        )
    }else if(weather === false){
        <>Carregando o clima...</>
    }else{
        return(
            <>
                <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
                <hr/>
                <ul>

                    <li>Temperatura atual: {weather['main']['temp']}°</li>

                    <li>Temperatura máxima: {weather['main']['temp_max']}°</li>

                    <li>Temperatura mínima: {weather['main']['temp_min']}°</li>

                    <li>Pressão: {weather['main']['pressure']} hpa</li>

                    <li>Umidade realativa: {weather['main']['humidity']}%</li>

                </ul>
            </>
        )
    }

  return (
    <></>
  )
}

export default Main