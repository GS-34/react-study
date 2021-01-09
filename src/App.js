import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {Navbar, Nav, NavDropdown, Jumbotron, Button, Spinner } from 'react-bootstrap';
import { data } from "./data";
import Detail from "./Detail";
import {Link, Route, Switch} from 'react-router-dom';
import axios from "axios";

function App() {

  let [shoes, setShoes] = useState(data);
  let [showSpinner, setShowSpinner] = useState(false);
  let [stock, setStock] = useState([10,11,12]);


  return (
    <div className="App">
      <Navbar bg="light" expand="lg" >
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as = { Link } to="/">Home</Nav.Link>
            <Nav.Link as = { Link } to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>



      <Switch>
        <Route exact path="/">

          <Jumbotron className="background">
            <h1>Shop</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>


          <div className="container">
            <div className="row">
              {
                shoes.map(function (shoes,i) {
                  return(
                      <Product product={shoes} key={shoes.id}/>
                  );
                })
              }
            </div>
            <button className="btn btn-primary" onClick={()=>{
              setShowSpinner(true);

              axios.get("https://codingapple1.github.io/shop/data2.json")
              .then((response)=>{
                let array =  [...shoes, ...response.data];
                setShoes(array);

              })//성공시
              .catch(()=>{

                console.log("실패");

              })//실패시
              .finally(()=>{

                setShowSpinner(false);

              });

            }}>더보기</button>

            {
              showSpinner ?
                <AjaxSpinner/>
                :null
            }
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail product={shoes} stock={stock} setStock={setStock}/>
        </Route>
      </Switch>



    </div>
  );
}

function Product(props) {
  return (
      <div className="col-md-4">
        <Link to={"/detail/"+props.product.id}>
            <img src={"https://codingapple1.github.io/shop/shoes"+ (props.product.id+1) +".jpg"} width="100%"/>
            <h4>{props.product.title}</h4>
            <p>{ props.product.content } & { props.product.price }</p>
        </Link>
      </div>
  )
}

function AjaxSpinner(){
  return(
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
  )
}

export default App;
