import React from 'react';
import TodoItem from './todoItem'

const CompletedTodoList = (props) => {
    let completedTaskList = props.listItems.filter(task => task.taskStatus === 'completed')
    const listItems = completedTaskList.map((item) => 
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
            <h3>{listItems.length ? 'Commpleted Tasks' : 'No completed tasks'}</h3>
            <div className="mt20">
                {listItems}
            </div>
        </React.Fragment>
    )
}

export default CompletedTodoList;