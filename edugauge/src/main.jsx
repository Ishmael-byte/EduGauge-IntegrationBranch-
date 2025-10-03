import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './pages/index.css'
import App from './App.jsx'
import {BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
//React.StrictMode is used to check and warn for descendedants which will help identify and fix common mistakes
//BrowserRouter will enable us to create a single page application that has multiple "pages" without
//requiring a full page reload from the server