import React, { useState, useContext, useEffect } from 'react';
import { Container, ErrorMessage, GeneralErrorMessage } from '../../pages/FormRegistration/styles';
import FormRegistrationContext from '../../pages/FormRegistration/context';

const difCourse = [
  {
    "casdvest": {
      text:
      <>
        <h5>Conforme previsto no <span>Item VII, "Das Ações Afirmativas"</span> do <span>Edital do Processo Seletivo de Alunos do CASDvest 2021</span>, com o objetivo de aproximar o corpo discente do curso da real distribuição étnica da cidade de São José dos Campos, <span>130 vagas</span> durante a convocação para a matrícula serão destinadas a <span>candidatos pretos, pardos e indígenas (PPI)</span> aprovados no Processo Seletivo.</h5>
        <h5>Portanto, você pode optar por realizar autodeclaração como branco, preto, pardo, amarelo ou indígena.</h5>
        <h5>Além disso, no ato da <span>Entrevista Socioeconômica</span> haverá uma <span>formalização da autodeclaração</span>, assinada pelo candidato ou pelo responsável em caso de candidato menor de idade.</h5>
      </>
    },
    "casdinho": {
      text:
      <>
        <h5>Conforme previsto no <span>Item VII, "Das Ações Afirmativas"</span> do <span>Edital do Processo Seletivo de Alunos do CASDinho 2021</span>, com o objetivo de aproximar o corpo discente do curso da real distribuição étnica da cidade de São José dos Campos, <span>60 vagas (45 para alunos que estejam no 8º ano em 2020 e 15 para alunos que estejam no 7º ano em 2019)</span> durante a convocação para a matrícula serão destinadas a <span>candidatos pretos, pardos e indígenas (PPI)</span> aprovados no Processo Seletivo.</h5>
        <h5>Portanto, você pode optar por realizar autodeclaração como branco, preto, pardo, amarelo ou indígena.</h5>
        <h5>Além disso, no ato da <span>Entrevista Socioeconômica</span> haverá uma <span>formalização da autodeclaração</span>, assinada pelo responsável.</h5>
      </>
    }
  }
]

function PrivateSpacesInputs({ idCourse }) {
  const [privateSpace, setPrivateSpace] = useState();
  const { formData, setFormData } = useContext(FormRegistrationContext);

  useEffect(() => setFormData({...formData, ...privateSpace}), [privateSpace, setFormData, setPrivateSpace]);

  function handleSelect(e) {
    setPrivateSpace({...privateSpace, privateSpace: e.target.value});
  }

  return (
    <Container>
      <h3>Vagas privativas</h3>
      { difCourse[0][idCourse].text }
   
      <label htmlFor="privateSpace">Como você se autodeclara? <a>*</a></label>
      <select id="privateSpace" onChange={handleSelect}>
        <option value={formData.privateSpace} selected disabled hidden>{formData.privateSpace}</option>
        <option value=""></option>
        <option value="Amarelo(a)">Amarelo(a)</option>
        <option value="Branco(a)">Branco(a)</option>
        <option value="Indígena">Indígena</option>
        <option value="Pardo(a)">Pardo(a)</option>
        <option value="Preto(a)">Preto(a)</option>
      </select>
      {(formData.tryNext === true && (!formData.privateSpace || formData.privateSpace === "")) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

      {(formData.tryNext === true && formData.disabledButton === true) ? 
      <GeneralErrorMessage>Corrija os erros nos campos indicados acima.</GeneralErrorMessage> : null}
    </Container>
  );
}
export default PrivateSpacesInputs;