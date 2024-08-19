import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

function FormRowhorizantal({ children }) {
  return <StyledFormRow>{children}</StyledFormRow>;
}

export default FormRowhorizantal;
