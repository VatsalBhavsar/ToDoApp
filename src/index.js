import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './index.css';

const shortid = require('shortid');

// const DefaultData = [
//     {taskId : "KQ41uwBnmE", taskStatus: "pending", taskName: "1"},
//     {taskId : "N6tJZg16C-", taskStatus: "pending", taskName: "2"},
//     {taskId : "aFZiW0-aDC", taskStatus: "pending", taskName: "3"},
//     {taskId : "SpTRI4onoF", taskStatus: "pending", taskName: "4"},
//     {taskId : "tVvjLjJvuE", taskStatus: "pending", taskName: "5"},
//     {taskId : "u55M_VRnl4", taskStatus: "pending", taskName: "6"},
//     {taskId : "Upf1Mj3m2d", taskStatus: "pending", taskName: "7"},
//     {taskId : "zOfTIZzyMH", taskStatus: "pending", taskName: "8"},
//     {taskId : "3u7ardz48h", taskStatus: "pending", taskName: "9"},
//     {taskId : "tDCDTJanng", taskStatus: "pending", taskName: "10"}
// ]

class TodoInputField extends React.Component{
    render(){
        return(
            <div>
                <input type="text" id="todoValue" autoFocus value={this.props.todoValue} onChange={this.props.onTodoValueChange} placeholder="Enter what you want to do"/>
                <button onClick={this.props.onAdd}>Add</button>
            </div>
        )
    }
}

class TodoItem extends React.Component{
    render(){
        return(
            <div className="taskNameContainer">
                <button onClick={() => this.props.onUpdateStatus(this.props.id)}>
                    {this.props.itemInfo.taskStatus === "pending" ? "Done" : "Pending"}
                </button>
                <div className={"taskName " + (this.props.itemInfo.taskStatus === 'pending' ? '' : 'strikeThrough')}>{this.props.itemInfo.taskName}</div>
                <button onClick={() => this.props.onDelete(this.props.id)}>Delete</button>
            </div>
        )
    }
}

class TodoList extends React.Component{
    render(){
        const listItems = this.props.listItems.map((item) => 
        <TodoItem 
            key = {item.taskId}
            itemInfo = {item}
            id = {item.taskId}    
            onDelete={this.props.onDelete}
            onUpdateStatus={this.props.onUpdateStatus}
        />
        )
        return(
            <div className="mt20">
                {listItems}
            </div>
        )
    }
}

class CompletedTodoList extends React.Component{
    render(){
        let completedTaskList = this.props.listItems.filter(task => task.taskStatus === 'completed')
        const listItems = completedTaskList.map((item) => 
        <TodoItem 
            key = {item.taskId}
            itemInfo = {item}
            id = {item.taskId}    
            onDelete={this.props.onDelete}
            onUpdateStatus={this.props.onUpdateStatus}
        />
        )
        return(
            <div className="mt20">
                {listItems}
            </div>
        )
    }
}

class PendingTodoList extends React.Component{
    render(){
        let pendingTaskList = this.props.listItems.filter(task => task.taskStatus === 'pending')
        const listItems = pendingTaskList.map((item) => 
        <TodoItem 
            key = {item.taskId}
            itemInfo = {item}
            id = {item.taskId}    
            onDelete={this.props.onDelete}
            onUpdateStatus={this.props.onUpdateStatus}
        />
        )
        return(
            <div className="mt20">
                {listItems}
            </div>
        )
    }
}

class TodoApp extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            todoList : [],
            todoInputField : '',
            pendingTaskCount : 0,
            completedTaskCount : 0
        }
    }

    handleTodoFieldChange = (e) =>{
        this.setState({
            todoInputField : e.target.value
        })
    }

    addItem = (e) => {
        const todoList = this.state.todoList
        let task = {
            taskId     :  shortid.generate(),
            taskName   :  this.state.todoInputField,
            taskStatus : 'pending',
        }

        if(this.state.todoInputField){
            let nameList = todoList.map((item) => {
                return item.taskName
            })
            if(nameList.indexOf(this.state.todoInputField) > -1){
                alert('name already exists')
                return
            }else{
                todoList.push(task)   
            }
        }

        this.setState({
            todoList : todoList,
            todoInputField : ''
        }, () => {
            this.getTaskCount()
        })
        document.getElementById('todoValue').focus()
        console.log(this.state.todoList)
        console.log(shortid.generate())
    }

    deleteItem = (id) => {
        const todoList = this.state.todoList
        let updatedTodoList = todoList.filter((task) => {
            return task.taskId !== id
        })
        console.log(updatedTodoList)
        this.setState({
            todoList : updatedTodoList
        }, () => {
            this.getTaskCount()
        })
    }

    updateTaskStatus = (id) => {
        const todoList = this.state.todoList
        let updatedTodoList = todoList.map((task) => {
            if(task.taskId === id){
                task.taskStatus = task.taskStatus === "pending" ? "completed" : "pending"
            }
            return task
        })
        this.setState({
            todoList : updatedTodoList
        }, () => {
            this.getTaskCount()
        })
        console.log(this.state.todoList)
    }

    clearCompleted = (props) => {
        const todoList = this.state.todoList
        let updatedList = todoList.filter(task => task.taskStatus === 'pending')
        this.setState({
            todoList : updatedList
        }, () => {
            this.getTaskCount()
        })
    }

    getTaskCount = (props) => {
        const todoList = this.state.todoList
        let pendingTaskCount = todoList.filter(task => task.taskStatus === 'pending').length
        let completedTaskCount = todoList.filter(task => task.taskStatus === 'completed').length
        this.setState({
            pendingTaskCount : pendingTaskCount,
            completedTaskCount : completedTaskCount
        })
    }

    render(){
        return(
            <Router>
                <div>
                    <TodoInputField 
                        todoValue={this.state.todoInputField} 
                        onTodoValueChange={this.handleTodoFieldChange} 
                        onAdd={this.addItem}
                    />
                    <Route 
                        path='/' 
                        exact 
                        render = {(props) => <TodoList listItems={this.state.todoList} onDelete={this.deleteItem} onUpdateStatus={this.updateTaskStatus} />}
                    />
                    <Route 
                        path='/completed' 
                        render = {(props) => <CompletedTodoList listItems={this.state.todoList} onDelete={this.deleteItem} onUpdateStatus={this.updateTaskStatus} />}
                    />
                    <Route 
                        path='/pending' 
                        render = {(props) => <PendingTodoList listItems={this.state.todoList} onDelete={this.deleteItem} onUpdateStatus={this.updateTaskStatus} />} 
                    />
                    <div className="mt20">
                        <button onClick={this.clearCompleted}>Clear all complted tasks : {this.state.completedTaskCount}</button>
                        <label className="ml20">Total pending tasks : {this.state.pendingTaskCount}</label>
                    </div>                        
                    <ul className="linkList">
                        <li>
                            <Link to='/'>All Tasks</Link>
                        </li>
                        <li>
                            <Link to='/completed'>Completed Tasks</Link>
                        </li>
                        <li>
                            <Link to='/pending'>Pending Tasks</Link>
                        </li>   
                    </ul>
                </div>
            </Router>
        )
    }
}
ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
)