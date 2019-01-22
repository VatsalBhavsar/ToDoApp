import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const TodoItem = (props) => {
    return(
        <div className="taskNameContainer">
            <button onClick={() => props.onUpdateStatus(props.id)}>
                {props.itemInfo.taskStatus === "pending" ? "Done" : "Pending"}
            </button>
            <div className={"taskName "+(props.itemInfo.taskStatus === 'pending' ? '' : 'strikeThrough')}>{props.itemInfo.taskName}</div>
            <button onClick={() => props.onDelete(props.id)}>Delete</button>
        </div>
    )
}

export default TodoItem;