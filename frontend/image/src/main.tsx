import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  LoginScreen
} from './features/login/LoginScreen';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Landing } from "./features/landing/Landing";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />
  },
  {
    path: '/app',
    element: <Landing />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
