import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {ConfirmComponent} from './ConfirmComponent';

export class ProductAddAllComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const products = this.props.products;
    products.forEach((product) => {
      if (product.inCart === "0"){
        this.props.postUpdateProduct(
          product.id, product.name, product.aisle, product.description, true, false
        );
      }
    });
    this.props.addAllClick();
  }

  render() {
    return(
      <ConfirmComponent
        header='Añadir todo' body='¿Está seguro que desea añadir todo al carrito?'
        buttonClassName="btn btn-outline-success btn-block"
        buttonContent={
          <span>
            <ShoppingCartIcon />&nbsp;
            Agregar todo al carrito
          </span>
        }
        handleClick={this.handleClick}
      />
    );
  }

}
