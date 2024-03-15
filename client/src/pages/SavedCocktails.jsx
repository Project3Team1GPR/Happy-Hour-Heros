// import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import Auth from "../utils/auth";
import { removeCocktailId } from "../utils/localStorage";
import { QUERY_GET_ME } from "../utils/queries";
import { REMOVE_COCKTAIL } from "../utils/mutations";

const SavedCocktails = () => {

  const { loading, data } = useQuery(QUERY_GET_ME);
  console.log(data);

  const [removeCocktail, { error }] = useMutation(REMOVE_COCKTAIL);

  const userData = data?.me || { savedCocktails: [] };

  // create function that accepts the cocktails's mongo _id value as param and deletes the cocktail from the database
  const handleDeleteCocktail = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeCocktail({
        variables: { _id: _id },
      });

      if (!data.removeCocktail) {
        throw new Error("something went wrong!");
      }

      // upon success, remove book's id from localStorage
      removeCocktailId(_id);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username}'s cocktails!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedCocktails.length
            ? `Viewing ${userData.savedCocktails.length} saved ${
                userData.savedCocktails.length === 1 ? "cocktail" : "cocktails"
              }:`
            : "You have no saved cocktails!"}
        </h2>
        <Row>
          {userData.savedCocktails.map((cocktail) => {
            return (
              <Col key={cocktail._id} md="4">
                <Card border="dark">
                  {cocktail.image ? (
                    <Card.Img
                      src={cocktail.image}
                      alt={`The cover for ${cocktail.name}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{cocktail.name}</Card.Title>
                    <p className='small'>Category: {cocktail.category}</p>
                    <Card.Text>{cocktail.ingredients}</Card.Text>
                    <Card.Text>{cocktail.instructions}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteCocktail(cocktail._id)}
                    >
                      Delete this Cocktail!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedCocktails;
