import React from 'react'
import {Button, Text} from 'native-base'
import { useNavigation } from '@react-navigation/native';



export const BotonResumen = () => {
    const navigation=useNavigation()
  return (
    <Button backgroundColor='#c21979'
        onPress={()=>navigation.navigate("ResumenPedido")}
    >
        <Text color='#ffccbb' fontSize='xl'>Pedido</Text>
    </Button>
  )
}