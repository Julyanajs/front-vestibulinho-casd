import React, { useState, useEffect } from 'react';
import CandidateStatusContext from './context';
import { Container } from './styles';
import Login from '../../sections/Status/Login';
import Dashboard from '../../sections/Status/Dashboard';
import UpdatePage from '../../sections/Status/UpdatePage';
import api from '../../services/api';

const infosCourse = [
  {
    "casdvest": {
      infoTitle: "Vestibulinho CASDvest 2021"
    },
    "casdinho": {
      infoTitle: "Vestibulinho CASDinho 2021"
    }
  }
];

function CandidateStatus({ idCourse }) {
  const [actualSection, setActualSection] = useState(0);
  const [loginData, setLoginData] = useState({});
  const [candidateData, setCandidateData] = useState({});

  const sections = [
    <Login />,
    <Dashboard idCourse={idCourse}/>,
    <UpdatePage idCourse={idCourse}/>
  ];
  
  useEffect(() => {
    if(localStorage.getItem('candidate') !== null)
      setActualSection(2);
  }, []);

  async function handleLogin() {
    if(loginData.rg && loginData.rg !== "" && loginData.accessCode && loginData.accessCode !== "") {
      console.log('[GET] Validação do login no banco.');
      // --- SE SUCESSO: _Id do candidato é salvo no localStorage
      // --- TEMPORÁRIO: const _Id
      const respGET = await api.get(`/candidate/checkCandidate?rg=${loginData.rg}`);
      setCandidateData(candidateData => {
          return {...candidateData, ...respGET.data.candidate}
        });
      localStorage.setItem('candData', JSON.stringify(respGET.data.candidate));
      console.log(JSON.stringify(candidateData));
      const _Id = "123456";
      localStorage.setItem('candidate', _Id);

      // --- SE SUCESSO:
      if(localStorage.getItem('candidate') === _Id) 
        setActualSection(actualSection+2);
        setLoginData({});
    } else {
      console.log('[ERRO] Erro de validação - RG ou código de acesso');
    }
  }

  return (
    <CandidateStatusContext.Provider value={{ handleLogin, loginData, setLoginData, actualSection, setActualSection, candidateData, setCandidateData }}>
      <Container>
        <h1>{infosCourse[0][idCourse].infoTitle}</h1>
        <h3>Área do candidato</h3>
        <h5>Nesta página, você pode consultar a situação atual da sua participação no Processo Seletivo.</h5>
        {sections[actualSection]}
      </Container>
    </CandidateStatusContext.Provider>
  );
}
export default CandidateStatus;
