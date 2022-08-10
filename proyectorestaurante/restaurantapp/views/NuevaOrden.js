import React from 'react'
import { View } from 'react-native'
import {Container, Text, Button, Center} from 'native-base'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
/*Before declaring the class */

  
const NuevaOrden = () => {
  const navigation=useNavigation();
  return (
      <Center flex={1} style={globalStyles.Container} px={5}>
        <View mx="auto" px="auto " width="100%">
            <Button block solid colorScheme="secondary"
              onPress={()=>navigation.navigate('Menu')}
            >
              <Text style={globalStyles.botonTexto}>Nueva Orden</Text>
            </Button>
        </View>
      </Center>
  )
}

export default NuevaOrden;