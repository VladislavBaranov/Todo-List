import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
    <div className="undo">
        <button className="" onClick={onUndo} disabled={!canUndo}>
            <span>&#8634;</span>
        </button>
        <button className="" onClick={onRedo} disabled={!canRedo}>
            <span>&#8635;</span>
        </button>

    </div>
)

const mapStateToProps = (state) => ({
    canUndo: state.todos.past.length > 0,
    canRedo: state.todos.future.length > 0
})

const mapDispatchToProps = ({
    onUndo: UndoActionCreators.undo,
    onRedo: UndoActionCreators.redo
})

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo)

export default UndoRedo
