import { connect } from "react-redux"
import Card from './Card';
import { filterCards, orderCards } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Fragment } from "react";

function Favorites(props){


   const dispatch = useDispatch()

   const [aux, setAux] = useState(false)

    const cards = props.subArray.map( (e) => 
      <div className='col'>
         <Card
            id={e.id}
            key={e.id}
            onClose={props.onClose}
            name={e.name}
            status={e.status}
            species={e.species}
            gender={e.gender}
            origin={e.origin}
            image={e.image}> 
         </Card>
      </div>
   )

   function handleOrder(e){
      dispatch(orderCards(e.target.value))
      setAux(!aux)
   }
   function handleFilter(e){
      dispatch(filterCards(e.target.value))
   }

   return (
      <Fragment>
         <div>
               <select onChange={handleOrder}>
                  <option disabled hidden selected>Order by</option>
                  <option value="A">Ascendente</option>
                  <option value="D">Descendente</option>
               </select>
               <select onChange={handleFilter} defaultValue={'All'}>
                  <option value="All">Show All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Genderless">Genderless</option>
                  <option value="unknown">unknown</option>
               </select>
         </div>
         <div className='row row-cols-6'>
            {cards}
         </div>
      </Fragment>
   )
}

export function mapStateToProps(state){
    return {
        myFavorites: state.myFavorites,
        subArray: state.subArray
    }
    }
    
export default connect(mapStateToProps)(Favorites)