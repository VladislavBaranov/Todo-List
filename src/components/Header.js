import React, { Component } from 'react'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
 
  handleSave = text => {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
        <h1>TODO LIST</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="Enter task" />
      </header>
    )
  }
}
