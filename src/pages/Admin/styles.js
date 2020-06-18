import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

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



export const MainHeaderTableCell = styled(TableCell)`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

  background-color: #dcdcdc;
  font-family: 'Montserrat';
  font-weight: 900;
`;

export const SubHeaderTableCell = styled(TableCell)`
  background-color: #f5f5f5;
  font-family: 'Montserrat';
  font-weight: 900;
`;

export const BodyTableCell = styled(TableCell)`
  font-family: 'Montserrat';
`;

export const Title = styled.div`
  font-family: 'Montserrat';
  font-size: 15px;
  font-weight: 900;
  margin-block-end: 10px;
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
  width: ${props => props.fullWidth ? "100%" : "5em"};
  height: 2em;

  &:hover {
    background: white;
  }

  opacity: ${props => props.checkDisabled ? 0.6 : 1};
`;