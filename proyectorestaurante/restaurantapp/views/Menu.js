import React, {Fragment, useContext, useEffect} from 'react';
import { Pressable, StyleSheet} from 'react-native'
import {
  Separator,
  FlatList,
  Text,
  Box,
  HStack,
  VStack,
  Image,
  Spacer,
} from 'native-base';
import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidosContext from '../context/pedidos/pedidosContext';
import {useNavigation} from '@react-navigation/native';

const Menu = () => {
  const {menu, obtenerProductos} = useContext(FirebaseContext);
  const {pedidos, platillo, seleccionarPlatillo} = useContext(PedidosContext);

  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  }, []);


  const mostrarHeading=(categoria, index)=>{
    if(index>0){
      const categoriaAnterior= menu[index-1].categoria
      if(categoriaAnterior !==categoria){
        return (
          <Fragment>
            <Spacer />
            
            <Text fontSize="xl" style={styles.separadorTexto} alignSelf="flex-start"
                  mb={2} 
                  _dark={{
                    color: "warmGray.50"
                  }}
                  color="coolPink.500"
                  >{categoria}
            </Text>
          </Fragment>
          ) 
        }
    }else{
      return (
        <Fragment>
          <Spacer />
          <Text fontSize="xl" _dark={{
                        color: "warmPink.50"
                      }} color="coolPink.500" alignSelf="flex-start"
                mb={2}      
                >{categoria}
          </Text>
        </Fragment>
        ) 
    
    }
    
   
  }
  


  return (
    <Box style={{backgroundColor: '#fff'}}>
      <FlatList
        data={menu}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              seleccionarPlatillo(item);
              navigation.navigate('DetallePlatillo');
            }}>
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.600',
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2">
              <Fragment>
                {mostrarHeading(item.categoria, index)}
                <HStack space={3} justifyContent="space-between">
                  <Image
                    size="16"
                    source={{uri: item.imagen}}
                    alt="react-native"
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.nombre}
                    </Text>
                    <Text
                      color="coolGray.600"
                      numberOfLines={2}
                      note
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.descripcion}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xl"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item.precio} L
                  </Text>
                </HStack>
              </Fragment>
            </Box>
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};

const styles=StyleSheet.create({
  separador:{
   
  },
  separadorTexto:{
    color:'##cFD100',
    fontStyle:'uppercase',
    textTransform: 'uppercase'
    
  }
  
})

export default Menu;
