import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Principal from '../Pages/Principal';
import Instrucoes from '../Pages/Instrucoes';
import Avaliacoes from '../Pages/Avaliacoes'

const Stack = createNativeStackNavigator();

export default function Routes(){
  return(
    <Stack.Navigator>
    <Stack.Screen
      name = "Principal"
      component = {Principal}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name = "Instrucoes"
      component = {Instrucoes}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name = "Avaliacoes"
      component = {Avaliacoes}
      options={{ headerShown: false }}
    />
    </Stack.Navigator>
  )
}