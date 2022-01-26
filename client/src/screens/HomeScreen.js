import { useEffect } from 'react';
import Product from '../components/products/Product';
import Loader from '../components/ui/Loader';
import AlertMessage from '../components/ui/AlertMessage';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch(); // hooks to dispatch an action

  // Get from the state
  const productList = useSelector((state) => state.productList);

  // Desctructure what we need
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader variant='info' />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm='12' md='6' lg='4' xl='3'>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
