import './App.css';

import {
   BrowserRouter,
   Route,
   Routes
} from "react-router-dom";

import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import Header from "./Header";
import Home from "./Home";
import Favorites from './Favorites';
import BrowseByYear from './BrowseByYear';
import Wines from "./Wines";
import WineDetails from './WineDetails';
import Producers from "./Producers";
import ProducerDetails from './ProducerDetails';

{/*
   BrowserRouter,
   Routes,

   Navigate
   redirect,
   BrowserRouter as Router,
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useEffect, useState } from "react";
// import Grapes from './Grapes';
// import Regions from './Regions';
// import BrowseByStyle from './BrowseByStyle';

   HashRouter,
*/}


{/*
// import Login from './Login';
// import CreateAccount from './CreateAccount';
*/}

{/*
      <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/wines" element={<Wines/>} />
                  <Route path="/wines/:wineId" element={<WineDetails/>} />
                  <Route path="*" element={<h1>404: Oops!</h1>} />

const ghrepo = process.env.REACT_APP_GITHUB_REPO;
                  <Route path={ghrepo + "/"} element={<Home/>} />
                  <Route exact path="/" render={() => ( <Redirect to={ghrepo}/>)}/>
                  <Route path="*" element={<Navigate to="/" />} />

                  <Route path="/" element={<Navigate to={ghrepo} />}>
                      <Route path={ghrepo} element={<Home/>} />
                  </Route>
const navigate = useNavigate();
                  <Route path="/">
                    <Route index element={<Navigate to="/auth0_2" replace />} />

                      <Route exact path={ghrepo} element={<Home/>} />

// const srvurl = process.env.REACT_APP_SERVER_URL;
`${srvurl}/`
`${srvurl}/wines`
const ghrepo = process.env.REACT_APP_GITHUB_REPO;
    const baseUrl = process.env.REACT_APP_SERVER_URL;

*/}



const App = () => {

  return (
      <BrowserRouter>
      <GlobalStyles />
          <Header/>
          <Wrapper>
              <Routes>
                      <Route path="/" element={<Home/>} />
                      <Route path="/wines" element={<Wines/>} />
                      <Route path="/wines/:wineId" element={<WineDetails/>} />
                      <Route path="/producers" element={<Producers />} />
                      <Route path="/producers/:producerId" element={<ProducerDetails/>} />

                      <Route path="/year" element={<BrowseByYear/>} />
                      <Route path="/favorites/:userId" element={<Favorites />} />
                      <Route path="*" element={<h1>404: Oops!</h1>} />
              </Routes>
          </Wrapper>
      </BrowserRouter>
  );
};

const Wrapper = styled.div`
  margin: auto;
`;

export default App;

                  {/* <Route path="/grapes" element={<Grapes/>} /> */}
                  {/* <Route path="/regions/:region" element={<Regions/>} /> */}
                  {/* <Route path="/colour" element={<BrowseByStyle/>} /> */}


{/*

import './App.css';

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <main className="column">
      <h1>test</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>
  );
}

export default App;
*/}

