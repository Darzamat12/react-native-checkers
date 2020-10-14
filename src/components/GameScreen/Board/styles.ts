import { StyleSheet } from "react-native"
import { CELL_WIDTH, FLEX, ROW } from "../../../constants"

export const styles = StyleSheet.create({
  underBoard: {
    display: FLEX,
    flexDirection: ROW,
    height: 8 * CELL_WIDTH,
    width: 8 * CELL_WIDTH,
  },
  underCol: {
    height: 8 * CELL_WIDTH,
    width: 40,
  },
})
