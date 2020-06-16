import React, { useState, useEffect } from 'react';
import AdminContext from './context';
import UploadButton from '../../components/UploadButton';
import Login from '../../sections/Admin/Login';
import DisplayData from '../../sections/Admin/displayData';

function Admin() {
  const [actualSection, setActualSection] = useState(0);
  const [loginData, setLoginData] = useState({});

  const sections = [
    <Login />,
    <>
      <UploadButton />
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
      {sections[actualSection]}
    </AdminContext.Provider>
  );
}
export default Admin;