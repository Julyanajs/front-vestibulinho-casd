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
    margin-block-start: 0.5em;
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

  h4 {
    color: ${yellowCASD};
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 1em;
    text-align: justify;
  }

  h5 {
    color: white;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    font-size: 1em;
    text-align: justify;
  }

  h5 > span {
    font-weight: 900;
  }

  h5 > a {
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

  label > a {
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

export const Explain = styled.div`
  color: white;
  margin-block-start: 0em;
  margin-block-end: 0.5em;
  font-size: 0.8em;
  text-align: justify;

  span {
    font-weight: 900;
  }
`;

export const Text = styled.div`
  color: white;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  font-size: 1em;
  text-align: justify;
  font-weight: 900;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-block-start: 0.25em;
  margin-block-end: 0.25em;
  font-size: 1em;
  align-items: center;

  h4 {
    color: ${yellowCASD};
    margin-right: 0.1em;
  }

  text {
    color: white;
    font-weight: 900;
    margin-left: 0.1em;
    margin-right: 0.1em;
  }

  button {
    background-color: white;
    color: ${grayCASD};
    border: none;
    cursor: pointer;
    border-radius: 50%;
    font-size: 0.8em;
    margin-left: 0.1em;
    width: 1em;
    height: 1em;
  }
`;

export const Button = styled.button`
  cursor: ${props => props.checkDisabled ? "default" : "pointer"};
  border-color: white;
  border-radius: 0.5em;
  color: ${grayCASD};
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  padding: 0em;
  font-size: 1em;
  width: 5em;
  height: 2em;

  &:hover {
    background: white;
  }

  opacity: ${props => props.checkDisabled ? 0.6 : 1};
`;

export const SpanButton = styled.span`
  cursor: pointer;
  margin-top: -15px;
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 14px;
  color: ${yellowCASD};
`;
