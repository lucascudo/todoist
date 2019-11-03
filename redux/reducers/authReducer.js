// Initial State
const initialState = {
    loggedIn: false,
    password: '',
};
// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // Set Password
      case 'SET_PASSWORD': {
        return {
          // State
          ...state,
          // Redux Store
          password: action.password,
        }
      }
      // Set LoggedIn
      case 'SET_LOGGEDIN': {
        return {
          // State
          ...state,
          // Redux Store
          loggedIn: action.loggedIn,
        }
      }
      // Default
      default: {
        return state;
      }
    }
};
// Exports
export default authReducer;