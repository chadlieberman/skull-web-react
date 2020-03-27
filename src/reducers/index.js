import { combineReducers } from 'redux'
import game from './game'
import me from './me'
import room from './room'
import connection from './connection'

export default combineReducers({
    game,
    me,
    room,
    connection,
})
