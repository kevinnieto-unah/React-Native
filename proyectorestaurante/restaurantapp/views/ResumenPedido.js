import React, { useContext, useEffect } from 'react'
import { Alert, Pressable, Fragment} from 'react-native'
import PedidosContext from '../context/pedidos/pedidosContext'
import firebase from '../firebase'
import {
  FlatList,
  Text,
  Box, 
  HStack,
  VStack,
  Image,
  Spacer,
  Center,
  Button
} from 'native-base'
import { useNavigation } from '@react-navigation/native';
const ResumenPedido = () => {
  const {pedidos, total, mostrarResumen, eliminarProducto, pedidorealizado}=useContext(PedidosContext)
  const navigation=useNavigation()
  
  const calcularTotal=()=>{
    let nuevoTotal=0;
    nuevoTotal=pedidos.reduce((nuevoTotal, articulo)=> nuevoTotal+articulo.total, 0
    )
    mostrarResumen(nuevoTotal)
  }
  
  useEffect(() => {
    calcularTotal()
  }, [pedidos])
  
  const confirmarCompra=()=>{
    Alert.alert('Realizar compra', 
    'Confirmas que deseas hacer la compra',
    [
    {
      text:'Confirmar',
      onPress:async()=>{
        const pedidoObj={
          tiempoEntrega:0,
          completado:false,
          total:Number(total),
          orden:pedidos,
          creado:Date.now()
        }
        try {
          const pedido=await firebase.db.collection('ordenes')
          .add(pedidoObj)
          pedidorealizado(pedido.id)
          navigation.navigate("ProgresoPedido")
        } catch (error) {
          console.log(error)
        }
        
      }
    },
    {
      text:'Cancelar',
      style:'cancel'
    }
    ]
    )
  }
  const confirmarEliminar=(id)=>{
    Alert.alert('Eliminar producto', 'No se puede revertir la acción',
    [
    {
      text:'Confirmar',
      onPress:()=>{
        eliminarProducto(id)
      }
    },
    {
      text:'Cancelar',
      style:'cancel'
    }
    ]
    )
  
  }
  return (
    <Box style={{backgroundColor:'#fff'}}>
        <FlatList data={pedidos} 
        
        renderItem={({
        item, index
      }) =>
      <Box borderBottomWidth="1" _dark={{
        borderColor: "gray.600"
      }} borderColor="coolGray.200" pl="4" pr="5" py="2"
     
      >
              <HStack 
              
              space={3} justifyContent="space-between">
                 <Image size="16" source={{ uri: item.imagen}} alt="react-native" />
                <VStack>
                  <Text _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" bold>
                    {item.nombre}
                  </Text>
                  <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                    }}>
                    cantidad: {item.cantidad}
                  </Text>
                  <Text color="coolGray.600" _dark={{
                    color: "warmGray.200"
                    }}>
                    precio: {item.precio}
                  </Text>
                </VStack>
                
                <Spacer />
                <VStack>
                  <Text fontSize="xl" _dark={{
                        color: "warmGray.50"
                      }} color="coolGray.800" alignSelf="flex-start">
                      {item.total} L
                  </Text>
                  <Box>
                    <HStack alignItems="center" safeAreaBottom shadow={6}>
                    <Button cursor="pointer" py="1" bg='red.500'
                      onPress={()=>confirmarEliminar(item.id)}
                    >
                      
                        <Text bold
                        
                        color="#fff" fontSize="sm" >
                          Eliminar
                        </Text>
                    </Button>
                    </HStack>
                  </Box>
                </VStack>
              </HStack>
            </Box>
            } keyExtractor={(item, i)=> item.id+i} />
            <Center my={5}>
              <Text fontSize='xl' bold my={3}>
            
              Total: 
                <Text highlight bold fontSize='2xl'>
                  {total} $
                </Text>
              </Text>
      
            </Center>
            <Box mb={0} px={3} >
              <HStack px={3} py={3} bg="#c21979" alignItems="center" safeAreaBottom shadow={6}>
              <Pressable cursor="pointer" py="3" flex={1} onPress={() => navigation.navigate("Menu")}>
                <Center>
                  
                  <Text bold
                  
                  color="#fff" fontSize="xl" >
                    Seguir Ordenando
                  </Text>
                </Center>
              </Pressable>
              </HStack>
            </Box>
            <Box mb={0} px={3} my={5} >
              <HStack px={3} py={3} bg="#000" alignItems="center" safeAreaBottom shadow={6}>
              <Pressable cursor="pointer" py="3" flex={1} onPress={() => confirmarCompra() }>
                <Center>
                  
                  <Text bold
                  
                  color="#fff" fontSize="xl" >
                    Finalizar y Hacer la Compra
                  </Text>
                </Center>
              </Pressable>
              </HStack>
            </Box>
      </Box>
  )
}

export default ResumenPedido;