import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Watch from './components/Watch.jsx'
import Feed from './components/Feed.jsx'

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element:<Feed/>
      },
      {
        path: "watch",
        element: <Watch />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={approuter} />
    </Provider>
  </React.StrictMode>,
)
