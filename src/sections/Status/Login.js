import React, { useState, useEffect, useContext } from 'react';
import CandidateStatusContext from '../../pages/CandidateStatus/context';

function Login() {
  //TODO - sobre o "esqueci o código de acesso" (já alinhado com o back)
  // se a pessoa clica em "esqueci o código de acesso", abre um input p ela inserir o rg já cadastrado
  //gera uma requisição pro back end q vai mandar um novo código pro email cadastrado
  //a resposta dessa requisição - se for sucesso - retorna o email pra ql o código foi enviado
  //colocar em tela como feedback pro usuário
  
  const [errors, setErrors] = useState({});
  const [showCode, setShowCode] = useState(false);
  const { handleLogin, loginData, setLoginData, setActualSection } = useContext(CandidateStatusContext);

  useEffect(() => {
    if(localStorage.getItem('candidate') !== null)
      setActualSection(1);
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
      <label htmlFor="rg">RG do candidato <ast>*</ast></label>
      <p>Escreva apenas os números.</p>
      <input 
        type="text" id="rg"
        onChange={e => handleRG(e.target.value)}
      />
      <label htmlFor="accessCode">Código de acesso <ast>*</ast></label>
      <span style={{cursor: "pointer"}} onClick={() => setShowCode(!showCode)}>{showCode ? 'esconder código' : 'mostrar código'}</span>
      <p>Enviado para o e-mail cadastrado no ato da inscrição.</p>
      <input 
        type={showCode ? 'text' : 'password'} id="accessCode"
        onChange={e => handleAccessCode(e.target.value)}
      />
      <span style={{cursor: "pointer"}} onClick={() => console.log('chamar função que faz o back reenviar outro código para o RG definido!')}>
        Esqueci meu código de acesso
      </span>
      <button onClick={() => handleLogin()}>ENTRAR</button>
    </>
  );
}
export default Login;