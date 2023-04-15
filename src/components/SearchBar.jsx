import { useState } from "react";

export default function SearchBar(props) {
   const [id,setId] = useState('')
 
   const handleChange = (event) => {
      setId(event.target.value)
   }
   const handleAdd = () => {
      if (id.trim() !== '') {
         props.onSearch(id)
         setId('')
      }
   }
   const handleRandom = () => {
      props.onSearch(Math.floor(Math.random() * 826) + 1)
   }
   return (
      <div className="row g-3 align-items-center">
         <div className="col-auto ">
            <input   type='search' value={id} onChange={handleChange} className="form-control"/>
         </div>
         <div className="col-auto">
            <button onClick={handleAdd} className="btn btn-primary">Agregar</button>
         </div>
         <div className="col-auto">
            <button onClick={handleRandom} className="btn btn-primary">Agregar Random</button>
         </div>
      </div>
   );
}
