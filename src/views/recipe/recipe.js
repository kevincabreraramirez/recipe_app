import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../../component/withrouter/withrouter';
import { getRecipe, getSpecial } from '../../api/api';
import './recipe.scss'

class recipe extends Component {
  state = { 
    recipe: [],
    ingredients: [],
    directions: [],
    specials: [],
    banner: ''
   } 

  componentDidMount() {
    const recipeID = this.props.params.id;
    getRecipe(recipeID).then(response => {
      this.setState({
        recipe: response,
        banner: response.images.full,
        ingredients: response.ingredients,
        directions: response.directions
      });
      console.log(this.props)
    });
    getSpecial().then(response => {
      this.setState({specials: response})
    })
  }
  render() { 
    const recipe = this.state.recipe;
    
    const ingredients = this.state.ingredients.map(ingredient => {
      
      const specials = this.state.specials.map(special=> {
        if (ingredient.uuid === special.ingredientId)
          return <ul key={special.uuid}>
            <li>{special.type}</li>
            <li>{special.title}</li>
            <li>{special.text}</li>
          </ul>
      });

      return <ul key={ingredient.uuid}>
        <li>{ingredient.name}</li>
        {specials}
      </ul>
    })
    const directions = this.state.directions.map(direction => {
      return <ul key={direction.instructions}>
        <li>{direction.instructions}</li>
      </ul>
    })

    return (

  <div id="ingredients">
      <p>
        <Link to={-1} className="btn btn-primary">Back</Link>
      </p>
      <p>
        <img src={`http://localhost:3001${this.state.banner}`} alt="" width="1000" />
      </p>
      <h2>{ recipe.title }</h2>
      <p>{ recipe.description }</p>
      <p>Cooking Time: { recipe.cookTime }</p>
      <p>Servings: { recipe.servings }</p>

    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Ingredients</h3>
          {ingredients}
        </div>
        <div className="col">
          <h3>Directions</h3>
          {directions}
        </div>
      </div>
    </div>
  </div>
    
    );
  }
}

export default withRouter(recipe);