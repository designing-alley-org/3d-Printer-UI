import styled from 'styled-components';
import Layout from '../../components/Layout/index';

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Layout></Layout>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 0 20px;
`;
export default Home;
