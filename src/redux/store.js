import {createStore,applyMiddleware} from 'redux'
import logger from "redux-logger"
import reduxThunk from 'redux-thunk'
import rootReducer from './root-reducer'

const middlwewares = [reduxThunk]

if (process.env.NODE_ENV === "development") {
    middlwewares.push(logger);
}

const store = createStore(rootReducer,applyMiddleware(...middlwewares))

export default store 