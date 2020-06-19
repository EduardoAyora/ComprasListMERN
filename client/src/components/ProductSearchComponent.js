import React from 'react';

export class ProductSearchComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }

  render() {
    const searchText = this.props.searchText;
    return(
      <form>
          <input className="form-control" type="text" placeholder="Buscar" value={searchText} onChange={this.handleSearchTextChange} />
      </form>
    );
  }

}
