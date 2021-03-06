import React, { useState, useEffect, useContext } from 'react';
import CandidateStatusContext from '../../pages/CandidateStatus/context';
import { Button, SpanButton } from '../../pages/CandidateStatus/styles';

function Login() {  
  const [errors, setErrors] = useState({});
  const [showCode, setShowCode] = useState(false);
  const { handleLogin, loginData, setLoginData, setActualSection } = useContext(CandidateStatusContext);

  useEffect(() => {
    if(localStorage.getItem('candidate') !== null)
      setActualSection(2);
  }, []);

  function handleStrings(string) {
    string = string.toUpperCase();

    var oldChar = [/Á/g, /É/g, /Í/g, /Ó/g, /Ú/g, /Ã/g, /Õ/g, /Ç/g, /[ ]+/g];
    var newChar = ["A", "E", "I", "O", "U", "A", "O", "C", " "];

    for (var i = 0; i < oldChar.length; i++) {
      string = string.replace(oldChar[i], newChar[i]);
    }

    string = string.trim();

    return string;
  }

  const RGRegEx = RegExp(/^[A-Z]*[0-9]*([0-9Xx]){1}$/);
  function handleRG(value) {
      var RG = handleStrings(value);
      if(RGRegEx.test(RG)) {
        setLoginData({...loginData, rg: RG});
        setErrors({...errors, rg: ""});
      } else {
        setLoginData({...loginData, rg: ""});
        if (RG == "") setErrors({...errors, rg: "Esse campo é obrigatório."});
        else setErrors({...errors, rg: "Número de RG inválido."});
      }
  }

  const codeRegEx = RegExp(/^[A-Z]*[0-9]*$/);
  function handleAccessCode(accessCode) {
    if(codeRegEx.test(accessCode) && accessCode.length === 6) {
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
      <label htmlFor="rg">RG do candidato <a>*</a></label>
      <p>Escreva apenas os números.</p>
      <input 
        type="text" id="rg"
        onChange={e => handleRG(e.target.value)}
      />
      <label htmlFor="accessCode">Código de acesso <a>*</a></label>
      <span style={{cursor: "pointer", fontSize: "12px", color:"white", fontWeight: "bold" }} onClick={() => setShowCode(!showCode)}>{showCode ? 'ESCONDER CÓDIGO' : 'MOSTRAR CÓDIGO'}</span>
      <p>Enviado para o e-mail cadastrado no ato da inscrição.</p>
      <input 
        type={showCode ? 'text' : 'password'} id="accessCode"
        onChange={e => handleAccessCode(e.target.value)}
      />
      <SpanButton onClick={() => console.log('chamar função que faz o back reenviar outro código para o RG definido!')}>
        Esqueci meu código de acesso
      </SpanButton>
      <Button onClick={() => handleLogin()}>ENTRAR</Button>
    </>
  );
}
export default Login;
