import React from 'react'
import LeftPanel from './LeftPanel'
import { Outlet } from 'react-router-dom'
import Controls from '../AudioPlayer/Controls'
import '../Styles/Layout.css';

function Layout() {
  return (
    <div className='Layout'>
      <LeftPanel/>
      <Controls/>
      <Outlet/>
    </div>
  )
}

export default Layout
