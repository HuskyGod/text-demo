import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from '../reducers/index'
import {applyMiddleware, createStore} from 'redux';
const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware,
  thunkMiddleware
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}