import { ADD_FAV, FILTER, REMOVE_FAV, ORDER } from "./types"

const initialState = {
    myFavorites: [],
    subArray: []
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: [...state.myFavorites, payload],
                subArray: [...state.myFavorites, payload],
            }
        case REMOVE_FAV:
            return{
                ...state,
                myFavorites: state.myFavorites.filter(element => element.id !== parseInt(payload)),
                subArray: state.myFavorites.filter(element => element.id !== parseInt(payload)),
            }
        case FILTER:
            let auxArray = state.myFavorites
            if (payload !== 'All'){
                auxArray = state.myFavorites.filter(element => element.gender === payload)
            }
            return {
                ...state,
                subArray: auxArray
            }
        case ORDER:
            let fn
            if (payload === 'A') {fn = (a, b) => (a.id > b.id) ? 1 : -1 }
            else if (payload === 'D') {fn = (a, b) => (a.id < b.id) ? 1 : -1}
            return {
                ...state,
                subArray: [...state.subArray].sort(fn)
            }
        default:
            return {
                ...state,
            }
    }
}

export default rootReducer