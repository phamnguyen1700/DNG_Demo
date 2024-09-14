import * as types from '../types/app'

  interface AppState {
    loading: boolean
  }

  const initialState: AppState = {
    loading: false,
  };

  export const appReducer = (state = initialState, action: any): AppState => {
    switch (action.type) {
        case types.LOADING_APP:
            return {...state, loading: action.payload};//Loading
        default:
            return state;
        }
  }
