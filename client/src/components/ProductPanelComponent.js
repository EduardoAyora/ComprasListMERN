import React from 'react';
import {ProductAddAllComponent} from './ProductAddAllComponent';
import {ProductNewComponent} from './ProductNewComponent';
import {ProductSearchComponent} from './ProductSearchComponent';

export class ProductPanelComponent extends React.Component {

  render() {
    return(
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col">
            <ProductSearchComponent searchText={this.props.searchText} onSearchTextChange={this.props.onSearchTextChange} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-md-6 mb-4">
            <ProductAddAllComponent addAllClick={this.props.addAllClick} products={this.props.products}
              postUpdateProduct={this.props.postUpdateProduct} />
          </div>
          <div className="col-12 col-md-6 mb-4">
            <ProductNewComponent createdClick={this.props.createdClick} postProduct={this.props.postProduct} />
          </div>
        </div>
      </div>
    );
  }

}
