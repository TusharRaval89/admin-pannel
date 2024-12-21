import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{textAlign:'center'}}>
       <h1>Error 404 - Page Not Found</h1>
        Click Here Go To   <Link to={'/admin/'}>Dashboard</Link> 
    </div>
  )
}

export default NotFound
