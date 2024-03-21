import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { searchCocktails } from "../utils/API";
import { saveCocktailIds, getSavedCocktailIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_COCKTAIL } from "../utils/mutations";
import SearchForm from "../components/SearchForm";

import { useGlobalContext } from "../utils/GlobalState";

const SearchCocktails = () => {
  // create state for holding returned google api data
  const [searchedCocktails, setSearchedCocktails] = useState([]);
  // // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved drinkId values
  const [savedCocktailIds, setSavedCocktailIds] = useState(
    getSavedCocktailIds()
  );

  const [saveCocktail, { error }] = useMutation(SAVE_COCKTAIL);

  const [noResults, setNoResults] = useState(false);

  const [user, setUser] = useGlobalContext();

  // set up useEffect hook to save `savedCocktailIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCocktailIds(savedCocktailIds);
  }, [savedCocktailIds]);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event, searchInput) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    // change line below
    try {
      const response = await searchCocktails(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { drinks } = await response.json();
      if (drinks === null) {
        setNoResults(true);
        setSearchedCocktails([]);
        return;
      }

      const cocktailData = drinks.map((cocktail) => {
        const ingredients = [];

        // Iterate over the ingredient and measurement properties dynamically
        for (let i = 1; i <= 15; i++) {
          const ingredient = cocktail[`strIngredient${i}`];
          const measure = cocktail[`strMeasure${i}`];

          // Check if the ingredient and measure exist and are not empty
          if (ingredient && measure) {
            ingredients.push({
              name: ingredient.trim(),
              measurement: measure.trim(),
            });
          }
        }

        return {
          name: cocktail.strDrink,
          drinkId: cocktail.idDrink,
          category: cocktail.strCategory,
          ingredients: ingredients,
          instructions: cocktail.strInstructions,
          image: cocktail.strDrinkThumb || "",
        };
      });

      setSearchedCocktails(cocktailData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveCocktail = async (cocktail) => {
    // find the book in `searchedBooks` state by the matching id

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveCocktail({
        variables: { cocktailInput: { ...cocktail } },
      });

      if (!data.saveCocktail) {
        throw new Error("something went wrong!");
      }
      setUser(data.saveCocktail);
      // if cocktail successfully saves to user's account, save drink id to state
      // setSavedCocktailIds([...savedCocktailIds, cocktailToSave.drinkId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Cocktails!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a cocktail'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div> */}
      {console.log(searchedCocktails.map((cocktail) => cocktail.drinkId))}

      <SearchForm handleFormSubmit={handleFormSubmit} />

      <Container>
        {noResults && searchedCocktails.length === 0 && (
          <h2 className="pt-5">No results found for your search.</h2>
        )}
        <h2 className="pt-5">
          {searchedCocktails.length
            ? `Viewing ${searchedCocktails.length} results:`
            : "Search for a cocktail to begin"}
        </h2>

        <Row>
          {searchedCocktails.map((cocktail) => {
            return (
              <Col md="4" style={{marginTop: "15px"}} key={cocktail.drinkId}>
                <Card
                  border="dark"
                  className="mb-3"
                  style={{ width: "100%", height: "100%" }}
                >
                  {cocktail.image ? (
                    <Card.Img
                      src={cocktail.image}
                      alt={`The cover for ${cocktail.name}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>
                      <strong>{cocktail.name}</strong>
                    </Card.Title>
                    <p className="small">
                      <strong>Category:</strong> {cocktail.category}
                    </p>
                    <Card.Text>
                      <strong>Ingredients:</strong>{" "}
                      <ul>
                        {cocktail.ingredients.map((ingredient, index) => (
                          <li key={index}>
                            {ingredient.name}: {ingredient.measurement}
                          </li>
                        ))}
                      </ul>
                    </Card.Text>
                    <Card.Text>
                      <strong>Instructions:</strong> {cocktail.instructions}
                    </Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCocktailIds?.some(
                          (savedId) => savedId === cocktail.drinkId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveCocktail(cocktail)}
                      >
                        {user.savedCocktails?.some(
                          (sc) => sc.drinkId === cocktail.drinkId
                        )
                          ? "This cocktail has already been saved!"
                          : "Save this Cocktail!"}
                      </Button>
                    )}
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

export default SearchCocktails;
