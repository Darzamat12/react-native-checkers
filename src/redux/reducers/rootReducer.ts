import { combineReducers } from "redux"
import startGameReducer from "./startGameReducer"
import reducer from "../reducers/reducer"
import { settingsReducer } from "./settingsReducer"

export default combineReducers({
  gameInfo: startGameReducer,
  settings: settingsReducer,
})
