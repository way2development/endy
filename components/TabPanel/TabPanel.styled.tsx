import styled from "styled-components";
import { theme } from "styles/theme";

export const StyledTabPanel = styled.div`
  position: relative;
  z-index: 1;

  border: 1px solid ${theme.colors.gravy60};
  border-top: 1px solid transparent;

  border-radius: ${theme.borders.borderRadius};
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  /* Corrects the transparent border. */
  margin-top: -1px;
  padding-top: 1px;
`;
