import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/ui/Loader';
import AlertMessage from '../components/ui/AlertMessage';
import { listProductDetails } from '../actions/productActions';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import Rating from '../components/products/Rating';

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const [qty, setQty] = useState(1);

  const setQuantity = (e) => {
    if (e.target.value > product.countInStock) {
      setQty(product.countInStock);
    } else if (e.target.value < 1) {
      setQty(1);
    } else {
      setQty(e.target.value);
    }
  };

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className='btn btn-secondary my-3' to='/'>
        {' '}
        Go Back
      </Link>

      {loading ? (
        <Loader variant='info' />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
        <Row>
          <Col md='6'>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md='6'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                {product.rating && (
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Price: <strong>${product.price}</strong>{' '}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <p>
                  {product.countInStock > 0 ? (
                    <span className='text-info'>
                      {product.countInStock} left on stock
                    </span>
                  ) : (
                    <span className='text-danger'>Out Of Stock</span>
                  )}
                </p>
                <Row>
                  <Col>
                    {product.countInStock > 0 && (
                      <Form.Group
                        as={Row}
                        className='mb-3'
                        controlId='formPlaintextPassword'>
                        <Form.Label column sm='2'>
                          Quantity:
                        </Form.Label>
                        <Col md='5' sm='3'>
                          <InputGroup>
                            <FormControl
                              type='number'
                              placeholder='1'
                              min='1'
                              max={product.countInStock}
                              value={qty}
                              onChange={(e) => setQuantity(e)}
                              disabled={product.countInStock === 0}
                            />
                            <Button
                              onClick={addToCartHandler}
                              variant='primary'
                              size='sm'
                              disabled={product.countInStock === 0}>
                              Add To Cart
                            </Button>
                          </InputGroup>
                        </Col>
                      </Form.Group>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
