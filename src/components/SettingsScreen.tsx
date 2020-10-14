import * as React from "react"
import { useCallback, useRef } from "react"
import {
  View,
  Text,
  Image,
  Animated,
  Button,
  PanResponder,
  StyleSheet,
  Switch,
} from "react-native"
import { connect, useDispatch } from "react-redux"
import { useState } from "react"
import { changeTheme } from "../redux/actions/settingsActions"
import {
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler"

const SettingsScreen = ({ data, dark }) => {
  const dispatch = useDispatch()
  const [isEnabled, setIsEnabled] = useState(!dark)
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState)
    dispatch(changeTheme())
  }

  return (
    <View
      style={[styles.container, { backgroundColor: dark ? "black" : "white" }]}
    >
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

const mapStateToProps = (state) => {
  return {
    data: state,
    dark: state.settings.darkTheme,
  }
}

export default connect(mapStateToProps, null)(SettingsScreen)
