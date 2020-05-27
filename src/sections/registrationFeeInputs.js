import React, { useState, useContext, useEffect } from 'react';
import { Container, ErrorMessage, GeneralErrorMessage } from '../pages/FormRegistration/styles';
import FormRegistrationContext from '../pages/FormRegistration/context';

// Diferenças entre CASDvest e CASDinho
const difCourses = [
  {
    "casdvest": {
      text:
      <>
        <text>Conforme previsto no <span>Item II, "Da Taxa de Inscrição"</span> do <span>Edital do Processo Seletivo de Alunos do CASDvest 2021</span>, será cobrada uma taxa de <span>R$ 10,00 (dez reais)</span> para participar do Processo Seletivo, sendo que tal valor deve ser levado, <span>em espécie</span>, pelo candidato no dia <span>no Exame Teórico</span>.</text>
        <text>Todavia, você pode solicitar <span>isenção do pagamento</span> da taxa de inscrição (ou seja, não ter que pagar a taxa de inscrição), sendo <span>obrigatória</span> a apresentação de uma <span>justificativa</span> no campo correspondente abaixo. As justificativas serão analisadas pela Diretoria do CASDvest e o <span>resultado dessa solicitação</span> será enviado <span>dia 1 de outubro</span> ao e-mail fornecido neste formulário e disponibilizado na central do candidato no site. Os candidatos que <span>tiverem a solicitação de isenção negada</span> devem fazer o pagamento da taxa no dia do Exame Teórico.</text>
        <text>Caso o <span>candidato em situação de não-isenção</span> (não participou do processo de isenção ou teve a sua isenção indeferida pela administração do curso) <span>não levar os R$10,00</span> no dia da prova, <span>a sua permanência no processo seletivo ficará pendente</span> até que o candidato pague a taxa de inscrição, em dinheiro, diretamente na <span>secretaria da sede educacional da ONG</span>, Rua Tsunessaburo Makiguti, nº 139, Floradas de São José, São José dos Campos – SP, no <span>período das 19h às 21h entre os dias 07/10/2019 e 18/10/2019. O atendimento será efetuado apenas em dias úteis.</span></text>
      </>
    },
    "casdinho": {
      text:
      <>
        <text>Conforme previsto no <span>Item II, "Da Taxa de Inscrição"</span> do <span>Edital do Processo Seletivo de Alunos do CASDinho 2021</span>, será cobrada uma taxa de <span>R$ 10,00 (dez reais)</span> para participar do Processo Seletivo, sendo que tal valor deve ser levado, <span>em espécie</span>, pelo candidato no dia <span>no Exame Teórico</span>.</text>
        <text>Todavia, você pode solicitar <span>isenção do pagamento</span> da taxa de inscrição (ou seja, não ter que pagar a taxa de inscrição), sendo <span>obrigatória</span> a apresentação de uma <span>justificativa</span> no campo correspondente abaixo. As justificativas serão analisadas pela Diretoria do CASDinho e o <span>resultado dessa solicitação</span> será enviado <span>dia 1 de outubro</span> ao e-mail fornecido neste formulário e disponibilizado na central do candidato no site. Os candidatos que <span>tiverem a solicitação de isenção negada</span> devem fazer o pagamento da taxa no dia do Exame Teórico.</text>
        <text>Caso o <span>candidato em situação de não-isenção</span> (não participou do processo de isenção ou teve a sua isenção indeferida pela administração do curso) <span>não levar os R$10,00</span> no dia da prova, <span>a sua permanência no processo seletivo ficará pendente</span> até que o candidato pague a taxa de inscrição, em dinheiro, diretamente na <span>secretaria da sede educacional da ONG</span>, Rua Tsunessaburo Makiguti, nº 139, Floradas de São José, São José dos Campos – SP, no <span>período das 19h às 21h entre os dias 07/10/2019 e 18/10/2019. O atendimento será efetuado apenas em dias úteis.</span></text>
      </>
    }
  }
]

function RegistrationFeeInputs({ idCourse }) {
  const [registrationFee, setRegistrationFee] = useState();
  const { formData, setFormData } = useContext(FormRegistrationContext);

  useEffect(() => setFormData({...formData, ...registrationFee}), [registrationFee, setFormData, setRegistrationFee]);

  function handleSelect(e) {
    var fee = e.target.value;

    if (fee === "sim") setRegistrationFee({...registrationFee, exemptionRequest: fee});
    else setRegistrationFee({...registrationFee, exemptionRequest: fee, justification: ""});
  }

  return (
    <Container>
      <h3>Taxa de Inscrição</h3>
      { difCourses[0][idCourse].text }
   
      <label htmlFor="registrationFee">Solicitação de isenção <ast>*</ast></label>
      <select id="registrationFee" onChange={handleSelect}>
        <option value={formData.exemptionRequest} selected disabled hidden>{formData.exemptionRequest === "sim" ?
        "QUERO receber isenção da taxa de inscrição, ou seja, NÃO QUERO fazer o pagamento da taxa"
        : (formData.exemptionRequest === "nao" ? 
        "NÃO QUERO receber isenção da taxa de inscrição, ou seja, QUERO fazer o pagamento da taxa" : "")}</option>
        <option value=""></option>
        <option value="sim">QUERO receber isenção da taxa de inscrição, ou seja, NÃO QUERO fazer o pagamento da taxa</option>
        <option value="nao">NÃO QUERO receber isenção da taxa de inscrição, ou seja, QUERO fazer o pagamento da taxa</option>
      </select>
      {(formData.tryNext === true && (!formData.exemptionRequest || formData.exemptionRequest === "")) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}
      
      {formData.exemptionRequest === "sim" ?
      <><label htmlFor="justification" id="labelJustification">Justificativa da solicitação de isenção <ast>*</ast></label>
      <p id="textJustification">Descreva brevemente o motivo da sua necessidade de isenção, ou seja, de não pagar a taxa de inscrição. (máximo 300 caracteres)</p>
      <input
          type="text" id="justification" maxLength="300" placeholder={formData.justification}
          onChange={e => {const newData = {...registrationFee, justification: e.target.value}; setRegistrationFee(newData);}}
      /></> : null}
      {(formData.tryNext === true && (formData.exemptionRequest === "sim" && (!formData.justification || formData.justification === ""))) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

      {(formData.tryNext === true && formData.disabledButton === true) ? 
      <GeneralErrorMessage>Corrija os erros nos campos indicados acima.</GeneralErrorMessage> : null}
    </Container>
  );
}
export default RegistrationFeeInputs;