import React from 'react'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router.jsx';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
