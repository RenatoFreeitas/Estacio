import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

import Radio from '../../components/Radio'



const Instrucoes = ({route}) => {
  
  const [modalActive, setModalActive] = useState(false);
  const [index, setIndex] = useState();
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  function navegar(){
    navigation.navigate('Avaliacoes', {nome: route.params.nome, cpf: route.params.cpf, datanasc: route.params.datanasc, nota: selected, adm: false})
  }

  return(
    <View style={styles.container}>

      <Animatable.Text style={styles.lblInstucoes} delay={400} animation='fadeInLeft' >INSTRUÇÕES:</Animatable.Text>

      <Animatable.View style={styles.containericon} delay={600} animation= 'fadeInLeft'>
        <Ionicons name='arrow-redo-sharp' color='#fff' size={35}></Ionicons> 
        <Text style={styles.text}>Entrar no site www.tse.jus.br</Text>
      </Animatable.View>

      <Animatable.View style={styles.containericon} delay={800} animation= 'fadeInLeft'>
        <Ionicons name='arrow-redo-sharp' color='#fff' size={35}></Ionicons> 
        <Text style={styles.text}>Ir na opção Eleitor e eleições</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerimg} delay={1000} animation= 'fadeInLeft'>
        <Image
            source={require('../../assets/passo1.png')}
            style={{
              width: '90%',
              height: '90%'
            }}
          />
      </Animatable.View>
  

      <Animatable.View style={styles.containericon} delay={1200} animation= 'fadeInLeft'>
        <Ionicons name='arrow-redo-sharp' color='#fff' size={35}></Ionicons> 
        <Text style={styles.text}>No lado esquerdo na lista de Eleitor ir   na última opção Titulo de eleitor</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerimg} delay={1400} animation= 'fadeInLeft'>
        <Image
              source={require('../../assets/passo2.png')}
              style={{
                width: 800,
                height: '100%'
              }}
              resizeMode='contain'
            />
      </Animatable.View>

      <Animatable.View style={styles.containericon} delay={1600} animation= 'fadeInLeft'>
        <Ionicons name='arrow-redo-sharp' color='#fff' size={35}></Ionicons> 
        <Text style={styles.text}>Clicar em Como tirar seu título e em seguida clicar em acesse a página do Título Net</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerimg} delay={1600} animation= 'fadeInLeft'>
        <Image
              source={require('../../assets/passo3.png')}
              style={{
                width: '90%',
                height: '90%'
              }}
              resizeMode='contain'
            />
      </Animatable.View>

      <Animatable.View style={styles.containericon} delay={1800} animation= 'fadeInLeft'>
        <Ionicons name='arrow-redo-sharp' color='#fff' size={35}></Ionicons> 
        <Text style={styles.text}>Por fim ler atentamente e seguir instruções dadas</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerbutton} delay={2000} animation= 'fadeInUp'>
        <TouchableOpacity style={styles.button} onPress={() => setModalActive(true)}>
            <Text style={styles.buttontext}>AVALIAR APP</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalActive}
      >
        <View style={styles.outsidemodal}>
          <View style={styles.modalview}>
              <Text style={{color: '#6A4E98', fontSize: 16}}>Escolha uma opção para avaliação do APP</Text>
              <Radio
                selected={selected}
                options={["1 - Não foi útil", "2- Duvidoso", "3 - Bom", "4 - Útil", "5 - Consegui tirar o titulo"]}
                onChangeSelect={(opt) => {
                  setSelected(opt);
                  setModalActive(false);
                }}
                fim={selected != null && navegar()}
              />
          </View>
        </View>
      </Modal>          
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#623391",
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  containericon:{
    flex: 1,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',    
    
  },
  containerimg:{
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  containerbutton:{
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  lblInstucoes:{
    margin: 15,
    color:'#fff',
    fontSize: 20
  },
  text:{
    justifyContent: 'center',
    color: '#fff',
    margin:3,
    fontSize: 18,
    textAlign: 'center'
  },
  button:{
    width: '80%',
    backgroundColor: '#2cbcbc',
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttontext:{
    color:'#FFF',
    fontSize: 20,
  },
  outsidemodal:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'  
  },
  modalview:{
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 25,
    width: 360,
    height: 230,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }

})

export default Instrucoes;