import React from 'react'
import LeftPanel from './LeftPanel'
import { Outlet } from 'react-router-dom'
import Controls from '../AudioPlayer/Controls'
import '../Styles/Layout.css';
import Footer from './Footer';
//This page will contain main part (Left panel and cotrols of audio player)
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
