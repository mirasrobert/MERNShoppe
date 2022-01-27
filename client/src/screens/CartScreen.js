import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
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

const CartScreen = ({ match, location, history }) => {
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
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
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
                    <Link
                      className='no-underline'
                      to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      type='number'
                      min='1'
                      max={item.countInStock}
                      value={item.qty}
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
                      <i className='fas fa-trash text-danger'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((prev, item) => prev + item.qty, 0)}
                ) items
              </h2>
              ${' '}
              {cartItems
                .reduce((prev, item) => prev + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
