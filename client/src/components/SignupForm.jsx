import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import {useNavigate} from "react-router-dom";
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalState';

const SignupForm = () => {
  const navigate = useNavigate();
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', isPremiumService: false });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);
  const [user, setUser] = useGlobalContext();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setUserFormData({ ...userFormData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData, isPremiumService: false },
      });

      if (!data.addUser.token) {
        throw new Error('something went wrong!');
      }
      console.log("SIGNED UP", data);

      setUser(data.addUser.user);
      console.log(user);
      Auth.login(data.addUser.token);
     
      if (userFormData.isPremiumService) {
        navigate("/stripe"); // Redirect to Stripe page
      } else {
        navigate("/saved"); // Redirect to saved page
      }
      
    } catch (err) {
      console.error(err);

      if (error) {
        console.error('GraphQL Error:', error);
      }

      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      isPremiumService: false,
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Check 
            type='checkbox' 
            label='Sign up for Premium Service - $2.99/month' 
            name='isPremiumService' 
            checked={userFormData.isPremiumService} 
            onChange={handleInputChange} 
          />
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
