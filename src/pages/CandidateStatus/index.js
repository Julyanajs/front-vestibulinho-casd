import React, { useState, useEffect } from 'react';
import CandidateStatusContext from './context';
import { Container } from './styles';
import Login from '../../sections/Status/Login';
import Dashboard from '../../sections/Status/Dashboard';

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

  const sections = [
    <Login />,
    <Dashboard idCourse={idCourse}/>
  ];
  
  useEffect(() => console.log('loginData', loginData), [loginData]);

  function handleLogin() {
    if(loginData.rg && loginData.rg !== "" && loginData.accessCode && loginData.accessCode !== "") {
      console.log('[GET] Validação do login no banco.');
      // --- SE SUCESSO: _Id do candidato é salvo no localStorage
      // --- TEMPORÁRIO: const _Id
      const _Id = "123456";
      localStorage.setItem('candidate', _Id);

      // --- SE SUCESSO:
      if(localStorage.getItem('candidate') === _Id) 
        setActualSection(actualSection+1);
        setLoginData({});
    } else {
      console.log('[ERRO] Erro de validação - RG ou código de acesso');
    }
  }

  return (
    <CandidateStatusContext.Provider value={{ handleLogin, loginData, setLoginData, actualSection, setActualSection }}>
      <Container>
        <h1>{infosCourse[0][idCourse].infoTitle}</h1>
        <h3>Área do candidato</h3>
        <text>Nesta página, você pode consultar a situação atual da sua participação no Processo Seletivo.</text>
        {sections[actualSection]}
      </Container>
    </CandidateStatusContext.Provider>
  );
}
export default CandidateStatus;