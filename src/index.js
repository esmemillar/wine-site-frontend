import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FavoritesContextProvider } from './context/FavoritesContext';
import { UserContextProvider } from './context/UserContext';

import { Auth0Provider } from '@auth0/auth0-react';

// pull from .env file
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const ghrepo = process.env.REACT_APP_GITHUB_REPO;

{/*
        authorizationParams={{ redirect_uri: window.location.origin }} >
        authorizationParams={{ redirect_uri: window.location.origin + '/' + ghrepo + '/' }} >
*/}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FavoritesContextProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: window.location.origin + ghrepo }} >

         <UserContextProvider>
          <App />
         </UserContextProvider>

      </Auth0Provider>
    </FavoritesContextProvider>
  </React.StrictMode>
);
