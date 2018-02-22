import React, { Component } from 'react'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import UndoRedo from '../containers/UndoRedo';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

export default class Footer extends Component {

  renderTodoCount() {
    const { activeCount } = this.props
    console.log(this.props)
    return (
      <span className="todo-count">
        {activeCount || 'No'} task leave
      </span>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, onShow } = this.props
    return (
      <a className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}>
        {title}
      </a>
    )
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props
    if (completedCount > 0) {
      return (
        <button className="clear-completed"
          onClick={onClearCompleted} >
          Clear completed
        </button>
      )
    }
  }
  renderProgress() {
    const { activeCount, deactiveCount } = this.props
    let progress = (deactiveCount - activeCount) / deactiveCount * 100
    console.log(progress)
    return (
      <div className="progress">
        <div className="progress-bar"
          style={{ width: (progress + '%'),  
          background: 'rgb('+(185-1.43*progress)+', '+(123+0.52*progress)+', '+(123-0.01*progress)+')'
        }} ></div>
      </div>
    )
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {<UndoRedo />}
        {this.renderClearButton()}
        <br />
        {this.renderProgress()}
      </footer>
    )
  }
}
