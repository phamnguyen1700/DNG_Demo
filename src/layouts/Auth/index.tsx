import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      Auth Layout 
      <div>
          <Outlet/>
        </div>      
    </div>
  )
}
export default AuthLayout;
