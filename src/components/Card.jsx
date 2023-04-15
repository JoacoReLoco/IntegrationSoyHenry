import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFav, removeFav } from "../redux/actions";
import { useState } from "react";
import { useEffect } from "react";

function Card(props) {
   const [isFav, setIsFav] = useState(false)
   
   useEffect(() => {
      props.myFavorites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [props.myFavorites]);

   function handleFavorite(){
      if (isFav) {
         setIsFav(false)
         props.removeFav(props.id)
      }
      else {
         setIsFav(true)
         props.addFav(props)
      }
   }


   return (
      <div className="card" style={{width: '18rem'}}>
         {isFav ? (
               <button onClick={handleFavorite}>❤️</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }
         <img src={props.image} className="card-img-top" alt=''/> 
         <ul className="list-group list-group-flush">
            <li className="list-group-item">
               <Link to={`/detail/${props.id}`}>
                  <h3>{props.name}</h3>
               </Link>
            </li>
            <li className="list-group-item"><h5>Status: {props.status}</h5></li>
            <li className="list-group-item"><h5>Specie: {props.species}</h5></li>
            <li className="list-group-item"><h5>Gender: {props.gender}</h5></li>
            <li className="list-group-item"><h5>Origin: {props.origin}</h5></li>
            <li className="list-group-item"><h5>Id: {props.id}</h5></li>
            <li className="list-group-item"><button className="btn btn-danger" onClick={() => props.onClose(props.id)}>Remove</button></li>
         </ul>
      </div>
   );
}

export function mapDispatchToProps(dispatch){
   return {
      addFav: (personaje) => dispatch(addFav(personaje)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}

export function mapStateToProps(state){
   return {
      myFavorites: state.myFavorites
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card)