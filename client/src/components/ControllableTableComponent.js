import React from 'react';
import {ProductHeaderComponent} from './ProductHeaderComponent';
import {CartHeaderComponent} from './CartHeaderComponent';
import ProductTableComponent from './ProductTableComponent';
import {CartTableComponent} from './CartTableComponent';
import {ProductPanelComponent} from './ProductPanelComponent';
import {Switch, Route} from "react-router-dom";
import {AlertsComponent} from './AlertsComponent';
import {LoginComponent} from './LoginComponent';
import { connect } from 'react-redux';
import  { Redirect } from 'react-router-dom';
import {postProduct, fetchProducts, postDeleteProduct, postUpdateProduct, loginUser,
    logoutUser, signUpUser} from '../store/ActionCreators';

const mapDispatchToProps = dispatch => ({
  postProduct: (name, aisle, description, inCart, marked) => dispatch(postProduct(name, aisle, description, inCart, marked)),
  fetchProducts: () => {dispatch(fetchProducts())},
  postDeleteProduct: (id) => dispatch(postDeleteProduct(id)),
  postUpdateProduct: (id, name, aisle, description, inCart, marked) => dispatch(postUpdateProduct(id, name, aisle, description, inCart, marked)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  signUpUser: (creds) => dispatch(signUpUser(creds))
});

const mapStateToProps = state => {
  return {
    products: state.products,
    auth: state.auth,
    signup: state.signup
  }
}

class ControllableTableComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      alertAddedVisible: false,
      alertDeletedVisible: false,
      alertAllAddedVisible: false,
      alertCreatedVisible: false,
      alertGoneVisible: false
    }
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.showAddedAlert = this.showAddedAlert.bind(this);
    this.showDeletedAlert = this.showDeletedAlert.bind(this);
    this.showAllAddedAlert = this.showAllAddedAlert.bind(this);
    this.showCreatedAlert = this.showCreatedAlert.bind(this);
    this.showGoneAlert = this.showGoneAlert.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.fetchProducts();
    }
  }

  handleSearchTextChange(input) {
    this.setState({
      searchText: input
    });
  }

  showAddedAlert() {
    this.setState({alertAddedVisible:true},()=>{
      window.setTimeout(()=>{
        this.setState({alertAddedVisible:false})
      },2000)
    });
  }

  showDeletedAlert() {
    this.setState({alertDeletedVisible:true},()=>{
      window.setTimeout(()=>{
        this.setState({alertDeletedVisible:false})
      },2000)
    });
  }

  showAllAddedAlert() {
    this.setState({alertAllAddedVisible:true},()=>{
      window.setTimeout(()=>{
        this.setState({alertAllAddedVisible:false})
      },2000)
    });
  }

  showCreatedAlert() {
    this.setState({alertCreatedVisible:true},()=>{
      window.setTimeout(()=>{
        this.setState({alertCreatedVisible:false})
      },2000)
    });
  }

  showGoneAlert() {
    this.setState({alertGoneVisible:true},()=>{
      window.setTimeout(()=>{
        this.setState({alertGoneVisible:false})
      },2000)
    });
  }

  render() {
    const products = this.props.products;
    const redirect = () => {
      if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />
      }
      else {
        return <Redirect to="/" />
      }
    }
    return (
      <div>
        {redirect()}
        <Switch>
          <Route exact path="/">
            <ProductHeaderComponent logoutUser={this.props.logoutUser} auth={this.props.auth} />
            <ProductPanelComponent searchText={this.state.searchText} onSearchTextChange={this.handleSearchTextChange}
              addAllClick={this.showAllAddedAlert} createdClick={this.showCreatedAlert}
              postProduct={this.props.postProduct} products={products.products}
              postUpdateProduct={this.props.postUpdateProduct} />
            <ProductTableComponent products={products.products} searchText={this.state.searchText}
              addClick={this.showAddedAlert} deleteClick={this.showDeletedAlert}
              productsLoading={products.isLoading} productsErrMess={products.errMess}
              postDeleteProduct={this.props.postDeleteProduct} postUpdateProduct={this.props.postUpdateProduct} />
          </Route>
          <Route path="/carrito">
            <CartHeaderComponent />
            <CartTableComponent products={products.products} goneClick={this.showGoneAlert}
              productsLoading={products.isLoading} productsErrMess={products.errMess}
              postUpdateProduct={this.props.postUpdateProduct} />
          </Route>
          <Route path="/login">
            <LoginComponent loginUser={this.props.loginUser} signUpUser={this.props.signUpUser}
              errMess={this.props.auth.errMess} signUpError={this.props.signup.errMess}
              message={this.props.signup.message} />
          </Route>
        </Switch>

        <AlertsComponent alertAddedVisible={this.state.alertAddedVisible}
          alertDeletedVisible={this.state.alertDeletedVisible} alertAllAddedVisible={this.state.alertAllAddedVisible}
          alertCreatedVisible={this.state.alertCreatedVisible} alertGoneVisible={this.state.alertGoneVisible} />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ControllableTableComponent);
