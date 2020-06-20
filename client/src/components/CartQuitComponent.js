import React from 'react';

export class CartQuitComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const products = this.props.products;
    products.forEach((product) => {
      if (product.inCart === true && product.marked === true){
        this.props.postUpdateProduct(
          product._id, product.name, product.aisle, product.description, false, false
        );
      }
    });
    this.props.goneClick();
  }

  render() {
    return(
      <div className="row mt-4 mb-4 justify-content-center">
        <div className="col-5">
          <button className="btn btn-outline-success btn-block" onClick={this.handleClick}>
            Quitar seleccionados
          </button>
        </div>
      </div>
    );
  }


}
