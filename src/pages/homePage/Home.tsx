// src/components/Dashboard.tsx
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/Layout/index';
// import MainCard from '../../components/MainCard/MainCard';
import CardLayout from '../../components/CardLayout';
import MainCard from '../../components/MainCard/MainCard';

const Home: React.FC = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  const totalTabs = 4; // Total number of tabs
  const [activeTabs, setActiveTabs] = useState<number[]>([]);

  const handleTabClick = (index: number) => {
    if (index > 0) {
      const len = Array.from({ length: index + 1 }, (_, i) => i);
      setActiveTabs(len);
    } else {
      setActiveTabs([index]);
    }
  };

  return (
    <Wrapper>
      <Layout>
        <div>
          <CardLayout totalTabs={totalTabs} activeTabs = {activeTabs} handleTabClick={handleTabClick}>
            <MainCard activeTabs={activeTabs} />
          </CardLayout>
        </div>
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 0 20px;
`;
export default Home;
