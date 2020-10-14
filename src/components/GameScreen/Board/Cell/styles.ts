import { StyleSheet } from "react-native"
import {
  CHECKER_WIDTH,
  ABSOLUTE,
  CHECKER_MARGIN,
  CELL_WIDTH,
  RELATIVE,
} from "../../../../constants"

export const styles = StyleSheet.create({
  checker: {
    width: CHECKER_WIDTH,
    height: CHECKER_WIDTH,
    position: ABSOLUTE,
    marginLeft: CHECKER_MARGIN,
    marginTop: CHECKER_MARGIN,
  },
  cell: {
    position: RELATIVE,
    height: CELL_WIDTH,
    width: CELL_WIDTH,
  },
})
