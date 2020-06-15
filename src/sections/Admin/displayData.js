import React, { useState } from 'react';
import { Container } from '../../pages/Admin/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const processSituation = 5;

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '100%',
    },
});

// Colunas da tabela principal
const columns = [
    { id: 'name', label: 'Nome', minWidth: 200, align: 'center' },
    { id: 'exemption', label: 'Isenção', minWidth: 150, align: 'center',
      format: (value) => {switch(value) {
        case "analysis": return 'Em análise';  
        case "exempted": return 'Isento';
        case "notExempted": return 'Não isento';
        case "notRequired": return 'Não solicitado';
    }}
    },
    { id: 'grade', label: 'Nota', minWidth: 50, align: 'center' },
    { id: 'esStatus', label: 'Resultado da prova', minWidth: 170, align: 'center',
      format: (value) => {if(processSituation === 3 || processSituation === 4 || processSituation === 5) {
          if(value === true) return "Aprovado"; else return "Reprovado";
      } else return "";}
    },
    { id: 'esResult', label: 'Resultado da ES', minWidth: 170, align: 'center',
      format: (value) => {if(processSituation === 4 || processSituation === 5) {
          if(value === true) return "Aprovado"; else return "Reprovado";
      } else return "";}
    },
    { id: 'enrollStatus', label: 'Resultado final', minWidth: 170, align: 'center',
      format: (value) => {if(processSituation === 5) {
          if(value === true) return "Aprovado"; else return "Reprovado";
      } else return "";}
    }
];

// Colunas das tabelas de mais dados

// 1ª tabela: Dados principais
const mainDataColumns = [
    { id: 'candidateNumber', label: 'Número do candidato', minWidth: 200, align: 'center' },
    { id: 'rg', label: 'RG', minWidth: 100, align: 'center' },
    { id: 'cpf', label: 'CPF', minWidth: 100, align: 'center' },
    { id: 'email', label: 'E-mail', minWidth: 200, align: 'center' },
    { id: 'privateSpace', label: 'Autodeclaração', minWidth: 50, align: 'center' }
];

// 2ª tabela: Dados de status
const statusColumns = [
    { id: 'roomId', label: 'Sala', minWidth: 50, align: 'center',
      format: (value) => {if(value === "undefined") return ""; else return value;}
    },
    { id: 'testPresence', label: 'Presença na prova', minWidth: 100, align: 'center',
      format: (value) => {if(processSituation >= 2) {
          if(value === true) return "Presente"; else return "Ausente";
      } else return "";}
    },
    { id: 'esPresence', label: 'Presença na ES', minWidth: 100, align: 'center',
      format: (value) => {if(processSituation >= 3) {
          if(value === true) return "Presente"; else return "Ausente";
      } else return "";}
    },
    { id: 'esDate', label: 'Data da ES', minWidth: 50, align: 'center',
      format: (value) => {if(value === "undefined") return ""; else return value;}
    },
    { id: 'esTime', label: 'Horário da ES', minWidth: 50, align: 'center',
      format: (value) => {if(value === "undefined") return ""; else return value;}
    },
];

// 3ª tabela: Dados de endereço
const addressColumns = [
    { id: 'street', label: 'Rua', minWidth: 100, align: 'center' },
    { id: 'numberStreet', label: 'Número', minWidth: 20, align: 'center' },
    { id: 'additionalAddress', label: 'Complemento', minWidth: 50, align: 'center'},
    { id: 'neighborhood', label: 'Bairro', minWidth: 100, align: 'center' },
    { id: 'cep', label: 'CEP', minWidth: 50, align: 'center' },
    { id: 'city', label: 'Cidade', minWidth: 50, align: 'center' },
    { id: 'state', label: 'Estado', minWidth: 20, align: 'center' }
];

// 4ª tabela: Dados pessoais
const personalColumns = [
    { id: 'gender', label: 'Gênero', minWidth: 50, align: 'center' },
    { id: 'birthDate', label: 'Data de nascimento', minWidth: 70, align: 'center' },
    { id: 'relativeName', label: 'Responsável', minWidth: 100, align: 'center'},
    { id: 'kinship', label: 'Parentesco', minWidth: 50, align: 'center' },
    { id: 'phone1', label: 'Telefone 1', minWidth: 70, align: 'center' },
    { id: 'phone2', label: 'Telefone 2', minWidth: 70, align: 'center'}
];

const additionalData = [mainDataColumns, statusColumns, addressColumns, personalColumns];

function createData(name, exemption, grade, esStatus, esResult, enrollStatus) {
    return { name, exemption, grade, esStatus, esResult, enrollStatus,
             candidateNumber: 2100001, rg: '2009009022079', cpf: '06411389381', email: 'italorennanls@gmail.com', privateSpace: "Pardo",
             roomId: "1G1", testPresence: true, esPresence: true, esDate: "11 de novembro", esTime: "19:30",
             street: "Rua Papi Junior", numberStreet: 2418, additionalAddress: "", neighborhood: "Bela Vista", cep: 60441690, city: "Fortaleza", state: "CE",
             gender: "Masculino", birthDate: "10/02/1999", relativeName: "Regina", kinship: "Mãe" /* Adaptar na chamada do db para pegar otherKinship */, phone1: "12981361391", phone2: "" };
}

const rows = [
    createData("Italo Rennan", "analysis", 40, true, true, true),
    createData("Zeus Gato", "notExempted", 50, true, false, false),
    createData("Peter Doguinho", "notRequired", 60, false, false, false),
    createData("Luisito", "notRequired", "", false, false, false),
    createData("Leite", "exempted", 2, true, false, false),
    createData("Teste", "exempted", 20, false, false, false),
    createData("Gustavo Mioto", "notRequired", 40, true, true, true),
    createData("Marilia Mendonca", "analysis", 25, false, false, false),
    createData("Jorge", "analysis", 20, true, false, false),
    createData("Mateus", "notExempted", "", true, false, false),
    createData("Maiara", "analysis", 58, false, false, false),
    createData("Maraisa", "notRequired", 20, true, true, false),
];

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {columns.map((column) => {
                    const value = row[column.id];
                    return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                        </TableCell>
                    );
                })}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Outros dados
                            </Typography>
                            {additionalData.map((table) => {
                                return (
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                {table.map((column) => (
                                                    <TableCell 
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {table.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                );
                            })}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

function DisplayData() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default DisplayData;