// src/components/Dashboard.tsx
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header';

const Home: React.FC = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  return (
    <Wrapper>
      <Header />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 0 20px;
`;
export default Home;
