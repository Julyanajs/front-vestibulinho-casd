import styled from 'styled-components';

const blueCASD = "#3192b3";
const yellowCASD = "#f9b342";
const grayCASD = "#706f6f";

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

  width: 100%;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5vw;
  background-color: ${blueCASD};
  font-family: 'Montserrat';

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  form {
    width: 100%;
  }

  h1 {
    font-family: 'Lobster';
    color: ${yellowCASD};
    margin-block-start: 1em;
    margin-block-end: 0.5em;
    font-size: 2.5em;
    text-align: center;
  }

  h3 {
    font-family: 'Lobster';
    color: ${yellowCASD};
    margin-block-start: 0.5em;
    margin-block-end: 1em;
    font-size: 2em;
    text-align: center;
  }

  text {
    color: white;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 1em;
    text-align: justify;
  }

  text > span {
    font-weight: 900;
  }

  text > a {
    font-weight: 900;
    color: #00ffff;
  }

  label {
    font-weight: 900;
    color: white;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 1em;
    text-align: justify;
  }

  label > ast {
    color: #991111;
  }

  p {
    color: white;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 0.8em;
  }

  input {
    color: ${grayCASD};
    margin-block-start: 0.5em;
    margin-block-end: 1.5em;
    padding: 0.5em;
    font-size: 1em;
  }

  select {
    font-family: Montserrat;
    background-color: white;
    color: ${grayCASD};
    margin-block-start: 0.5em;
    margin-block-end: 1.5em;
    padding: 0.5em;
    font-size: 1em;
  }
`;

export const Button = styled.button`
  border-color: white;
  border-radius: 0.5em;
  color: ${grayCASD};
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-left: 5vw;
  padding: 0.5em;
  font-size: 1em;

  &:hover {
    background: white;
  }

  opacity: ${props => props.checkDisabled ? 0.6 : 1};
`;

export const ErrorMessage = styled.p`
	color: #991111 !important;
  margin-block-start: 0em !important;
  margin-block-end: 1.5em !important;
`;

export const GeneralErrorMessage = styled(ErrorMessage)`
  color: ${yellowCASD} !important;
  margin-block-end: 0.5em !important;
`;

export const Box = styled.div`
  border-style: solid;
  border-color: ${yellowCASD};
  background: linear-gradient(90deg, ${yellowCASD} ${props => props.size}, ${blueCASD} ${props => props.size});
  margin-left: 5vw;
  margin-right: 5vw;
  margin-block-end: 0.5em;
  height: 5vh;
`;

export const PageButton = styled.div`
  display: flex;
  flex-direction: row wrap;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 5vw;
  margin-right: 5vw;

  button {
    color: ${yellowCASD};
    font-size: 1em;
    background-color: ${blueCASD};
    border: none;
    cursor: pointer;
  }
`;
