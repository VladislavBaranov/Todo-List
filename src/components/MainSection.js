import React, { Component } from 'react'

import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
//import UndoRedo from '../containers/UndoRedo'
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class MainSection extends Component {
  
  state = { filter: SHOW_ALL }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.present.length > 0) {
      return (
        <span>
          <input className="toggle-all"
                 type="checkbox"
                 checked={completedCount === todos.present.length}
                 />
          <label onClick={actions.completeAll}/>
        </span>
      )
    }
  }

  renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.present.length - completedCount
    const deactiveCount = todos.present.length

    if (todos.present.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                deactiveCount={deactiveCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted}
                onShow={this.handleShow} />            
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state 
    const filteredTodos = todos.present.filter(TODO_FILTERS[filter])
    const completedCount = todos.present.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">{console.log(todos.present.length)}
        {this.renderToggleAll(completedCount)} 
        {this.renderFooter(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
       
      </section>
    )
  }
}
