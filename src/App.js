import './App.css';
import { connect } from "react-redux";
import { removeFav } from './redux/actions';
import Cards from './components/Cards.jsx';
import Detail from './components/Detail.jsx'
import About from './components/About.jsx'
import Error from './components/Error';
import Nav from './components/Nav';
import Form from './components/Form';
import Favorites from './components/Favorites';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios'

function App(props) {
   const [characters, setCharacters] = useState([])
   const [access, setAccess] = useState(false)
   // para ver si esta logeado, tengo q terminar esto
   const [loginInfo, setloginInfo] = useState({user:'',logged:false})
   const EMAIL = 'joaisaia1@gmail.com'
   const PASSWORD = 'abcd123'
   const navigate = useNavigate();
   const URL_BASE = 'https://be-a-rym.up.railway.app/api/character'
   const API = '671e179ace4c.fd2bbe0ad61036f8581c'

   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setloginInfo({user:'Joaco',logged:true})
         setAccess(true);
         navigate('/home');
      }
   }

   function logout() {
      setloginInfo({user:'',logged:false})
      setAccess(false)
      navigate('/')
   }
   
   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   function onSearch(id){
      if (characters.find((char) => char.id === parseInt(id))) {
         window.alert('¡El personaje ya existe!');
         return
      }
      axios(`${URL_BASE}/${id}?key=${API}`).then(({ data }) => {
      if (data.name) {
         setCharacters((oldChars) => [...oldChars, data]);
      } else {
         window.alert('¡No hay personajes con este ID!');
      }
   });
   }

   function onClose(id){
      let char = characters.filter((character) => {
         return character.id !== parseInt(id)
      })
      props.myFavorites.forEach((fav) => {
         if (fav.id === id) {
            props.removeFav(id);
         }
      });
      setCharacters(char)

   }
   return (
      <div className='App'>
         <Nav onSearch={onSearch} username={loginInfo.user} logout={logout} logged={loginInfo.logged} />
         <Routes>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/' element={<Form login={login} />}/>
            <Route path='/:str' element={<Error/>}/>
         </Routes>
      </div>
   );
}

export function mapDispatchToProps(dispatch){
   return {
      removeFav: (id) => dispatch(removeFav(id))
   }
}

export function mapStateToProps(state){
   return {
      myFavorites: state.myFavorites
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
