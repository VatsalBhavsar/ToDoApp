import React from 'react';
import TodoInputField from './inputField'
import TodoList from './todoList'
import CompletedTodoList from './completedTodoList'
import PendingTodoList from './pendingTodoList'
import Footer from './footer'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
const shortid = require('shortid');

class Home extends React.Component{
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
    
    clearCompleted = () => {
        const todoList = this.state.todoList
        let updatedList = todoList.filter(task => task.taskStatus === 'pending')
        this.setState({
            todoList : updatedList
        }, () => {
            this.getTaskCount()
        })
    }
    
    getTaskCount = () => {
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
                <React.Fragment>
                    <TodoInputField 
                        todoValue={this.state.todoInputField} 
                        onTodoValueChange={this.handleTodoFieldChange} 
                        onAdd={this.addItem}
                    />
                    
                    <Route 
                        path='/' 
                        exact 
                        render = { (props) => 
                            <TodoList 
                                listItems={this.state.todoList} 
                                onDelete={this.deleteItem} 
                                onUpdateStatus={this.updateTaskStatus} 
                            />
                        }
                    />
                    <Route 
                        path='/completed' 
                        render = { (props) => 
                            <CompletedTodoList 
                                listItems={this.state.todoList} 
                                onDelete={this.deleteItem} 
                                onUpdateStatus={this.updateTaskStatus} 
                            />
                        }
                    />
                    <Route 
                        path='/pending' 
                        render = { (props) => 
                            <PendingTodoList 
                                listItems={this.state.todoList} 
                                onDelete={this.deleteItem} 
                                onUpdateStatus={this.updateTaskStatus} 
                            />
                        } 
                    />
                    <Footer 
                        completedTaskCount = {this.state.completedTaskCount}
                        pendingTaskCount = {this.state.pendingTaskCount}
                        clearCompleted = {this.clearCompleted}
                    />
                </React.Fragment>
            </Router>
        )
    }
}

export default Home;