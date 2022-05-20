import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import withRouter from "../../component/withrouter/withrouter";
import {Col, Row, Container} from "react-bootstrap";
import "./recipe.scss";
import {getRecipe, getSpecial} from '../../api/api';

const Recipe = (props) => {

    const [recipe, setRecipe] = useState([]);
    const [specials, setSpecials] = useState([]);
    const [banner, setBanner] = useState();
    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);
    const recipeID = props.params.id;

    useEffect(() => {
        getRecipe(recipeID).then(response => {
            setRecipe(response);
            setBanner(response.images.full);
            setIngredients(response.ingredients);
            setDirections(response.directions);
        });
        getSpecial().then(response => {
            setSpecials(response);
        });
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
        );
    });
    const loadDirections = directions.map(direction => {
        return (
            <ul key={direction.instructions}>
                <li>{direction.instructions}</li>
            </ul>
        );
    });
    return (
        <div id="ingredients">
            <p className="mt-4">
                <Link to={-1} className="btn btn-primary">
                    Back
                </Link>
            </p>
            <Container>
                <Row>
                    <Col sm={4}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <p>Cooking Time: {recipe.cookTime}</p>
                        <p>Servings: {recipe.servings}</p>
                    </Col>
                    <Col sm={8}>
                        <p>
                            <img src={`http://localhost:3001${banner}`} alt="" width="100%"/>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Ingredients</h3>
                        {loadIngredients}
                    </Col>
                    <Col>
                        <h3>Directions</h3>
                        {loadDirections}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default withRouter(Recipe);
