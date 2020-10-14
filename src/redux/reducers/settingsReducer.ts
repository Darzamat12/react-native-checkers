import { CHANGE_THEME } from "../actions/settingsActionTypes"

const initialState = {
  darkTheme: false,
}

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME: {
      return { ...state, darkTheme: !state.darkTheme }
    }
    default:
      return state
  }
}
