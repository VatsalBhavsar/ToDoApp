import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import './index.css';
import Home from './components/home'
import TaskDetail from './components/taskDetails'

class TodoApp extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route
                        path='/'
                        exact
                        component={Home}
                    />
                </Switch>
            </Router>
        )
    }
}
ReactDOM.render(
    <TodoApp />,
    document.getElementById('root')
)