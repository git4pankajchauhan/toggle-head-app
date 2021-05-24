import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Product from 'pages/Product';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Product} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
