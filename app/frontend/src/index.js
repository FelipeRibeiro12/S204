import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';
import ErrorPage from './pages/errorPage';
import SplashPage from './pages/splashPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage';

// Configuração das rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App será o layout principal
    errorElement: <ErrorPage />, // Página de erro
    children: [
      {
        path: '/',
        element: <SplashPage />, // Rota padrão (login)
      },
      {
        path: '/login',
        element: <LoginPage />, // Rota da página inicial
      },
      {
        path: '/register',
        element: <RegisterPage />, // Rota de perfis
      },
      {
        path: '/home',
        element: <HomePage />, // Rota de perfis
      },
    ],
  },
]);

// Renderização do aplicativo
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);