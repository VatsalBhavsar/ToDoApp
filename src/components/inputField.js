import React from 'react';

const TodoInputField = (props) => {
    return(
        <div>
            <input 
                type="text" 
                id="todoValue" 
                autoFocus 
                value={props.todoValue} 
                onChange={props.onTodoValueChange} 
                placeholder="Enter what you want to do"
            />
            <button onClick={props.onAdd}>Add</button>
        </div>
    )
}

export default TodoInputField;
