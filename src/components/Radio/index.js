import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Radio = ({options=[], onChangeSelect, selected}) => {

  return (

    <View  style={{flex: 1}}>

        {options.map((opt) => {

          return (

            <TouchableOpacity 
              key={opt} 
              onPress={() => onChangeSelect(opt)}
              style={styles.container}
            >

              <View style={styles.outlineopt}>
                {selected == opt && <View style={styles.innerCircle} />}
              </View>

              <Text style={{color: '#6A4E98', fontSize: 16, marginLeft: 10}}>{opt}</Text>

            </TouchableOpacity>
          )
        })}

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
       
  },
  outlineopt:{
    width: 25,
    height: 25,
    borderRadius: 15,
    borderColor: '#6A4E98',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle:{
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: '#6A4E98',
  }


})

export default Radio;