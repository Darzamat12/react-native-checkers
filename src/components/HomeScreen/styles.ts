import { StyleSheet } from "react-native"
import { BUTTON_WIDTH, BUTTON_BORDER_RADIUS } from "../../constants"

export const styles = StyleSheet.create({
  home: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    width: BUTTON_WIDTH,
    borderRadius: BUTTON_BORDER_RADIUS,
  },
  text: {
    textAlign: "center",
    fontSize: 32,
  },
})
