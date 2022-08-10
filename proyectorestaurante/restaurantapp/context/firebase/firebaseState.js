import React, { useReducer } from 'react';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext'
import firebase from '../../firebase';
import { OBTENER_PRODUCTOS } from '../../types';

import _ from 'lodash'

const FirebaseState=(props)=>{

    const initialState={
        menu:[]
    }
    
    const [state, dispatch]=useReducer(FirebaseReducer, initialState)

    const obtenerProductos=()=>{
        
        firebase.db.collection('productos')
        .where('existencia', '==', true)
        .onSnapshot(manejarSnapshot);
        
        function manejarSnapshot(snapshot){
            let platillos= snapshot.docs.map(doc=>{
                return {
                    id: doc.id,
                    ...doc.data()
                }
            
            })
            
            platillos=_.sortBy(platillos, 'categoria')
            
            dispatch({
                type:OBTENER_PRODUCTOS,
                payload: platillos
            })
            
        }
        
        /*
        const query=firebase.db.collection("productos");
        const querySnapshot=await query.get();
    
        // guarda los productos en un array
    
        const response=querySnapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()
        }));
        console.log(response)*/
        
    }
    
    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    
    )
}

export default FirebaseState;