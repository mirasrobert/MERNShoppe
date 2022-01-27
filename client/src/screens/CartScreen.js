import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import AlertMessage from '../components/ui/AlertMessage';
import { Link } from 'react-router-dom';

import {
  Row,
  Col,
  ListGroup,
  Image,
  FormControl,
  Button,
  Card,
} from 'react-bootstrap';

const CartScreen = ({ match, location }) => {
  const productId = match.params.id;

  const qty = location.search ? parseInt(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log(id);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shoppiing Cart</h1>
        {cartItems.length === 0 ? (
          <AlertMessage>
            Your cart is empty <Link to='/'>Go Back</Link>{' '}
          </AlertMessage>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      type='number'
                      placeholder='1'
                      min='1'
                      max={item.countInStock}
                      value={qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, parseInt(e.target.value))
                        )
                      }
                      disabled={item.countInStock === 0}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
