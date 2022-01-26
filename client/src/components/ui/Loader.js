import { Spinner } from 'react-bootstrap';

const Loader = ({ variant }) => {
  return (
    <Spinner
      variant={variant}
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    />
  );
};

Loader.defaultProps = {
  variant: 'primary',
};

export default Loader;
