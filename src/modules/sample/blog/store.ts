import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducer"
import State from "./state"

const initialState = localStorage['redux-store'] ?
  JSON.parse(localStorage['redux-store']) : new State()

const saveState = () =>
  localStorage['redux-store'] = JSON.stringify(store.getState())

const store = createStore(reducer, initialState, applyMiddleware(thunk))
store.subscribe(saveState)

export default store
