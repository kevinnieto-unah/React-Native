import React, { useContext} from 'react'
//import { Text } from 'react-native'
import PedidosContext from '../context/pedidos/pedidosContext'
import { VStack, Box, Divider, Center, Image, Text, HStack, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
const DetallePlatillo = () => {
  //return <Text>Hola</Text>
  const {platillo} = useContext(PedidosContext)
  const navigation=useNavigation()
  console.log(platillo)
  return (
    <Box border="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          <Center>
            <Text bold italic underline fontSize='3xl'>
              {platillo.nombre}
            </Text>
          </Center>
        </Box>
        <Box>
          <Center>
              <Image source={{
              uri: platillo.imagen
            }} alt="Alternate Text" size="xl" />
          </Center>
        </Box>
        <Box px="4">
          {platillo.descripcion}
        </Box>
        <Box px="4" pb="4">
          <Center>
            <Text highlight bold
            fontSize='3xl'
            _dark={{
              color: "coolgray.800"
            }}>
            Precio: {platillo.precio} $
            </Text>
          </Center>
        </Box>
        <Box mb={0} px={3}>
          <HStack px={3} bg="#c21979" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable cursor="pointer" py="3" flex={1} onPress={() => navigation.navigate("FormularioPlatillo")}>
            <Center>
              
              <Text bold
              
              color="#fff" fontSize="2xl" >
                Ordenar platillo
              </Text>
            </Center>
          </Pressable>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}


export default DetallePlatillo;