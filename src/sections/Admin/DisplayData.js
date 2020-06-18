import React, { useState, useContext, useEffect } from 'react';
import AdminContext from '../../pages/Admin/context';
import api from '../../services/api';
import { MainHeaderTableCell, SubHeaderTableCell, BodyTableCell, Title } from '../../pages/Admin/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
});

// Funções para ordenação
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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
    { id: 'esStatus', label: 'Resultado da prova', minWidth: 200, align: 'center',
      format: (value) => {if(processSituation === 3 || processSituation === 4 || processSituation === 5) {
          if(value === true) return "Aprovado"; else return "Reprovado";
      } else return "";}
    },
    { id: 'esResult', label: 'Resultado da ES', minWidth: 200, align: 'center',
      format: (value) => {if(processSituation === 4 || processSituation === 5) {
          if(value === true) return "Aprovado"; else return "Reprovado";
      } else return "";}
    },
    { id: 'enrollStatus', label: 'Resultado final', minWidth: 200, align: 'center',
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

// 5ª tabela: Dados de escolaridade
const schoolColumns = [
    { id: 'specialNecessity', label: 'Necessidade especial', minWidth: 200, align: 'center' },
    { id: 'schooling', label: 'Escolaridade', minWidth: 250, align: 'center' },
    { id: 'kindSchool', label: 'Tipo de escola', minWidth: 150, align: 'center' },
    { id: 'school', label: 'Escola', minWidth: 250, align: 'center' },
    { id: 'wayPS', label: 'Forma de conhecimento do PS', minWidth: 300, align: 'center' }
];

// 6ª tabela: Justificativa do pedido de isenção
const justificationColumns = [
    { id: 'exemptionJustification', label: 'Justificativa do pedido de isenção', minWidth: 300, align: 'center',
      format: (value) => {if(value) return value; else return "Isenção não pedida.";}
    }
];

const additionalData = [mainDataColumns, statusColumns, addressColumns, personalColumns, schoolColumns, justificationColumns];

// Fazer integração com o db

function createData(name, exemption, grade, esStatus, esResult, enrollStatus) {
    return { name, exemption, grade, esStatus, esResult, enrollStatus,
             candidateNumber: 2100001, rg: '2009009022079', cpf: '06411389381', email: 'italorennanls@gmail.com', privateSpace: "Pardo",
             roomId: "1G1", testPresence: true, esPresence: true, esDate: "11 de novembro", esTime: "19:30",
             street: "Rua Papi Junior", numberStreet: 2418, additionalAddress: "", neighborhood: "Bela Vista", cep: 60441690, city: "Fortaleza", state: "CE",
             gender: "Masculino", birthDate: "10/02/1999", relativeName: "Regina", kinship: "Mãe" /* Adaptar na chamada do db para pegar otherKinship */, phone1: "12981361391", phone2: "",
             specialNecessity: "Não" /* Adaptar na chamada do db para pegar whichNecessity */, schooling: "Cursando o 8º ano do Ensino Fundamental", kindSchool: "Pública Federal", school: "ADVENTISTA DE SAO JOSE DOS CAMPOS COLEGIO", wayPS: "Redes sociais" /* Adaptar para buscar others no db */,
             exemptionJustification: "Aqui vai estar escrito o motivo do pedido de isenção." };
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
                <BodyTableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </BodyTableCell>
                {columns.map((column) => {
                    const value = row[column.id];
                    return (
                        <BodyTableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                        </BodyTableCell>
                    );
                })}
            </TableRow>
            <TableRow>
                <BodyTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Title>Outros dados</Title>
                            {additionalData.map((table) => {
                                return (
                                    <Table key={table.toString()} size="small">
                                        <TableHead>
                                            <TableRow>
                                                {table.map((column) => (
                                                    <SubHeaderTableCell 
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </SubHeaderTableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                {table.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <BodyTableCell key={column.id} align={column.align}>
                                                            {column.format ? column.format(value) : value}
                                                        </BodyTableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                );
                            })}
                        </Box>
                    </Collapse>
                </BodyTableCell>
            </TableRow>
        </React.Fragment>
    );
}

function DisplayData() {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
				async function candidatesPerPage() {
                    //await api.get(`/candidate/getPage?limit=${rowsPerPage}&page=${page+1}`)
                    await api.get(`/candidate/getAll`)
                    .then(res => console.log('RESULTADO', res.data.candidate))
					.catch(error => console.log('ERRO', error));
				}
				candidatesPerPage();
		}, [page]);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [open, setOpen] = useState(false);

    // Filtros
    const [searchField, setSearchField] = useState("");
    const [searchColumn, setSearchColumn] = useState('name');

    const filter = (query) => {
        if (searchColumn === 'esStatus' || searchColumn === 'esResult' || searchColumn === 'enrollStatus') 
            return rows.filter(el => (el[searchColumn] === true ? 'aprovado' : 'reprovado').indexOf(query.toLowerCase()) > -1);
        if (searchColumn === 'exemption')
            return rows.filter(el => (el.exemption === 'analysis' ? 'em análise' : (el.exemption === 'exempted' ? 'isento' : (el.exemption === 'notExempted' ? 'não isento' : (el.exemption === 'notRequired' ? 'não solicitado' : '')))).indexOf(query.toLowerCase()) > -1);
        return rows.filter(el => el[searchColumn].toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1);
    };
    const filteredRows = filter(searchField);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createSortHandler = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <>
        <Paper className={classes.root}>
            <TextField 
            placeholder="Buscar..."
            value={searchField}
            onChange={e => {setSearchField(e.target.value); setPage(0);}}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            />
            <Select 
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={searchColumn}
                onChange={e => setSearchColumn(e.target.value)}
            >
                <MenuItem value=""></MenuItem>
                <MenuItem value="name">Nome</MenuItem>
                <MenuItem value="exemption">Isenção</MenuItem>
                <MenuItem value="grade">Nota</MenuItem>
                <MenuItem value="esStatus">Resultado da prova</MenuItem>
                <MenuItem value="esResult">Resultado da ES</MenuItem>
                <MenuItem value="enrollStatus">Resultado final</MenuItem>
            </Select>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <MainHeaderTableCell/>
                            {columns.map((column) => (
                                <MainHeaderTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        {column.label}
                                        {orderBy === column.id ? (
                                            <span className={classes.visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </MainHeaderTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(filteredRows, getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage="Candidatos por página:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </>
    );
}

export default DisplayData;