import styled from 'styled-components'
import { GlobalStyle } from './styles/global';

const Title = styled.h1`
  color: #8257e6;
  font-size: 3rem;
`

export function App() {
  return (
    <div className="App">
      <Title>Hello GitHub</Title>
      <GlobalStyle />
    </div>
  );
}
