import * as React from "react"
import { useEffect } from "react"
import { Button, View, ActivityIndicator, StyleSheet } from "react-native"
import { getBoardData } from "../../../cells"
import Cell from "./Cell/"
import { connect, useDispatch } from "react-redux"
import { ICell } from "../../../interfaces/ICell"
import { CELL_WIDTH, colors } from "../../../constants"
import { styles } from "./styles"

const data = getBoardData()

const Board = (props: { data: any[] }) => {
  useEffect(() => {}, [])
  return (
    <View>
      <UnderBoard></UnderBoard>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 8 * CELL_WIDTH,
          width: 8 * CELL_WIDTH,
          position: "absolute",
        }}
      >
        {props.data.map((el, index) => {
          return <Col key={index} column={el} indexprev={index} />
        })}
      </View>
    </View>
  )
}
console.log(data)

const UnderBoard = () => {
  return (
    <View style={styles.underBoard}>
      {data.map((el, index) => {
        return <UnderCol key={index} column={el} indexprev={index} />
      })}
    </View>
  )
}
const UnderCol = ({ column, indexprev }) => {
  return (
    <View style={{ height: 8 * CELL_WIDTH, width: 40 }}>
      {column.map((el: ICell, i: string | number | null | undefined) => {
        return (
          <View
            key={i}
            style={{
              backgroundColor:
                (indexprev + i) % 2 ? colors.BROWN_CELL : "white",
              height: CELL_WIDTH,
              width: CELL_WIDTH,
            }}
          ></View>
        )
      })}
    </View>
  )
}

const Col = ({ indexprev, column }) => {
  return (
    <View style={{ height: 8 * CELL_WIDTH, width: CELL_WIDTH }}>
      {column.map((el: ICell, index: string | number | null | undefined) => {
        return <Cell key={index} x={indexprev} y={index} cellData={el}></Cell>
      })}
    </View>
  )
}

const mapStateToProps = (state: { gameInfo: { checkersData: ICell[][] } }) => {
  return {
    data: state.gameInfo.checkersData,
  }
}

export default connect(mapStateToProps, null)(Board)
