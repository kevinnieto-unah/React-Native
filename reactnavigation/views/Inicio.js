import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native'

const Inicio = ({navigation}) => {
//PROPS como navigation son propios de react navigate  y podemos acceder a ellos invocancdolos
    const informacion = { 
        clienteId: 5000,
        totalpagar: 500
    }

    const visitarNosotros = () => {
        //FUNCION PARA NAVEGAR(Componente, informacion en props)
        navigation.navigate('Nosotros', informacion)
    }

    return ( 
        <View style={styles.contenedor}>
            <Text>Inicio</Text>
            <Button
                title="Ir a Nosotros"
                onPress={ () => visitarNosotros() }
            />
        </View>
       
     );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
 
export default Inicio;