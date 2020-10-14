import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },

  blackPart: {
    height: "40%",
    transform: [{ rotate: "180deg" }],
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  whitePart: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
  },
  mainText: {
    fontSize: 48,
  },
  secondaryText: {
    fontSize: 36,
  },
})
