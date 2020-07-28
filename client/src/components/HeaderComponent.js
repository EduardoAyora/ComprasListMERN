import React from 'react';
import {Navbar} from 'reactstrap';

export function HeaderComponent(props) {
  return(
    <Navbar className="mb-4 header" color="light" light expand="md" id="navbar">
      <div className="container">
        <div className={props.align}>
          {props.children}
        </div>
      </div>
    </Navbar>
  );
}
