import { BLACK_CHECKER, WHITE_CHECKER } from "../../constants"
import { ICell } from "../../interfaces/ICell"
import { gameInfoActionTypes } from "../actions/gameInfoActionTypes"

const initialState = {
  isStarted: false,
  whitesTurn: true,
  whitesVictory: undefined,
  winner: "",
  whiteCheckers: 12,
  animationInProcess: false,
  blackCheckers: 12,
  somethingSelected: false,
  checkersData: [],
}

const startGameReducer = (
  state = initialState,
  action: { type: string; payload: ICell[][] | string }
) => {
  switch (action.type) {
    case gameInfoActionTypes.START_GAME: {
      return {
        ...state,
        isStarted: true,
        whitesTurn: true,
        checkersData: action.payload,
        whiteCheckers: 12,
        blackCheckers: 12,
      }
    }
    case gameInfoActionTypes.SELECT_CHECKER: {
      return { ...state, somethingSelected: true, checkersData: action.payload }
    }
    case gameInfoActionTypes.MOVE_CHECKER: {
      return {
        ...state,
        somethingSelected: false,
        checkersData: action.payload,
      }
    }
    case gameInfoActionTypes.END_TURN: {
      return { ...state, whitesTurn: !state.whitesTurn }
    }
    case gameInfoActionTypes.UNSELECT_CHECKER: {
      return {
        ...state,
        somethingSelected: false,
        checkersData: action.payload,
      }
    }
    case gameInfoActionTypes.LOSE_CHECKER: {
      return {
        ...state,
        blackCheckers:
          action.payload === WHITE_CHECKER
            ? state.blackCheckers - 1
            : state.blackCheckers,
        whiteCheckers:
          action.payload === BLACK_CHECKER
            ? state.whiteCheckers - 1
            : state.whiteCheckers,
      }
    }
    case gameInfoActionTypes.TRIGGER_ANIMATION: {
      return {
        ...state,
        animationInProcess: !state.animationInProcess,
      }
    }
    case gameInfoActionTypes.GAME_FINISHED: {
      return {
        ...state,
        isStarted: false,
        whitesVictory: action.payload,
      }
    }
    default:
      return state
  }
}

export default startGameReducer
