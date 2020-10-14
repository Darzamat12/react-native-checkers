import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect, useSelector } from "react-redux"
import {
  BUTTON_BORDER_RADIUS,
  colors,
  BUTTON_WIDTH,
  routes,
} from "../../constants"
import { styles } from "./styles"

const HomeScreen = ({ navigation }) => {
  const isDark = useSelector((state) => state.settings.isDarkTheme)
  return (
    <View
      style={[styles.home, { backgroundColor: isDark ? "black" : "white" }]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isDark ? colors.DARK_BUTTON : colors.LIGHT_BUTTON,
          },
        ]}
        onPress={() => {
          navigation.navigate(routes.GAME_SCREEN)
        }}
      >
        <Text style={[styles.text, { color: isDark ? "white" : "black" }]}>
          Play
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isDark ? colors.DARK_BUTTON : colors.LIGHT_BUTTON,
          },
        ]}
        onPress={() => {
          navigation.navigate(routes.SETTINGS_SCREEN)
        }}
      >
        <Text style={[styles.text, { color: isDark ? "white" : "black" }]}>
          Settings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isDark ? colors.DARK_BUTTON : colors.LIGHT_BUTTON,
          },
        ]}
        onPress={() => {}}
      >
        <Text style={[styles.text, { color: isDark ? "white" : "black" }]}>
          Exit
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen
