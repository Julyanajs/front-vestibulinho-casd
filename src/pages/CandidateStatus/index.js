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

  const sections = [
    <Login />,
    <Dashboard idCourse={idCourse}/>,
    <UpdatePage idCourse={idCourse}/>
  ];
  
  useEffect(() => {
    if(sessionStorage.getItem('candidate') !== null)
      setActualSection(1);
  }, []);


  async function handleLogin() {
    if(loginData.rg && loginData.rg !== "") {
      await api.get(`/candidate/checkCandidate?rg=${loginData.rg}`)
        .then(res => {
          const { candidate } = res.data; 
          sessionStorage.setItem('candidate', candidate._id);
          setActualSection(actualSection+1);
        })
        .catch(error => console.log("[ERRO]", error));
    } else alert("[ERRO DE VALIDAÇÃO] RG incorreto.");
  }

  return (
    <CandidateStatusContext.Provider value={{ handleLogin, loginData, setLoginData, actualSection, setActualSection}}>
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
