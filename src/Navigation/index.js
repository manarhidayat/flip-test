import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import ListTransactionScreen from '../Screens/ListTransactionScreen'
import DetailTransactionScreen from '../Screens/DetailTransactionScreen'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='List'
          component={ListTransactionScreen}
          options={{
            headerShown: false, 
          }} />
        <Stack.Screen name='Detail' component={DetailTransactionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator