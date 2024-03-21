// import { useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import Auth from "../utils/auth";
import { removeCocktailId } from "../utils/localStorage";
import { QUERY_GET_ME } from "../utils/queries";
import { REMOVE_COCKTAIL } from "../utils/mutations";
import { useGlobalContext } from '../utils/GlobalState';


const SavedCocktails = () => {

  const { loading, data, refetch } = useQuery(QUERY_GET_ME);
  console.log(data);

  const [removeCocktail, { error }] = useMutation(REMOVE_COCKTAIL);

  // const userData = data?.me || { savedCocktails: [] };

  // console.log(userData)

  const [user, setUser] = useGlobalContext();

  // create function that accepts the cocktails's mongo _id value as param and deletes the cocktail from the database
  const handleDeleteCocktail = async (cocktail) => {
    console.log("REMOVING", cocktail)
    try {
      const { data } = await removeCocktail({
        variables: { cocktailId: cocktail._id },
      });

      if (!data.removeCocktail) {
        throw new Error("something went wrong!");
      }

      // upon success, remove cocktail's id from localStorage
      // removeCocktailId(drinkId);

      setUser(data.removeCocktail)

      // Refetch the me query to update the savedCocktails data
    refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (!user._id) {
    return <h1>Getting Profile</h1>
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {user.username}'s cocktails!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {user?.savedCocktails?.length
            ? `Viewing ${user.savedCocktails.length} saved ${
                user.savedCocktails.length === 1 ? "cocktail" : "cocktails"
              }:`
            : "You have no saved cocktails!"}
        </h2>
        <Row>
          {user?.savedCocktails.map((cocktail) => {
            return (
              <Col key={cocktail.drinkId} md="10">
                <Card border="dark" className="mb-3">
                  {cocktail.image ? (
                    <Card.Img
                      src={cocktail.image}
                      alt={`The cover for ${cocktail.name}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title><strong>{cocktail.name}</strong></Card.Title>
                    <p className='small'><strong>Category:</strong> {cocktail.category}</p>
                    <Card.Text><strong>Ingredients:</strong>
                    <ul>
                      {cocktail.ingredients?.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.name}: {ingredient.measurement}
                        </li>
                      ))}
                    </ul></Card.Text>
                    <Card.Text><strong>Instructions: </strong>{cocktail.instructions}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteCocktail(cocktail)}
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
