import React, { useEffect, useState } from 'react'

function Main() {
    /* usestate roda para pedir a localização */
    const [location,setLocation] = useState(false);

    /* useeffect roda assim que o app for aberto pedindo a localização */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            setLocation(true);
        })
    }, [/* usado para chamar somente quando for aberto */]);

    if(location == false){
        return(
            <>Você precisa Habilitar a localização no browser!</>
        )
    }else{
        return(
            <>
                <h3>Clima nas suas Coordenadas: Exemplo</h3>
                <hr/>
                <ul>

                    <li>Temperatura atual: x°</li>

                    <li>Temperatura máxima: x°</li>

                    <li>Temperatura mínima: x°</li>

                    <li>Pressão: X hpa</li>

                    <li>Umidade realativa: x%</li>

                </ul>
            </>
        )
    }

  return (
    <></>
  )
}

export default Main