import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  color: #1CC389;
  font-size: 40px;
  font-family: 'Poppins'
`;

export const Button = styled.button`
  width: 120px;
  height: 60px;
  border-radius: 10px;
  border: 0;
  background-color: #1CC389;
  color: #fff;
  font-size: 35px;
  margin-top: 15px;
  transition: 0.5s;
  transition-property: background-color;

  &:hover {
    background-color: #1CC377;
    cursor: pointer;
  }
`;
