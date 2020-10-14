import { ICell } from "./interfaces/ICell"
import {
  MIDDLE_ROWS,
  BLACK_SIDE,
  checkIfEven,
  BLACK_CHECKER,
  WHITE_CHECKER,
} from "./constants.js"

export const getBoardData = () => {
  const cells = []
  let tmp = []
  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
      let checkerColor
      if (checkIfEven(i, j) || j === MIDDLE_ROWS[0] || j === MIDDLE_ROWS[1])
        checkerColor = ""
      else if (j < BLACK_SIDE) checkerColor = BLACK_CHECKER
      else checkerColor = WHITE_CHECKER
      let cell: ICell = {
        checkerColor: checkerColor,
        isQueen: false,
        name: "",
        isSelected: false,
        isPossibleMove: false,
        startAnimationTo: {
          x: -1,
          y: -1,
          color: "",
        },
      }
      tmp.push(cell)
    }
    cells.push(tmp)
    tmp = []
  }
  return cells
}
