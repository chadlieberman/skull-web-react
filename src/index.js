import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { Root } from './components/Root'
import { logger, sendAction } from './middleware'
import './index.css'

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        logger,
        //sendAction
    )
)

render(
    <Root store={store} />,
    document.getElementById('root')
)

export default store
