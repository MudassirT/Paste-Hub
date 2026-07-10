import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Paste from './components/Paste'

function App() {
  const router = createBrowserRouter([
    {
      // Home Path
      path: '/',
      element: <div><Navbar /><Home /></div>
    },
    {
      // Paste Path
      path: '/paste',
      element: <div><Navbar /><Paste /></div>
    }
  ])

  return <RouterProvider router={router} />
}

export default App
