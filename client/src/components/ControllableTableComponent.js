import React from 'react';
import {ProductHeaderComponent} from './ProductHeaderComponent';
import {CartHeaderComponent} from './CartHeaderComponent';
import ProductTableComponent from './ProductTableComponent';
import {CartTableComponent} from './CartTableComponent';
import {ProductPanelComponent} from './ProductPanelComponent';
import {Switch, Route} from "react-router-dom";
import {AlertsComponent} from './AlertsComponent';
import { connect } from 'react-redux';
import {postProduct, fetchProducts, postDeleteProduct, postUpdateProduct, loginUser,
    logoutUser} from '../store/ActionCreators';

const mapDispatchToProps = dispatch => ({
  postProduct: (name, aisle, description, inCart, marked) => dispatch(postProduct(name, aisle, description, inCart, marked)),
  fetchProducts: () => {dispatch(fetchProducts())},
  postDeleteProduct: (id) => dispatch(postDeleteProduct(id)),
  postUpdateProduct: (id, name, aisle, description, inCart, marked) => dispatch(postUpdateProduct(id, name, aisle, description, inCart, marked)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});

const mapStateToProps = state => {
  return {
    products: state.products,
    auth: state.auth
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
    this.props.fetchProducts();
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
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <ProductHeaderComponent loginUser={this.props.loginUser} logoutUser={this.props.logoutUser}
              auth={this.props.auth} />
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
        </Switch>

        <AlertsComponent alertAddedVisible={this.state.alertAddedVisible}
          alertDeletedVisible={this.state.alertDeletedVisible} alertAllAddedVisible={this.state.alertAllAddedVisible}
          alertCreatedVisible={this.state.alertCreatedVisible} alertGoneVisible={this.state.alertGoneVisible} />
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ControllableTableComponent);
