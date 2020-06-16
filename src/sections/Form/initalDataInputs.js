import React, { useState, useContext, useEffect } from 'react';
import { Container, ErrorMessage, GeneralErrorMessage } from '../../pages/FormRegistration/styles';
import FormRegistrationContext from '../../pages/FormRegistration/context';

// Adaptar diferenças entre CASDvest e CASDinho
/// CPF obrigatório apenas no CASDvest
const difCourse = [
  {
    "casdvest": {
      CPFTitle: <>CPF <a>*</a></>
    },
    "casdinho": {
      CPFTitle: <>CPF</>
    }
  }
]

function InitialDataInputs({ idCourse }) {
  const [initialData, setInitialData] = useState({});
  const [errors, setErrors] = useState({});
  const { formData, setFormData } = useContext(FormRegistrationContext);
  const [verEmail, setVerEmail] = useState({email1: "erro", email2:"erro"});

  useEffect(() => setFormData({...formData, ...initialData}), [initialData, setFormData, setInitialData]);

  // Estrutura de perguntas com validação por padrão:
  /// const ... = RegExp(...); --> expressão regular que define o padrão
  /// function handle...(e) --> função que lida com a validação
  /// Se o input obedece padrão, salva no banco de dados
  /// Se não obedece, salva string vazia

  // Função para tratar strings: torna tudo maiúsculo, remove acentos e espaços extras
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

  // Validação do nome
  const NameRegEx = RegExp(/[A-ZÁÉÍÓÚa-záéíóúç]+[ ]+([A-ZÁÉÍÓÚa-záéíóúç]+[ ]*)+/);
  function handleName(e) {
      var name = e.target.value;

      if(NameRegEx.test(name)) {
          var handledName = handleStrings(name);
          setInitialData({...initialData, name: handledName});
          setErrors({...errors, name: ""});
      }
      else {
          setInitialData({...initialData, name: ""});
          if (name == "") setErrors({...errors, name: "Esse campo é obrigatório."});
          else setErrors({...errors, name: "Escreva seu nome completo."});
      }
  }

  // Validação do RG
  const RGRegEx = RegExp(/^[A-Z]*[0-9]*([0-9Xx]){1}$/);
  function handleRG(e) {
      var RG = handleStrings(e.target.value);

      if(RGRegEx.test(RG)) {
          setInitialData({...initialData, rg: RG});
          setErrors({...errors, rg: ""});
      }
      else {
          setInitialData({...initialData, rg: ""});
          if (RG == "") setErrors({...errors, rg: "Esse campo é obrigatório."});
          else setErrors({...errors, rg: "Número de RG inválido."});
      }
  }

  // Validação do CPF
  const CPFRegEx = RegExp(/^[0-9]{11}$/);
  function handleCPF(e) {
      if (CPFRegEx.test(e.target.value)) {
        // Critério oficial dos dígitos verificadores
        var validity = true;
        var n = e.target.value;

        var v1 = 0; // 1º dígito verificador
        for (var i = 0; i < 9; i++) {
          v1 += (10-i) * parseInt(n[i]);
        }
        var r1 = v1 % 11;
        if (r1 == 0 || r1 == 1) {
          if (n[9] != 0) validity = false;
        }
        else if (n[9] != 11 - r1) validity = false;

        var v2 = 0; // 2º dígito verificador
        for (var i = 0; i < 10; i++) {
          v2 += (11-i) * parseInt(n[i]);
        }
        var r2 = v2 % 11;
        if (r2 == 0 || r2 == 1) {
          if (n[10] != 0) validity = false;
        }
        else if (n[10] != 11 - r2) validity = false;
        
        if (validity) {
          setInitialData({...initialData, cpf: n});
          setErrors({...errors, cpf: ""});
        }
        else {
          setInitialData({...initialData, cpf: "inval"});
          setErrors({...errors, cpf: "Número de CPF inválido."})
        }
      }
      else {
        if (e.target.value == "") {
          setInitialData({...initialData, cpf: ""});
          setErrors({...errors, cpf: "Esse campo é obrigatório."});
        }
        else {
          setInitialData({...initialData, cpf: "inval"});
          setErrors({...errors, cpf: "Número de CPF inválido."});
        }
      }
  }

  // Salvar e-mail apenas se os dois digitados forem iguais
  var emailRegExp = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  function handleEmail(e) {
      var aux = e.target.value;

      if (!emailRegExp.test(aux)) {
          setErrors({...errors, email: "Email inválido.", confirmEmail: ""});
      } 
      else {
        if (aux === verEmail.email2) {
            setInitialData({...initialData, email: aux});
            setVerEmail({...verEmail, email1: aux});
            setErrors({...errors, email: "", confirmEmail: ""});
        }
        else {
            setInitialData({...initialData, email: "error"});
            setVerEmail({...verEmail, email1: aux});
            setErrors({...errors, email: "", confirmEmail: "Emails não conferem."});
        }
      }
  }
  function handleConfirmEmail(e) {
      var aux = e.target.value;

      if (aux === verEmail.email1) {
          setInitialData({...initialData, email: aux});
          setVerEmail({...verEmail, email2: aux});
          setErrors({...errors, confirmEmail: ""});
      }
      else {
          setInitialData({...initialData, email: "error"});
          setVerEmail({...verEmail, email2: aux});
          setErrors({...errors, confirmEmail: "Emails não conferem."});
      }
  }
  
  return (
    <Container>
      <h3>Dados iniciais</h3>
      
      <label htmlFor="name">Nome completo <a>*</a></label>
      <p>Conforme consta no documento de identidade.</p>
      <input 
          type="text" id="name" placeholder={formData.name}
          onChange={handleName}
      />
      {(formData.tryNext === true && (!formData.name || formData.name === "")) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> 
      : <ErrorMessage>{errors.name}</ErrorMessage>}
      
      <label htmlFor="rg">RG <a>*</a></label>
      <p>Escreva apenas os números.</p>
      <input 
          type="text" id="rg" placeholder={formData.rg}
          onChange={handleRG}
      />
      {(formData.tryNext === true && (!formData.rg || formData.rg === "")) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> 
      : <ErrorMessage>{errors.rg}</ErrorMessage>}
      
      { /* CPF obrigatório apenas para o CASDvest */ }
      <label htmlFor="cpf" id="labelCpf">{difCourse[0][idCourse].CPFTitle}</label>
      <p>Escreva apenas os números.</p>
      <input 
          type="number" id="cpf" placeholder={formData.cpf != "cpf" ? formData.cpf : null}
          onChange={handleCPF}
      />
      {(formData.tryNext === true && (!formData.cpf || formData.cpf === "") && idCourse === "casdvest") ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> 
      : <ErrorMessage>{errors.cpf}</ErrorMessage>}

      <label htmlFor="email">E-mail <a>*</a></label>
      <input 
          type="email" id="email" placeholder={formData.email != "error" ? formData.email : null}
          onChange={handleEmail}
      />
      {(formData.tryNext === true && (!formData.email || formData.email === "")) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> 
      : <ErrorMessage>{errors.email}</ErrorMessage>}

      <label htmlFor="confirmEmail">Confirmar e-mail <a>*</a></label>
      <input 
          type="email" id="confirmEmail" placeholder={formData.email != "error" ? formData.email : null}
          onChange={handleConfirmEmail}
      />
      {(formData.tryNext === true && (!formData.email || formData.email === "")) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> 
      : <ErrorMessage>{errors.confirmEmail}</ErrorMessage>}

      {(formData.tryNext === true && formData.disabledButton === true) ? 
      <GeneralErrorMessage>Corrija os erros nos campos indicados acima.</GeneralErrorMessage> : null}
    </Container>
  );
}
export default InitialDataInputs;