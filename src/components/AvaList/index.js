import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'

export default function AvaList({ data, adm=false, delAva }) {
 
    return(

        <Animatable.View 
            style={styles.container}
            animation='bounceIn'
            useNativeDriver
        >

            <View style={{flex:6}}>

                <Text style={styles.user}>Nome: {data.nome}</Text>
                <Text style={styles.user}>CPF: {data.cpf}</Text>
                <Text style={styles.user}>Data: {data.datanasc}</Text>
                <Text style={styles.user}>Nota: {data.nota}</Text>

            </View>

            {adm &&
            <TouchableOpacity style={{flex: 1}} onPress={() => delAva(data)}>
                <Ionicons name='trash' color='red' size={40}/>
            </TouchableOpacity>}
            
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        margin: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3
        },
    },
    user:{
        flex: 1,
        color: '#6A4E98',
    }

})
