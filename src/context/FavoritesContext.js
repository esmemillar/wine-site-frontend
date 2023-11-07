import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const FavoritesContext = createContext();


//add wines here to test
const initialState = [
 {
        "name": "Argile",
        "price": "135",
        "year": "",
        "region": "Sud Ouest",
        "category": "Full body white",
        "_id": 111,
        "imageSrc": "./assets/argiletestpic.jpeg",
        "producer": "Chateau Lafitte",
        "producerId": 814,
        "grapes": "Petit Manseng",
        "notes": "Beautiful and frank minerality, dry white wine with surprising balance. Tension and fruit, fresh, lively, and length. Unique aromatics.",
        "method": ""
 }
];

const reducer = (state, action) => {
    switch (action.type){
        case 'add-to-favorites':
            return [...state, action.payload];

        case 'delete-from-favorites':
            return state.filter((product) => product._id !== action.payload._id);
       case 'clear-favorites':
            return [];
    }
};

export const FavoritesContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const addToFavorites = (data) => {
        dispatch({
            type: 'add-item-to-favorites',
            payload: {...data, quantity: 1}
        });
    };


    const deleteFromFavorites = (data) => {
        dispatch({
            type: 'delete-item-from-favorites',
            payload: {...data}
        })
    };


    const clearFavorites = () => {
        dispatch({
            type: 'clear-favorites'
        })
    };

    // console.log(state);

    return (
        <FavoritesContext.Provider value={{state, addToFavorites, deleteFromFavorites, clearFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
};
