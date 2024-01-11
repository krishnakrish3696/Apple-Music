import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/Layout';
import HomePage from './Components/HomePage';
import AlbumDetail from './Components/AlbumDetail';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PlayerContextProvider from './Context/PlayerContextProvider';
import MyAccount from './Components/MyAccount';
import ProtectedRoute from './ProtectedRoute';
import AllCards from './Components/AllCards';
import MyFav from './Components/MyFav';
import Footer from './Components/Footer';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<HomePage/>}></Route>
      <Route path='AlbumDetail' element={<AlbumDetail/>}></Route>
      <Route exact path="AllCards" Component={AllCards}></Route>  
      <Route exact path="MyFav" Component={MyFav}></Route>  
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PlayerContextProvider>   
      <RouterProvider router={router}/>
    </PlayerContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
