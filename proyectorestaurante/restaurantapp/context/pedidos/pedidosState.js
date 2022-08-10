import React, { useReducer } from 'react';
import PedidosReducer from './pedidosReducer';
import PedidosContext from './pedidosContext'
import { CONFIRMAR_ORDENAR_PLATILLO, ELIMINAR_PRODUCTO, MOSTRAR_RESUMEN, PEDIDO_ORDENADO, SELECCIONAR_PRODUCTO } from '../../types';

const PedidosState=(props)=>{

    const initialState={
        pedidos:[],
        platillo:{},
        total:0,
        idPedido:''
    }
    
    const [state, dispatch]=useReducer(PedidosReducer, initialState)
    
    const seleccionarPlatillo=(platillo)=>{
        console.log(platillo);
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload:platillo
        
        })
    
    }
    
    const guardarPedido=pedido=>{
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload:pedido
        })
    }
    
    const mostrarResumen=(total)=>{
        dispatch({
        type:MOSTRAR_RESUMEN,
        payload:total})
    }
    
    const eliminarProducto=(id)=>{
        dispatch({
            type:ELIMINAR_PRODUCTO,
            payload:id
        })
    }
    const pedidorealizado=(id)=>{
        dispatch({
            type:PEDIDO_ORDENADO,
            payload:id
        })
    }
    return (
        <PedidosContext.Provider
            value={{
            pedidos: state.pedidos,
            platillo:state.platillo,
            seleccionarPlatillo,
            guardarPedido,
            total:state.total,
            mostrarResumen, 
            eliminarProducto,
            idPedido:state.idPedido,
            pedidorealizado
            }}
        
        >
            {props.children}
        </PedidosContext.Provider>
    
    )
}

export default PedidosState;