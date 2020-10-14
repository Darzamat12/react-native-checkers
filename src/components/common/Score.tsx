import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { connect, useDispatch, useSelector } from "react-redux"
import { BLACK_CHECKER, routes } from "../../constants"
import { gameInfoActions } from "../../redux/actions/gameInfoActions"

const Score = ({ navigation, color }) => {
  const dispatch = useDispatch()
  const blackCheckers = useSelector((state) => state.gameInfo.blackCheckers)
  const whiteCheckers = useSelector((state) => state.gameInfo.whiteCheckers)
  const isDark = useSelector((state) => state.settings.darkTheme)
  React.useEffect(() => {
    if (blackCheckers === 0) {
      dispatch(gameInfoActions.finishGame(true))
      navigation.navigate(routes.RESULTS_SCREEN)
    }
    if (whiteCheckers === 0) {
      dispatch(gameInfoActions.finishGame(true))
      navigation.navigate(routes.RESULTS_SCREEN)
    }
  }, [])
  return (
    <View>
      <Text style={[styles.score, { color: isDark ? "white" : "black" }]}>
        {color}: {color === BLACK_CHECKER ? blackCheckers : whiteCheckers}
      </Text>
    </View>
  )
}

const mapStateToProps = (state: {
  gameInfo: { blackCheckers: number; whiteCheckers: number }
  settings: { darkTheme: boolean }
}) => {
  return {
    blackCheckers: state.gameInfo.blackCheckers,
    whiteCheckers: state.gameInfo.whiteCheckers,
    dark: state.settings.darkTheme,
  }
}

const styles = StyleSheet.create({
  score: {
    fontSize: 24,
    textTransform: "capitalize",
  },
})

export default connect(mapStateToProps, null)(Score)
