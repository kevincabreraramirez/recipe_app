import React, { Component } from 'react';
import { getAllRecipe } from '../../api/api';
import Recipes from '../../component/recipes/recipes';
import {Col, Row, Container} from 'react-bootstrap';
import './home.scss';

class Home extends Component {
  state = { 
    recipes: [],
    reverse: '',
   } 

   componentDidMount() {
    
    getAllRecipe().then(response => {
      this.setState({recipes: response});
      // console.log(this.state.recipes, response)
    });
    
   }

   reverseHandler = (e) => {
     let event = e.target.value.split('').reverse().join('');
    this.setState({reverse: event})
   }
   squaredHandler = (val) => {
    let inputs = val.target.value.split('');
    let squared = inputs.map(input => {
      return input * input
    }).join('')
    console.log(squared)
    
   }

  render() { 
    const recipes = this.state.recipes.map(recipe => {
      return (
      <Col className="col-md-4" key={recipe.uuid}>
        <Recipes title={recipe.title} description={recipe.description} image={`http://localhost:3001${recipe.images.medium}`} clicked={`recipe/${recipe.uuid}`} />
      </Col>
      )
      
    })
    return (
      <Container className="home">
        <h2>Recipe List</h2>
        <Row>
          {recipes}
        </Row>
        <input onChange={this.squaredHandler} />
        {this.state.reverse}
      </Container>
      // <div className='Home'>
       
      // </div>
    );
  }
}
 
export default Home;