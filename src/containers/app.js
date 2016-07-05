import React, { PropTypes } from 'react';
import Container from '../components/ui/container';
import Navbar from './navbar';

const App = ({ children }) => {
  return (
    <Container size={4} center>
      <Navbar/>
      <section>
        {children}
      </section>
    </Container>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
