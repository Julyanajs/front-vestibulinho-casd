import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';

const blueCASD = "#3192b3";
const yellowCASD = "#f9b342";
const grayCASD = "#706f6f";

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
