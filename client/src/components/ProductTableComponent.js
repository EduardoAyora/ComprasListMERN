import React from 'react';
import {ProductRowComponent} from './ProductRowComponent';
import { Loading } from './LoadingComponent';

class ProductTableComponent extends React.Component {

  render() {
    const searchText = this.props.searchText.toLowerCase();
    const products = [];
    const orderedProducts = this.props.products;
    // ordenamos segun el nombre del producto
    orderedProducts.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    orderedProducts.forEach((product) => {
      const productNorm = product.name.toLowerCase();
      if (productNorm.indexOf(searchText) === -1 || product.inCart === "1") {
        return;
      }
      products.push(<ProductRowComponent product={product} key={product.id}
        addClick={this.props.addClick} deleteClick={this.props.deleteClick}
        postDeleteProduct={this.props.postDeleteProduct} postUpdateProduct={this.props.postUpdateProduct} />);
    });
    if(this.props.productsLoading){
      return (
        <div className="container">
          <div className="row justify-content-center">
            <Loading />
          </div>
        </div>
      );
    }
    else if (this.props.productsErrMess) {
      return (
        <div className="container">
         <div className="row justify-content-center">
           <h4>{this.props.productsErrMess}</h4>
         </div>
        </div>
      );
    }
    else if (this.props.products != null){
      return (
        <div className="container">
          <table className="table">
            <tbody>
              {products}
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return(<div></div>);
    }

  }

}

export default ProductTableComponent;
