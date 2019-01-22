import React from 'react';
import TodoItem from './todoItem'

const TodoList = (props) => {
    const listItems = props.listItems.map((item) => 
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
            <h3>{listItems.length ? 'All Tasks' : 'You have no tasks yet!'}</h3>
            <div className="mt20">
                {listItems}
            </div>
        </React.Fragment>
    )
}

export default TodoList;