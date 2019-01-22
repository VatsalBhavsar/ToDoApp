import React from 'react';
import TodoItem from './todoItem'

const PendingTodoList = (props) => {
    let pendingTaskList = props.listItems.filter(task => task.taskStatus === 'pending')
    const listItems = pendingTaskList.map((item) => 
        <TodoItem 
            key = {item.taskId}
            itemInfo = {item}
            id = {item.taskId}    
            onDelete={props.onDelete}
            onUpdateStatus={props.onUpdateStatus}
        />
    )
    return(
        <React.Fragment>
            <h3>{listItems.length ? 'Pending Tasks' : 'No pending tasks!'}</h3>
            <div className="mt20">
                {listItems}
            </div>
        </React.Fragment>
    )
}

export default PendingTodoList;