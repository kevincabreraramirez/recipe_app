import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import withRouter from "../../component/withrouter/withrouter";
import "./recipe.scss";
import axios from "axios";

function Recipe(props) {

    const [recipe, setRecipe] = useState([]);
    const [specials, setSpecials] = useState([]);
    const [banner, setBanner] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);
    const recipeID = props.params.id;

    const loadRecipe = async() => {
        await axios
            .get(`/recipes/${recipeID}`)
            .then(response => {
                setRecipe(response.data);
                setBanner(response.data.images.full);
                setIngredients(response.data.ingredients);
                setDirections(response.data.directions);
            });
        await axios
            .get(`/specials`)
            .then(response => {
                setSpecials(response.data);
            });
    }
    useEffect(() => {
        loadRecipe();
    }, []);

    const loadIngredients = ingredients.map(ingredient => {
        const loadSpecials = specials.map(special => {
            if (ingredient.uuid === special.ingredientId) {
                return (
                    <ul key={special.uuid}>
                        <li>{special.type}</li>
                        <li>{special.title}</li>
                        <li>{special.text}</li>
                    </ul>
                );
            }
        });

        return (
            <ul key={ingredient.uuid}>
                <li>{ingredient.name}</li>
                {loadSpecials}
            </ul>
        )
    });
    const loadDirections = directions.map(direction => {
        return (
            <ul key={direction.instructions}>
                <li>{direction.instructions}</li>
            </ul>
        );
    })
    return (
        <div id="ingredients">
            <p>
                <Link to={-1} className="btn btn-primary">
                    Back
                </Link>
            </p>
            <p>
                <img src={`http://localhost:3001${banner}`} alt="" width="1000"/>
            </p>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>Cooking Time: {recipe.cookTime}</p>
            <p>Servings: {recipe.servings}</p>

            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Ingredients</h3>
                        {loadIngredients}
                    </div>
                    <div className="col">
                        <h3>Directions</h3>
                        {loadDirections}
                    </div>
                </div>
            </div>
        </div>
    );
    // }
}

export default withRouter(Recipe);
