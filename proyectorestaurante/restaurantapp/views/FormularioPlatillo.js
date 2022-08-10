import React, { useContext, useState, useEffect} from 'react'
import { Alert } from 'react-native'
import PedidosContext from '../context/pedidos/pedidosContext'
import { 
VStack, 
Box, 
Divider, 
Center, 
Image, 
Text, 
HStack, 
Pressable, 
FormControl,
Input,
Stack,
Button,
Icon,
AddIcon, 
MinusIcon
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
const FormularioPlatillo = () => {
  const {platillo, guardarPedido}=useContext(PedidosContext)
  const {precio}=platillo
  const navigation=useNavigation()
  
  const [cantidad, setcantidad] = useState(1)
  const [total, settotal] = useState(precio)
  
  const decrementarUno=()=>{
    if(cantidad>1){
      const nuevaCantidad=parseInt(cantidad)-1
      setcantidad(nuevaCantidad)
    }
  }
  
  const incrementarUno=()=>{
    const nuevaCantidad=parseInt(cantidad)+1
    setcantidad(nuevaCantidad)
  }
  
  const calcularTotal=()=>{
    const totalPagar=precio*cantidad
    settotal(totalPagar)
  }
  useEffect(() => {
    calcularTotal()
  }, [cantidad])
  
  const confirmarPedido=()=>{
    Alert.alert('Agregar al pedido', 'Agregar el producto a tus pedidos',
    [
    {
      text:'Confirmar',
      onPress:()=>{
        const pedido={
          ...platillo,
          cantidad,
          total
        }
        guardarPedido(pedido)
        
        navigation.navigate("ResumenPedido")
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
    <FormControl px={4}>
      <Center>
        <Text fontSize='3xl' bold my={3}>
      
        Cantidad
        </Text>
      
      </Center>
   
      <HStack space={3} justifyContent="space-between">
          <Stack>
            <Button
              props
              colorScheme="dark"
              bg='#000'
              w={100}
              h={20}
              onPress={()=>decrementarUno()}
            >
            <MinusIcon color='#fff'/>
            </Button>
          </Stack>
          <Stack>
            <Input p={2} 
            value={cantidad.toString()} 
            type='number' w={100} h={20}
            textAlign='center'
            keyboardType='numeric'
            fontSize='3xl'
            onChangeText={(cantidad)=>setcantidad(cantidad)}
            />
          </Stack>
          <Stack>
              <Button
                colorScheme="dark"
                bg='#000'
                w={100}
                h={20}
                onPress={()=>incrementarUno()}
              >
              <AddIcon color='#fff'/>
              </Button>
          </Stack>
      </HStack>
      <Center my={5}>
        <Text fontSize='xl' bold my={3}>
      
        Subtotal: 
          <Text highlight bold fontSize='2xl'>
            {total} $
          </Text>
        </Text>
      
      </Center>
      <Box mb={0} px={3}>
          <HStack px={3} bg="#c21979" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable cursor="pointer" py="3" flex={1} onPress={() => confirmarPedido()}>
            <Center>
              
              <Text bold
              
              color="#fff" fontSize="2xl" >
                Agregar al pedido
              </Text>
            </Center>
          </Pressable>
          </HStack>
        </Box>
  </FormControl>
  )
}

export default FormularioPlatillo;