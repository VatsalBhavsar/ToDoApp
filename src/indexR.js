import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const New = () => {
  return(
    <div>
      New route
    </div>
  )
}

class RoutingApp extends React.Component{
  render(){
    return(
      <Router>
        <Route path="/new" component={New} />
      </Router>
    )
  }
}

export default RoutingApp