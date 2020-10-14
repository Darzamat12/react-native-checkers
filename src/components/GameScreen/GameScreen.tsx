import * as React from "react"
import { useEffect } from "react"
import { View, Text } from "react-native"
import { connect, useDispatch } from "react-redux"
import { TouchableOpacity } from "react-native-gesture-handler"
import Board from "./Board/Board"
import { gameInfoActions } from "../../redux/actions/gameInfoActions"

import { getBoardData } from "../../cells"
import Score from "../common/Score"

import { styles } from "./styles"

import { BLACK_CHECKER, colors, routes, WHITE_CHECKER } from "../../constants"

const GameScreen = ({ isStarted, navigation, dark }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(gameInfoActions.startGame(getBoardData()))
  }, [])
  return (
    <View
      style={[styles.screen, { backgroundColor: dark ? "black" : "white" }]}
    >
      {isStarted && (
        <View style={styles.board}>
          <Score color={BLACK_CHECKER} />
          <Board />
          <Score color={WHITE_CHECKER} />
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: dark
                  ? colors.DARK_BUTTON
                  : colors.LIGHT_BUTTON,
              },
            ]}
            onPress={() => {
              navigation.navigate(routes.HOME_SCREEN)
            }}
          >
            <Text style={[styles.text, { color: dark ? "white" : "black" }]}>
              Exit game
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const mapStateToProps = (state: {
  gameInfo: { isStarted: boolean; whitesVictory: boolean }
  settings: { darkTheme: boolean }
}) => {
  return {
    isStarted: state.gameInfo.isStarted,
    whitesWon: state.gameInfo.whitesVictory,
    dark: state.settings.darkTheme,
  }
}

export default connect(mapStateToProps, null)(GameScreen)
