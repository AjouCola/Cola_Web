import styled from '@emotion/styled';

const BackgroundDiv = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  -webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const BackgroundImg = styled.canvas`
  top: 0px;
  left: 0px;
  display: block;
  max-width: initial;
  max-height: initial;
  background-color: black;
`;

export { BackgroundDiv, BackgroundImg };
