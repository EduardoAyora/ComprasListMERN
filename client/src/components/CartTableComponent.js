import React from 'react';
import {CartRowComponent} from './CartRowComponent';
import {CartQuitComponent} from './CartQuitComponent';
import { Loading } from './LoadingComponent';

export class CartTableComponent extends React.Component {

  render() {
    const products = [];
    const orderedProducts = this.props.products;
    // ordenamos segun el pasillo del producto
    orderedProducts.sort(function (a, b) {
      if (a.aisle > b.aisle) {
        return 1;
      }
      if (a.aisle < b.aisle) {
        return -1;
      }
      return 0;
    });
    orderedProducts.forEach((product) => {
      if(product.inCart === "1"){
        products.push(<CartRowComponent product={product} key={product.id}
          postUpdateProduct={this.props.postUpdateProduct} />);
      }
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
      return(
        <div className="container">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" />&nbsp;
                  <label className="form-check-label">Seleccionar Todo</label>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Pasillo</th>
                  </tr>
                </thead>
                <tbody>
                  {products}
                </tbody>
              </table>
            </div>
          </div>
          <CartQuitComponent goneClick={this.props.goneClick} products={this.props.products}
            postUpdateProduct={this.props.postUpdateProduct} />
        </div>
      );
    }
    else {
      return(<div></div>);
    }


  }

}
