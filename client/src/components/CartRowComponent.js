import React from 'react';
import { Input } from 'reactstrap';

export class CartRowComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const product = this.props.product;
    this.props.postUpdateProduct(
      product._id, product.name, product.aisle, product.description, product.inCart, product.marked === true ? false : true
    );
  }

  render() {
    const product = this.props.product;
    return(
      <tr>
        <td>
          <form>
            <div className="form-check">
              <Input type="checkbox" defaultChecked={product.marked}
                onChange={this.handleChange} />&nbsp;
              <label className="form-check-label">{product.name}</label>
            </div>
          </form>
        </td>
        <td>
          {product.aisle}
        </td>
      </tr>
    );
  }
}
