import React, {useState, useEffect} from "react";
import Recipes from "../../component/recipes/recipes";
import {Col, Row, Container} from "react-bootstrap";
import {getAllRecipe} from '../../api/api';

const Home = () => {

    const [recipes, setRecipes] = useState();

    useEffect(() => {
        getAllRecipe()
        .then(response => {
            setRecipes(response);
        })
    }, []);

    const recipeList = recipes
        ? recipes.map((recipe) => {
            return (
                <Col md={4} key={recipe.uuid}>
                    <Recipes
                        title={recipe.title}
                        description={recipe.description}
                        image={`http://localhost:3001${recipe.images.medium}`}
                        clicked={`recipe/${recipe.uuid}`}/>
                </Col>
            );
        })
        : <Col md={12}>
            <p>No Result Found!</p>
        </Col>
    return (

        <Container>
            <h2 className="mt-4 mb-4">Recipe List</h2>
            <Row>{recipeList}</Row>
        </Container>
    );
}

export default Home;
