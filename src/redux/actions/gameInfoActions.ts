import { gameInfoActionTypes } from "./gameInfoActionTypes"

export const gameInfoActions = {
  triggerAnimation: () => {
    return {
      type: gameInfoActionTypes.TRIGGER_ANIMATION,
    }
  },
  endTurn: () => {
    return {
      type: gameInfoActionTypes.END_TURN,
    }
  },
  loseChecker: (color: string) => {
    return {
      type: gameInfoActionTypes.LOSE_CHECKER,
      payload: color,
    }
  },
  moveChecker: (data) => {
    return {
      type: gameInfoActionTypes.MOVE_CHECKER,
      payload: data,
    }
  },
  selectChecker: (data) => {
    return {
      type: gameInfoActionTypes.SELECT_CHECKER,
      payload: data,
    }
  },
  startGame: (data) => {
    return {
      type: gameInfoActionTypes.START_GAME,
      payload: data,
    }
  },
  unselectChecker: (data) => {
    return {
      type: gameInfoActionTypes.UNSELECT_CHECKER,
      payload: data,
    }
  },
  finishGame: (whitesWinner: boolean) => {
    return {
      type: gameInfoActionTypes.GAME_FINISHED,
      payload: whitesWinner,
    }
  },
}
