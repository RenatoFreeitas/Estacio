import React, { useState } from 'react';
import { Text,
         View,
         StyleSheet,
         TextInput,
         TouchableOpacity,
         Image,
         TouchableWithoutFeedback,
         Keyboard,
        } from 'react-native';

import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'

import CalculaIdade from './calculaIdade'

export default function Principal() {

  const [nome, setNome] = useState(null);
  const [cpf, setCPF] = useState(null);
  const [datanasc, setDatanasc] = useState(null);
  const [errornome, setErrornome] = useState(null);
  const [errorcpf, setErrorcpf] = useState(null);
  const [errordata, setErrordata] = useState(null);
  const [codadm, setCodAdm] = useState(false);

  const navigation = useNavigation();
 
  let cpfField = null


  const validar = () =>{

    const nomeReg = /^(([a-zA-Z ]{3,}|[é])*)$/
    const nomeReg2 = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/gmui
    const dataReg = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gm
    
    let error = false
    
    setErrorcpf(null)
    setErrordata(null)
    setErrornome(null)

    if (nome == null || nome == ''){
      setErrornome('Preencha seu Nome')
      error = true
    }else if (!nomeReg.test(String(nome)) || !nomeReg2.test(String(nome)) ){
      setErrornome("Preencha com um Nome válido!(Apenas Nome e Sobrenome)")
    }

    if(cpf == null || cpf == ''){
      setErrorcpf("Preencha seu CPF")
      error = true
    }else if (!cpfField.isValid()){
      setErrorcpf("Preencha com um CPF válido !")
      error = true
    }    

    if (datanasc == null || datanasc == ''){
      setErrordata('Preencha a Data de Nascimento')
      error = true
    }else if (!dataReg.test(String(datanasc)) || CalculaIdade(datanasc)<0){
      setErrordata('Preencha a Data de Nascimento Válida !')
      error = true
    }else if (CalculaIdade(datanasc)<16){
      setErrordata("Só pode tirar o Título de Eleitor quem tem 16 anos ou mais !")
      error = true
    }

    return !error
  }

  function acessar(){
    if (validar()){
      navigation.navigate('Instrucoes', {nome: nome, cpf: cpf, datanasc: datanasc});
      setNome(null)
      setCPF(null)
      setDatanasc(null)
    }
  }

  function clearAdmCod(text){
    
    if (text == '1449'){
      setNome(null)
    }else{
      setCodAdm(false)
    }
  }



  return(
    
    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Animatable.Image
          animation='flipInX'
          source={require('../../assets/Logo.png')}
          style={{
            width: '90%',
            height: '90%'
          }}
          resizeMode='contain'
        />
      </View>

      <Animatable.View delay={700} animation="fadeInUp" style={styles.containerForm}>
        <TextInput
          placeholder="Seu Nome..."
          placeholderTextColor='#6A4E98'
          style={styles.input}        
          value={nome}
          onChangeText={(text) => {
            setNome(text);
            setErrornome(null);
            setCodAdm(true);
            clearAdmCod(text);
          }}
        />
        {errornome != null && <Text style={styles.errorMessage}>{errornome}</Text>}

        <TextInputMask
          type={'cpf'}
          placeholder="Seu CPF..."
          placeholderTextColor='#6A4E98'
          style={styles.input}
          value={cpf}
          onChangeText={(text) => {
              setCPF(text)
              setErrorcpf(null)
            }}
          ref={(ref) => cpfField = ref}
        />
        {errorcpf != null && <Text style={styles.errorMessage}>{errorcpf}</Text>}

        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          placeholder="Sua Data de Nascimento (dd/mm/aaaa)..."
          placeholderTextColor='#6A4E98'
          style={styles.input}
          value={datanasc}
          onChangeText={(text) => {
            setDatanasc(text)
            setErrordata(null)
          }}
        />
        {errordata != null && <Text style={styles.errorMessage}>{errordata}</Text>}

        <TouchableOpacity style={styles.button} onPress={() => acessar()}>
          <Text style={styles.buttontext}>ACESSAR</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          {codadm && 
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Avaliacoes', {adm: true})}>
          <Text style={styles.buttontext}>AVALIAÇÕES</Text>
          </TouchableOpacity>}
        </TouchableOpacity>

        <View style={styles.containerimgEleicoes}>
        <Image
          source={require('../../assets/Eleicoes2022.png')}
          style={{
            width: 200,
            height: '100%'
          }}
          resizeMode='contain'
        />
        </View>

      </Animatable.View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#623391",
  },
  containerLogo:{
    flex: 1,
    backgroundColor: "#623391",
    justifyContent:'center',
    alignItems:'center',
    paddingTop: '5%'
  },
  containerForm:{
    flex: 1.5,
    paddingTop: 30,
    paddingStart: '10%',
    paddingEnd: '10%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: '#fff'
  },
  containerimgEleicoes:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center',
  },
  input:{
    color: '#6A4E98',
    borderBottomWidth: 2,
    borderColor: '#000',
    marginBottom: 5,
    fontSize: 14,
    height: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },
  button:{
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
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 5,
    color: "#f00",
    fontSize: 12
  }
  
})