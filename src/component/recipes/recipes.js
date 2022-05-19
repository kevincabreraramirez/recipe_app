import React from "react";
import { Card } from "react-bootstrap";
import "./recipes.scss";
import { Link } from "react-router-dom";

const recipes = (props) => (
  <div className="recipes">
    <Card style={{ width: "100%" }}>
      <Card.Img
        variant="top"
        src={props.image}
        style={{ height: "200px", overflow: "hidden" }}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Link to={props.clicked} className="btn btn-primary">
          View
        </Link>
      </Card.Body>
    </Card>
  </div>
);

export default recipes;
