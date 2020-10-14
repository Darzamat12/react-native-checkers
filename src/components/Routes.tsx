import * as React from "react"
import { NavigationContainer, StackActions } from "@react-navigation/native"
import HomeScreen from "./HomeScreen"
import SettingsScreen from "./SettingsScreen"
import GameScreen from "./GameScreen"
import { routes } from "../constants"
import { createStackNavigator } from "@react-navigation/stack"
import ResultsScreen from "./ResultsScreen"

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={routes.GAME_SCREEN} component={GameScreen} />
        <Stack.Screen
          name={routes.SETTINGS_SCREEN}
          component={SettingsScreen}
        />
        <Stack.Screen name={routes.RESULTS_SCREEN} component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
