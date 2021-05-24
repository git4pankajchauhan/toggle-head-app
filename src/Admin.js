import { Category, ShoppingBasket } from '@material-ui/icons';
import Product from 'pages/Admin/Product';
import ProductCategory from 'pages/Admin/ProductCategory';
import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import './Admin.scss';

const Admin = () => {
  return (
    <>
      <BrowserRouter>
        <section className="admin-section">
          <div className="container-lg">
            <h4 className="page-title mb-5">Admin Panel</h4>
            <div className="row side-menu-container">
              <div className="col-12 col-md-3 mx-auto p-0">
                <div className="side-menu-wrapper">
                  <NavLink activeClassName="sm-link-active" className="sm-link" exact to="/admin">
                    <ShoppingBasket /> Product
                  </NavLink>
                  <NavLink activeClassName="sm-link-active" className="sm-link" exact to="/admin/product-category">
                    <Category /> Product Category
                  </NavLink>
                </div>
              </div>
              <div className="col-12 col-md-9 mx-auto content-wrapper">
                <Switch>
                  <Route exact path="/admin" component={Product} />
                  <Route exact path="/admin/product-category" component={ProductCategory} />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </BrowserRouter>
    </>
  );
};

export default Admin;
