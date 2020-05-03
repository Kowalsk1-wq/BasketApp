import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Card = styled.div`
  position : absolute;
  left: 120px;
  background-color: #ffffff;
  width: 640px;
  height: 640px;
  margin-top: 15px;

  border: 1px solid #ccc; 
  border-radius: 15px;

  &:nth-child(2) {
    margin-top: 680px;
  }

  header {
    position: absolute;
    width: 100%;
    height: 80px;

    border-bottom: 2px solid #ccc;

    img {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      top: 50%;
      left: 10%;
      transform: translate(-50%, -50%);
    }

    h4 {
      position: absolute;
      top: 45%;
      left: 28%;
      transform: translate(-50%, -50%);

      font-size: 25px;
      font-weight: bold;
    }

    span {
      position: absolute;
      top: 72%;
      left: 25%;
      transform: translate(-50%, -50%);

      font-size: 14px;
      color: #aaa;
    }

    a {
      position: absolute;
      top: 35%;
      right: 3%;
      transform: translate(-50%, -50%);
    }
  }

  img {
    position: absolute;
    width: 100%;
    height: 500px;

    top: 80px;
  }
`;
