import React, { useState, useEffect } from 'react';
import AdminContext from './context';
import { Container } from './styles';
import UploadButton from '../../components/UploadButton';
import RoomInput from '../../components/RoomInput';
import Login from '../../sections/Admin/Login';
import DisplayData from '../../sections/Admin/DisplayData';

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

function Admin({ idCourse }) {
  const [actualSection, setActualSection] = useState(0);
  const [loginData, setLoginData] = useState({});

  const sections = [
    <Login />,
    <>
      <UploadButton />
      <RoomInput />
      <DisplayData />
    </>
  ];

  useEffect(() => {
    if(localStorage.getItem('admin') !== null)
      setActualSection(1);
  }, []);

  function handleLogin() {
    if(loginData.accessCode && loginData.accessCode !== "") {
      console.log('[GET] Validação do login no banco.');
      // --- SE SUCESSO: _Id do candidato é salvo no localStorage
      // --- TEMPORÁRIO: const _Id
      const _Id = "123456";
      localStorage.setItem('admin', _Id);

      // --- SE SUCESSO:
      if(localStorage.getItem('admin') === _Id) 
        setActualSection(actualSection+1);
        setLoginData({});
    } else {
      console.log('[ERRO] Erro de validação - RG ou código de acesso');
    }
  }
  
  return (
    <AdminContext.Provider value={{ handleLogin, loginData, setLoginData, actualSection, setActualSection }}>
      <Container>
        <h1>{infosCourse[0][idCourse].infoTitle}</h1>
        <h3>Área do admin</h3>
        <h5>Nesta página, você pode consultar a situação atual da sua participação no Processo Seletivo.</h5>
        {sections[actualSection]}
      </Container>
    </AdminContext.Provider>
  );
}
export default Admin;