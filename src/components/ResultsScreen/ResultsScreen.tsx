import * as React from "react"
import { View, StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"
import { styles } from "./styles"

const ResultsScreen = ({ whitesWon }) => {
  console.log(whitesWon)
  return (
    <View style={styles.container}>
      <View style={styles.blackPart}>
        <Text style={styles.mainText}>
          {whitesWon ? "You lost" : "You won"}
        </Text>
        <Text style={styles.secondaryText}>
          {whitesWon ? "Better luck next time" : "Congratulations"}
        </Text>
      </View>
      <View style={styles.whitePart}>
        <Text style={styles.mainText}>
          {whitesWon ? "You won" : "You lost"}
        </Text>
        <Text style={styles.secondaryText}>
          {whitesWon ? "Congratulations" : "Better luck next time"}
        </Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state: { gameInfo: { whitesVictory: boolean } }) => {
  return {
    whitesWon: state.gameInfo.whitesVictory,
  }
}

export default connect(mapStateToProps, null)(ResultsScreen)
