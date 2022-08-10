import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,//Componente unicamente para IPhone
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  FlatList,
  Modal,
  Button,
  Alert
} from 'react-native';
import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)
  
  
   useEffect(() => { 
       const obtenerCitasStorage = async () => {
         try {
             const citasStorage = await AsyncStorage.getItem('citas')       
             if (citasStorage) {
               const formateado=JSON.parse(citasStorage)
               setPacientes( formateado)
               console.log(pacientes);
             }        
         } catch (error) {
             console.log(error)
         }
       }
       obtenerCitasStorage()
 }, [])

  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id )
    setPaciente(pacienteEditar[0])
    console.log(paciente);
  }

  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        { text: 'Si, Eliminar', onPress: () => {
            const pacientesActualizados = pacientes.filter( pacientesState => pacientesState.id !== id )
            setPacientes(pacientesActualizados)
        }}
      ]
    )
}

  const nuevaCitaHandler=()=>{
    setModalVisible(true)
  }  
  const cerrarModal = () => {
    setModalVisible(false)
  }

  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        style={styles.btnNuevaCita}
        onPress={nuevaCitaHandler}
      >
        <Text
          style={styles.btnTextoNuevaCita}
        >
          Nueva Cita
        </Text>
      </Pressable>
      
      
      {pacientes.lenght !== 0 ? 
          <FlatList
          style={styles.listado}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return(
                <Paciente
                  key={item.id } 
                  style={styles.listado}
                  item={item}
                  setPaciente={setPaciente}
                  setModalVisible={setModalVisible}
                  pacienteEditar={pacienteEditar}
                  pacienteEliminar={pacienteEliminar}
                  setModalPaciente={setModalPaciente}
  

                />
              )
            }}
          /> :
          <Text style={styles.noPacientes}>No hay pacientes aún</Text> 
          
        }
    

      



      <Formulario
        modalVisible={modalVisible}
        cerrarModal={cerrarModal}
        setPacientes={setPacientes}
        pacientes={pacientes}
        paciente={paciente}
        setPaciente={setPaciente}
        guardarCitasStorage={guardarCitasStorage}

      />

      <Modal
        visible={modalPaciente}
        animationType='slide'
      >
        <InformacionPaciente 
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>

      
    </SafeAreaView>
  );
};

//ESTILOS DEL DOCUMENTO
const styles =StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 25,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})

export default App;
