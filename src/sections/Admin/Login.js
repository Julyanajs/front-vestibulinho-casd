import React, { useState, useContext } from 'react';
import AdminContext from '../../pages/Admin/context';

function Login() {
  const { handleLogin, loginData, setLoginData } = useContext(AdminContext);
  const [errors, setErrors] = useState({});
  const [showCode, setShowCode] = useState(false);

  const codeRegEx = RegExp(/^[A-Z]*[0-9]*$/);
  function handleAccessCode(accessCode) {
    if(codeRegEx.test(accessCode) && accessCode.length === 10) {
      setLoginData({...loginData, accessCode: parseInt(accessCode)});
      setErrors({...errors, accessCode: ""});
    } else {
      setLoginData({...loginData, accessCode: ""});
      if(accessCode == "") setErrors({...errors, accessCode: "Esse campo é obrigatório."});
      else setErrors({...errors, accessCode: "Código de acesso inválido."});
    }
  }

  return (
    <>
      <label htmlFor="accessCode">Código de acesso <a>*</a></label>
      <span style={{cursor: "pointer"}} onClick={() => setShowCode(!showCode)}>{showCode ? 'esconder código' : 'mostrar código'}</span>
      <input 
        type={showCode ? 'text' : 'password'} id="accessCode"
        onChange={e => handleAccessCode(e.target.value)}
      />
      <button onClick={() => handleLogin()}>ENTRAR</button>
    </>
  );
}
export default Login;