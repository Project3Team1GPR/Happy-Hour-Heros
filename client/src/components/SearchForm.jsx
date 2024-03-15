import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const SearchForm = ({ handleFormSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="text-light bg-dark p-5 mt-3">
      <Container>
        <h1>Search for Cocktails!</h1>
        <Form onSubmit={(e) => handleFormSubmit(e, searchInput)}>
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
    </div>
  );
};

export default SearchForm;
