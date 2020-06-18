import React, { useState, useEffect } from 'react';
import CandidateStatusContext from './context';
import { Container } from './styles';
import Login from '../../sections/Status/Login';
import Dashboard from '../../sections/Status/Dashboard';
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
  const [candidate, setCandidate] = useState({});

  const sections = [
    <Login />,
    <Dashboard idCourse={idCourse} />
  ];
  
  useEffect(() => {
    if(localStorage.getItem('candidate') !== null) {
      setActualSection(1);
      //salvar dados do GET em candidate - puxar pelo _id salvo no localStorage
    }
  }, []);

  async function handleLogin() {
    // if(loginData.rg && loginData.rg !== "" && loginData.accessCode && loginData.accessCode !== "") {
      const respGET = await api.get(`/candidate/checkCandidate?rg=${loginData.rg}`);
      
      if(!respGET.data || respGET.data === "") {
        alert('Não existe candidato com esse RG.');
      } else {
        console.log('CANDIDATO', respGET.data);
        setActualSection(actualSection+1);
        setCandidate(respGET.data.candidate);
        console.log('AAA candidate', respGET.data.candidate);
        localStorage.setItem('candidate', respGET.data.candidate._id);
        console.log('teste', localStorage.getItem('candidate'));
      }

      setLoginData({});
    // } 
    // else {
    //   console.log('[ERRO] Erro de validação - RG ou código de acesso');
    // }
  }

  return (
    <CandidateStatusContext.Provider value={{ handleLogin, loginData, setLoginData, actualSection, setActualSection }}>
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