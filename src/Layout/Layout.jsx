import React from 'react'
import Header from '../componenets/Header'

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        {children}
      
    </div>
  )
}

export default Layout
