import styled from "styled-components";
import { theme } from "styles/theme";

export const StyledTab = styled.li`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  border: 1px solid transparent;
  border-top-color: ${theme.borders.borderColor};
  border-right-color: ${theme.borders.borderColor};

  &:first-child {
    border-top-left-radius: ${theme.borders.borderRadius};
    border-left-color: ${theme.borders.borderColor};
  }

  &:last-child {
    border-top-right-radius: ${theme.borders.borderRadius};
    border-right-color: ${theme.borders.borderColor};
  }

  /* Corrects the 1px transparent border */
  &:not(:last-of-type) {
    margin-right: -1px;
    padding-right: 1px;
  }

  &:is([aria-selected="true"]) {
    border-color: ${theme.colors.gravy60};
    border-bottom: 0;
  }

  &:is([aria-selected="false"]) {
    border-bottom-color: ${theme.colors.gravy60};

    button {
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.gravy60};
    }
  }
`;

export const StyledTabButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.s};
  appearance: none;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.gravy};
`;
