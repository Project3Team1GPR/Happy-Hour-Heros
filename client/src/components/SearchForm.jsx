import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

const SearchForm = ({ handleFormSubmit }) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div className="text-dark bg-light p-5 mt-3">
        <Container>
          <h1>Search for a cocktail below</h1>
          <Form onSubmit={(e) => handleFormSubmit(e, searchInput)}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="search the cocktail codex"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button
                  type="submit"
                  style={{ backgroundColor: "blue", borderColor: "blue" }}
                  size="lg"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <div className="text-center mt-5">
        <img
          src="https://www.pngall.com/wp-content/uploads/5/Summer-Cocktail-PNG-Free-Image.png"
          alt="Cocktail Banner"
          className="img-fluid"
        />
      </div>
    </>
  );
};

export default SearchForm;
