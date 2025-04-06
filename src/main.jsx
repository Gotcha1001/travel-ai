


// /src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Import your components
import RootLayout from './components/custom/Layout';
import App from './App';
import CreateTrip from './create-trip';
import ViewTrip from './view-trip/[tripId]';
import MyTrips from './my-trips';

// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'create-trip',
        element: <CreateTrip />
      },
      {
        path: 'view-trip/:tripId',
        element: <ViewTrip />
      },
      {
        path: 'my-trips',
        element: <MyTrips />
      }
    ]
  }
]);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);