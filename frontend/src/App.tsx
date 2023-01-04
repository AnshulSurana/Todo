import React from 'react';
import styled from 'styled-components';
import HeaderComponent from './components/HeaderComponent';
import Body from './components/BodyComponent';

const Container = styled.div`
    background-color: #2C3A47;
    width: 100%;
`;

const App = () => (
  <Container data-testid="bodyContainer">
    <HeaderComponent />
    <Body />
  </Container>
);

export default App;
