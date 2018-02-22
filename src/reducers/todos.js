import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
import undoable, { includeAction } from 'redux-undo'
const initialState = [
  {
    text: 'First task',
    completed: false,
    id: 0
  },
  {
    text: 'Second task',
    completed: false,
    id: 1
  }
]

let todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, text: action.text } : todo)

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo, completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
todos = undoable(todos, { filter: includeAction([ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED]) })

export default todos