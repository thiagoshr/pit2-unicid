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
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import { Landing } from "./features/landing/Landing";
import GerenteUI from "./features/gerente/GerenteUI";

const router = createHashRouter([
  {
    path: '/',
    element: <LoginScreen />
  },
  {
    path: '/app',
    element: <Landing />,
    children: [
      {
        path: 'barista/',
        element: <div>Interface Barista</div>
      },
      {
        path: 'gerente/',
        element: <GerenteUI />
      },
      {
        path: 'caixa/',
        element: <div>Interface Caixa</div>
      },
      {
        path: 'cliente/',
        element: <div>Interface Cliente</div>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
