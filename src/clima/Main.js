import React, { useEffect, useState } from 'react'
import styles from './Main.module.css'
import axios from 'axios';
function Main() {
    /* usestate pede a localização */
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
            <><div className = { styles.container }><h1 className={styles.tituloSemgps}>Você precisa habilitar a localização no browser e atualizar a página.</h1></div></>
        )
    }else if(weather === false){
        <><div className = { styles.container }><h2 className={styles.tituloCarregando}>Carregando o clima...</h2></div></>
    }else{
        return(
            <>
                <div className = { styles.container }>
                    <h3 className={styles.titulo}>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
                    
                    <ul className={styles.listaInfo}>

                        <li className={styles.info}>Temperatura atual: {weather['main']['temp']}°</li>

                        <li className={styles.info}>Temperatura máxima: {weather['main']['temp_max']}°</li>

                        <li className={styles.info}>Temperatura mínima: {weather['main']['temp_min']}°</li>

                        <li className={styles.info}>Pressão: {weather['main']['pressure']} hpa</li>

                        <li className={styles.info}>Umidade: {weather['main']['humidity']}%</li>

                    </ul>
                </div>
            </>
        )
    }

  return (
    <></>
  )
}

export default Main