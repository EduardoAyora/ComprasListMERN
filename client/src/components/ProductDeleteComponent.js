import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {ConfirmComponent} from './ConfirmComponent';

export class ProductDeleteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.postDeleteProduct(this.props.productId);
    this.props.deleteClick();
  }

  render() {
    return(
      <div className="float-right">
        <ConfirmComponent
          header='Eliminar producto' body='¿Está seguro que desea eliminar este producto?'
          buttonClassName="btn btn-light" buttonContent={<DeleteIcon fontSize="small" />}
          handleClick={this.handleClick}
        />
      </div>
    );
  }

}
