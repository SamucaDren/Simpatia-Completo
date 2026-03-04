import styled from "styled-components";

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;

  ${({ $types }) =>
    $types === "top"
      ? `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    padding: 16px 24px;
    gap: 16px;
    border-radius: 8px;
    border: 1px solid #370199;
    transition: 0.3s ease;

    &:hover {
      transform: scale(1.005);
      box-shadow: 0px 4px 14px rgba(76, 75, 103, 0.2);
    }

    /* Responsividade */
    @media (max-width: 768px) {
      font-size: 16px;
      padding: 12px 18px;
      gap: 12px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
      padding: 8px 14px;
      gap: 8px;
    }

    @media (max-width: 350px) {
      font-size: 12px;
      padding: 6px 10px;
      gap: 6px;
    }
  `
      : $types === "outline"
        ? `
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 16px 24px;
    font-weight: 500;
    line-height: 1.6;
    gap: 8px;
    border-radius: 8px;
    transition: 0.3s ease, background-color 0.3s ease;
    color: #7A7A99;

    &:hover {
      color: #006FFF;
      font-weight: 600;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      font-size: 14px;
      padding: 12px 18px;
      gap: 6px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
      padding: 8px 14px;
      gap: 4px;
    }

    @media (max-width: 350px) {
      font-size: 11px;
      padding: 6px 10px;
      gap: 3px;
    }
  `
        : ``}
`;

const Button = ({ children, types, onClick, className }) => {
  return (
    <StyledButton className={className} onClick={onClick} $types={types}>
      {children}
    </StyledButton>
  );
};

export default Button;
