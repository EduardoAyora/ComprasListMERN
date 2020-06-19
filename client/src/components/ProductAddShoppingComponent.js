import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export class ProductAddShoppingComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const product = this.props.product;
    this.props.postUpdateProduct(
      product.id, product.name, product.aisle, product.description, true, product.marked
    );
    this.props.addClick();
  }

  render() {
    return(
      <button className="btn btn-light" onClick={this.handleClick}>
        <AddShoppingCartIcon fontSize="small" />
      </button>
    );
  }

}
