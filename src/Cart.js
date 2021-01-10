import React from "react";
import {Table} from "react-bootstrap";
import {connect} from "react-redux";

function Cart(props){
  return (
      <div>
        <Table responsive="sm">
          <thead>
          <tr>
            <th>#</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>{ props.state[0].name }</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          </tbody>
        </Table>
      </div>
  )
}

function test(state) {
  return {
    state : state
  }
}

export default connect(test)(Cart)
// export default Cart;