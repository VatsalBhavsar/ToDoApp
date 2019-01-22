import React from 'react';
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return(
        <React.Fragment>
            <div className="mt20">
                <button 
                    onClick={props.clearCompleted}>
                    Clear all complted tasks : {props.completedTaskCount}
                </button>
                <label className="ml20">Total pending tasks : {props.pendingTaskCount}</label>
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
        </React.Fragment>
    )
}

export default Footer;