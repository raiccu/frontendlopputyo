import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Home.jsx'
import CustomerList from './components/CustomerList.jsx'
import TrainingList from './components/TrainingList.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "CustomerList",
        element: <CustomerList />,
      },
      {
        path: "TrainingList",
        element: <TrainingList />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
