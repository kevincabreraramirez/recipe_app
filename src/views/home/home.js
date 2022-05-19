import React, {useState, useEffect} from "react";
import Recipes from "../../component/recipes/recipes";
import {Col, Row, Container} from "react-bootstrap";
import "./home.scss";
import axios from "axios";

function Home() {

    const [recipes, setRecipes] = useState();

    const loadRecipes = async() => {
        await axios
            .get('/recipes')
            .then(response => {
                setRecipes(response.data);
            })

    }
    useEffect(() => {
        loadRecipes();
    }, []);

    const recipeList = recipes
        ? recipes.map((recipe) => {
            return (
                <Col className="col-md-4" key={recipe.uuid}>
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

        <Container className="home">
            <h2>Recipe List</h2>
            <Row>{recipeList}</Row>
        </Container>
    );
}

export default Home;
