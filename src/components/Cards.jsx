import Card from './Card';

export default function Cards(props) {
   const cards = props.characters.map( (e) => 
      <div className='col'>
         <Card
            id={e.id}
            key={e.id}
            onClose={props.onClose}
            name={e.name}
            status={e.status}
            species={e.species}
            gender={e.gender}
            origin={e.origin.name}
            image={e.image}> 
         </Card>
      </div>
   )
   return (
      <div className='row row-cols-6'>
         {cards}
      </div>
   )
}
