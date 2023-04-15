import axios from "axios"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"


function Detail(){
    const [character,setCharacter] = useState({})
    const {id} = useParams()
    useEffect(() => {
        axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);

    return(
        <div>
            <h2>ID: {id} </h2>
            <h2>Nombre: {character.name}</h2>
            <h2>Especie: {character.species}</h2>
            <h2>Genero: {character.gender}</h2>
            <h2>Origen: {character.origin ? `${character.origin.name}` : ''}</h2>
            <img src={character.image} alt=''/> 
        </div>
    )
}
export default Detail