import styled, { createGlobalStyle } from 'styled-components';

import yellowtail from '../../assets/fonts/yellowtail/Yellowtail-Regular.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Yellowtail';
    src: local('Yellowtail'),
    url(${yellowtail}) format('ttf');
    font-weight: 300;
    font-style: normal;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const NavBar = styled.header`
  background-color: #33be8f;
  position: fixed;
  top: 0;
  width: 100%;
  height: 54px;
  border-bottom: 1px solid #ccc;
  z-index: 2;
  
  p {
    @media (max-width: 950px) {
      left: 10%;  
    }

    position: absolute;
    top: 50%;
    left: 15%;
    transform: translate(-50%, -50%);
    font-family: 'Yellowtail';
    font-size: 30px;
    color: #003716;

    strong {
      color: #008F91;
    }
  }
`;

export const SearchBox = styled.div`
  @media (max-width: 950px) {
    display: none;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  input {
    font-family:Arial, 'FontAwesome';
    width: 215px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding-left: 20px;
    padding-right: 20px;

    &:focus{
      outline: none;
    }
  }
`;

export const Tabs = styled.div`
  position: absolute;
  top: 50%;
  right: -2%;
  transform: translate(-50%, -50%);

  @media (max-width: 950px) {
    right: -30%;
  }

  ul {
    display: flex;
    flex-direction: row;

    list-style: none;

    li {
      &:nth-child(n+1) {
        margin-left: 30px;
      }

      a {
        .icon {
          color: #fff;

          &:hover {
            color: #00A794;
          }
        }

        .prof {
          width: 28px;
          height: 28px;
          border-radius: 50%;
        }
      }
    }
  }
`;

export const Body = styled.div`
  position: absolute;
  top: 54px;
  width: 100%;
  height: 100vh;
  z-index: 0;

  display: flex;
  justify-content: center;
`;
