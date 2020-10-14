import * as React from "react"
import { useRef, useState } from "react"
import {
  ABSOLUTE,
  BOARD_BOTTOM_BORDER,
  BOARD_TOP_BORDER,
  CELL_WIDTH,
  CHECKER_MARGIN,
  CHECKER_WIDTH,
  colors,
  GREEN_CELL_COLOR,
  MOVE_ANIMATION_DURATION,
  RELATIVE,
  TRANSPARENT_CELL,
  YELLOW_CELL_COLOR,
} from "../../../../constants"

import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native"
import { connect, useDispatch, useSelector } from "react-redux"

import { ICell } from "../../../../interfaces/ICell"
import { styles } from "./styles"

import WhiteCheckerIcon from "../../../../assets/whiteChecker.png"
import BlackCheckerIcon from "../../../../assets/blackChecker.png"
import WhiteQueenIcon from "../../../../assets/whiteQueen.png"
import BlackQueenIcon from "../../../../assets/blackQueen.png"

import { WHITE_CHECKER, BLACK_CHECKER } from "../../../../constants"

import { gameInfoActions } from "../../../../redux/actions/gameInfoActions"

const Cell = (props: {
  data: []
  x: number
  y: number
  turn: boolean
  somethingSelected: boolean
  cellData: { checkerColor: string; isQueen: boolean }
  animationInProcess: boolean
}) => {
  const data = useSelector((state) => state.gameInfo.checkersData)
  const animationInProcess = useSelector(
    (state) => state.gameInfo.animationInProcess
  )
  const currTurn = useSelector((state) => state.gameInfo.whitesTurn)
  const somethingSelected = useSelector(
    (state) => state.gameInfo.somethingSelected
  )
  const [isMoving, setIsMoving] = useState(false)
  const pan = useRef(new Animated.ValueXY()).current
  const moveAnimation = new Animated.Value(0) // rename
  const nextTurn = !currTurn ? WHITE_CHECKER : BLACK_CHECKER
  const currentCell: ICell = data[props.x][props.y]
  const turn: string = currTurn ? WHITE_CHECKER : BLACK_CHECKER
  const tempData: ICell[][] = data
  const background: string = currentCell.isSelected
    ? colors.GREEN_CELL
    : currentCell.isPossibleMove
    ? colors.YELLOW_CELL
    : colors.TRANSPARENT_CELL
  const dispatch = useDispatch()
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return true
      },
      onStartShouldSetPanResponder: () => {
        return true
      },

      onPanResponderGrant: () => {
        handleClick()
        setIsMoving(true)
      },

      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event, gestureState) => {
        const moveIndexX = Math.ceil((gestureState.moveX - 40) / 40) - 1
        const moveIndexY = Math.ceil((gestureState.moveY - 105) / 40) - 1

        if (somethingSelected && !currentCell.isPossibleMove) {
          tempData.map((el: ICell[]) => {
            el.map((element: ICell) => {
              element.isSelected = false
              element.isPossibleMove = false
            })
          })
          dispatch(gameInfoActions.unselectChecker(tempData))
        }

        console.log(moveIndexX, moveIndexY)
        console.log(gestureState)
        setIsMoving(false)
      },
    })
  ).current

  const shouldContinueTakes = (direction, animData) => {
    const dirX = direction.x === BOARD_TOP_BORDER ? 1 : -1
    const dirY = direction.y === BOARD_TOP_BORDER ? 1 : -1
    if (animData.x !== direction.x && animData.y !== direction.y) {
      if (
        tempData[animData.x + dirX][animData.y + dirY].checkerColor === nextTurn
      ) {
        if (findPossibleTakes(animData.x + 2 * dirX, animData.y + 2 * dirY))
          return true
        else return false
      }
    }
    return false
  }

  const startAnimation = (animData: {
    x: number
    y: number
    color: string
  }) => {
    Animated.timing(moveAnimation, {
      toValue: 1,
      duration: MOVE_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      if (currentCell.isQueen) {
        tempData[animData.x][animData.y].isQueen = true
        tempData[props.x][props.y].isQueen = false
      }
      tempData[animData.x][animData.y].checkerColor = animData.color

      tempData[props.x][props.y].checkerColor = ""
      tempData[props.x][props.y].startAnimationTo = { x: -1, y: -1, color: "" }
      let continueTakes = false
      if (Math.abs(props.x - animData.x) > 1) {
        if (
          shouldContinueTakes(
            { x: BOARD_TOP_BORDER, y: BOARD_TOP_BORDER },
            animData
          )
        )
          continueTakes = true
        if (
          shouldContinueTakes(
            { x: BOARD_TOP_BORDER, y: BOARD_BOTTOM_BORDER },
            animData
          )
        )
          continueTakes = true
        if (
          shouldContinueTakes(
            { x: BOARD_BOTTOM_BORDER, y: BOARD_BOTTOM_BORDER },
            animData
          )
        )
          continueTakes = true
        if (
          shouldContinueTakes(
            { x: BOARD_BOTTOM_BORDER, y: BOARD_TOP_BORDER },
            animData
          )
        )
          continueTakes = true
      }
      if (!continueTakes && Math.abs(props.x - animData.x) > 1) {
        dispatch(gameInfoActions.moveChecker(tempData))
        dispatch(gameInfoActions.endTurn())
      } else if (continueTakes && Math.abs(props.x - animData.x) === 2) {
        tempData[animData.x][animData.y].isSelected = true
        dispatch(gameInfoActions.selectChecker(tempData))
      }
      dispatch(gameInfoActions.triggerAnimation())
    })
  }

  if (currentCell.startAnimationTo.x !== -1) {
    startAnimation(currentCell.startAnimationTo)
  }

  const findPossibleTakes = (x: number, y: number) => {
    let takeExists: boolean = false
    console.log(x, y)
    if (
      x <= BOARD_TOP_BORDER &&
      y <= BOARD_TOP_BORDER &&
      x >= BOARD_BOTTOM_BORDER &&
      y >= BOARD_BOTTOM_BORDER
    )
      if (tempData[x][y].checkerColor === "") {
        tempData[x][y].isPossibleMove = true
        takeExists = true
      }
    return takeExists
  }

  const findPossibleMoves = () => {
    let moveExists: boolean = false
    const checkDirections = (
      direction: { x: number; y: number },
      color: string
    ) => {
      const dirX = direction.x === BOARD_TOP_BORDER ? 1 : -1
      const dirY = direction.y === BOARD_TOP_BORDER ? 1 : -1
      const alterY = direction.y === BOARD_TOP_BORDER ? 0 : 7
      const alterDirY = direction.y === BOARD_TOP_BORDER ? -1 : 1
      if (color === turn)
        if (props.x !== direction.x && props.y !== direction.y) {
          if (tempData[props.x + dirX][props.y + dirY].checkerColor === "") {
            tempData[props.x + dirX][props.y + dirY].isPossibleMove = true
            moveExists = true
          } else if (
            tempData[props.x + dirX][props.y + dirY].checkerColor === nextTurn
          ) {
            if (findPossibleTakes(props.x + 2 * dirX, props.y + 2 * dirY))
              moveExists = true
          }
          if (props.y !== alterY)
            if (
              tempData[props.x + dirX][props.y + alterDirY].checkerColor ===
              nextTurn
            ) {
              if (
                findPossibleTakes(props.x + 2 * dirX, props.y + 2 * alterDirY)
              )
                moveExists = true
            }
        }
    }

    checkDirections(
      { x: BOARD_TOP_BORDER, y: BOARD_BOTTOM_BORDER },
      WHITE_CHECKER
    )
    checkDirections(
      { x: BOARD_BOTTOM_BORDER, y: BOARD_BOTTOM_BORDER },
      WHITE_CHECKER
    )
    checkDirections({ x: BOARD_TOP_BORDER, y: BOARD_TOP_BORDER }, BLACK_CHECKER)
    checkDirections(
      { x: BOARD_BOTTOM_BORDER, y: BOARD_TOP_BORDER },
      BLACK_CHECKER
    )
    return moveExists
  }

  const findPossibleMovesQueen = () => {
    let moveExists = false
    const checkDirections = (direction: { x: number; y: number }) => {
      let i = 1
      const getCoords = (coords: number, direction: number) => {
        return coords + direction + direction / Math.abs(direction)
      }

      while (i < 7) {
        const dirX = i * (direction.x === BOARD_TOP_BORDER + 1 ? 1 : -1)
        const dirY = i * (direction.y === BOARD_TOP_BORDER + 1 ? 1 : -1)
        const conditionX =
          direction.x === BOARD_TOP_BORDER + 1
            ? props.x < direction.x - i
            : props.x > direction.x + i
        const conditionY =
          direction.y === BOARD_TOP_BORDER + 1
            ? props.y < direction.y - i
            : props.y > direction.y + i
        const indexNextCellX = props.x + dirX
        const indexNextCellY = props.y + dirY
        if (conditionX && conditionY) {
          if (tempData[indexNextCellX][indexNextCellY].checkerColor === "") {
            tempData[indexNextCellX][indexNextCellY].isPossibleMove = true
            moveExists = true
          } else if (
            tempData[indexNextCellX][indexNextCellY].checkerColor === nextTurn
          ) {
            if (
              findPossibleTakes(
                getCoords(props.x, dirX),
                getCoords(props.y, dirY)
              )
            ) {
              moveExists = true //func
              i = 8
            } else i = 8
          } else i = 8
        }
        i++
      }
    }

    checkDirections({ x: BOARD_TOP_BORDER + 1, y: BOARD_BOTTOM_BORDER - 1 })
    checkDirections({ x: BOARD_TOP_BORDER + 1, y: BOARD_TOP_BORDER + 1 })
    checkDirections({ x: BOARD_BOTTOM_BORDER - 1, y: BOARD_BOTTOM_BORDER - 1 })
    checkDirections({ x: BOARD_BOTTOM_BORDER - 1, y: BOARD_TOP_BORDER + 1 })

    return moveExists
  }

  const handleClick = () => {
    if (
      !somethingSelected &&
      currentCell.isQueen &&
      currentCell.checkerColor === turn
    ) {
      if (findPossibleMovesQueen()) {
        tempData[props.x][props.y].isSelected = true
        dispatch(gameInfoActions.selectChecker(tempData))
      }
    }

    if (somethingSelected && !currentCell.isPossibleMove) {
      tempData.map((el: ICell[]) => {
        el.map((element: ICell) => {
          element.isSelected = false
          element.isPossibleMove = false
        })
      })
      dispatch(gameInfoActions.unselectChecker(tempData))
      return
    }
    if (somethingSelected && currentCell.isPossibleMove) {
      if (turn === WHITE_CHECKER && props.y === 0) {
        tempData[props.x][props.y].isQueen = true
      }
      if (turn === BLACK_CHECKER && props.y === 7) {
        tempData[props.x][props.y].isQueen = true
      }
      console.log(currentCell)
      dispatch(gameInfoActions.triggerAnimation())
      let selectedX: number | undefined
      let selectedY: number | undefined
      tempData.map((el: ICell[], i: number) =>
        el.map((element: ICell, index: number) => {
          if (element.isSelected) {
            selectedX = i
            selectedY = index
          }
        })
      )

      tempData.map((el) => {
        el.map((element) => {
          element.isSelected = false
          element.isPossibleMove = false
        })
      })
      if (selectedX === undefined || selectedY === undefined) return
      tempData[selectedX][selectedY].startAnimationTo = {
        x: props.x,
        y: props.y,
        color: turn,
      }

      if (Math.abs(selectedX - props.x) > 1) {
        console.log(
          selectedX - (selectedX - props.x) / 2,
          (selectedX - props.x) / Math.abs(selectedX - props.x)
        )

        if (
          tempData[
            props.x + (selectedX - props.x) / Math.abs(selectedX - props.x)
          ][props.y + (selectedY - props.y) / Math.abs(selectedY - props.y)]
            .checkerColor === nextTurn
        ) {
          tempData[
            props.x + (selectedX - props.x) / Math.abs(selectedX - props.x)
          ][
            props.y + (selectedY - props.y) / Math.abs(selectedY - props.y)
          ].checkerColor = ""

          dispatch(gameInfoActions.loseChecker(turn))
          dispatch(gameInfoActions.moveChecker(tempData))
        } else {
          dispatch(gameInfoActions.moveChecker(tempData))
        }
      } else {
        dispatch(gameInfoActions.moveChecker(tempData))
        dispatch(gameInfoActions.endTurn())
      }

      return
    }

    if (props.cellData.checkerColor === turn && !currentCell.isQueen) {
      if (findPossibleMoves()) {
        tempData[props.x][props.y].isSelected = true
        dispatch(gameInfoActions.selectChecker(tempData))
      }
    }
  }

  const moveAnimationX = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (currentCell.startAnimationTo.x - props.x) * CELL_WIDTH],
  })
  const moveAnimationY = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (currentCell.startAnimationTo.y - props.y) * CELL_WIDTH],
  })

  return (
    <Animated.View
      style={{
        zIndex: isMoving ? 1000 : 1,
        transform: [
          { translateX: isMoving ? pan.x : moveAnimationX },
          { translateY: isMoving ? pan.y : moveAnimationY },
        ],
      }}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => (animationInProcess ? {} : handleClick())}
        style={[{ backgroundColor: background }, styles.cell]}
      >
        {props.cellData.checkerColor === BLACK_CHECKER &&
          !currentCell.isQueen && (
            <Image style={styles.checker} source={BlackCheckerIcon} />
          )}
        {props.cellData.checkerColor === BLACK_CHECKER &&
          currentCell.isQueen && (
            <Image style={styles.checker} source={BlackQueenIcon} />
          )}

        {props.cellData.checkerColor === WHITE_CHECKER &&
          !currentCell.isQueen && (
            <Image style={styles.checker} source={WhiteCheckerIcon} />
          )}
        {props.cellData.checkerColor === WHITE_CHECKER &&
          currentCell.isQueen && (
            <Image
              style={[styles.checker, { backgroundColor: WHITE_CHECKER }]}
              source={WhiteQueenIcon}
            />
          )}
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Cell
