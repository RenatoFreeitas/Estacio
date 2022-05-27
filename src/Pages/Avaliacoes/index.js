import React, {useState, useEffect, useCallback} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AvaList from '../../components/AvaList';




export default function Avaliacoes({ route }){

    const navigation = useNavigation();
    const [user, setUser] = useState([]);

    useEffect(()=> {
        registrar();
    })

    useEffect(()=> {
      
        async function carregarAva(){
            const avaStorage = await AsyncStorage.getItem('@user');
            if(avaStorage){
                setUser(JSON.parse(avaStorage));
            }
        }

        carregarAva();
        
    }, [])

    useEffect(()=> {
      
        async function salvarAva(){
            await AsyncStorage.setItem('@user', JSON.stringify(user));
        }

        salvarAva();

    }, [user])

    const delAva = useCallback((data) => {
        const find = user.filter(r => r.cpf !== data.cpf);
        setUser(find);
    })

    function registrar(){

        if (
            route.params?.cpf == undefined || 
            route.params?.nome == undefined || 
            route.params?.datanasc == undefined || 
            route.params?.nota == undefined) return;

        const data = {
            nome: route.params?.nome,
            cpf: route.params?.cpf,
            datanasc: route.params?.datanasc,
            nota: route.params?.nota
        };

        const find = user.filter(r => r.cpf == data.cpf);

       // Teste se retorna objeto console.log(find)
       // Teste de condicional console.log(find == '')

        if(find == ''){
        setUser([...user, data]);}
    }

  return(
    <View style={styles.container}>

        <View style={styles.containericon}>

            <TouchableOpacity onPress={() => navigation.navigate('Principal')} style={styles.btnvoltar}>
                <Ionicons name='arrow-back-circle-sharp' color='#fff' size={60}/>
            </TouchableOpacity>

            <Text style={styles.titulo}>{route.params?.adm == false ? 'Avaliações' : 'Administrador'}</Text>

        </View>

        <View style={styles.containerflat}>

            <FlatList
                marginHorizontal={25}
                showsVerticalScrollIndicator={true}
                data={user}
                keyExtractor={(item) => String(item.cpf)}
                renderItem={({item}) => <AvaList data={item} adm={route.params.adm} delAva={delAva} />}
            />

        </View>

    </View>
  )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: "#623391",
        alignItems: 'flex-start'
    },
    containerflat:{
        flex: 7,
        backgroundColor: '#623391',
        width: '100%'
    },
    containericon:{
        flex: 1,
        backgroundColor: '#623391',
        flexDirection: 'row',
        width: '100%'
    },
    btnvoltar: {
        width: 60, 
        height: 60, 
        marginTop: 20, 
        marginLeft: 30
    },
    titulo:{
        color: '#fff',
        fontSize: 30,
        alignSelf: 'center',
        marginLeft: '10%'
    }


})