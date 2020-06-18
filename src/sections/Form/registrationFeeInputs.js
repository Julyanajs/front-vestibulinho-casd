import React, { useState, useContext, useEffect } from 'react';
import { Container, ErrorMessage, GeneralErrorMessage } from '../../pages/FormRegistration/styles';
import FormRegistrationContext from '../../pages/FormRegistration/context';

// Diferenças entre CASDvest e CASDinho
const difCourses = [
  {
    "casdvest": {
      text:
      <>
        <h5>Conforme previsto no <span>Item II, "Da Taxa de Inscrição"</span> do <span>Edital do Processo Seletivo de Alunos do CASDvest 2021</span>, será cobrada uma taxa de <span>R$ 10,00 (dez reais)</span> para participar do Processo Seletivo, sendo que tal valor deve ser levado, <span>em espécie</span>, pelo candidato no dia <span>no Exame Teórico</span>.</h5>
        <h5>Todavia, você pode solicitar <span>isenção do pagamento</span> da taxa de inscrição (ou seja, não ter que pagar a taxa de inscrição), sendo <span>obrigatória</span> a apresentação de uma <span>justificativa</span> no campo correspondente abaixo. As justificativas serão analisadas pela Diretoria do CASDvest e o <span>resultado dessa solicitação</span> será enviado <span>dia 1 de outubro</span> ao e-mail fornecido neste formulário e disponibilizado na central do candidato no site. Os candidatos que <span>tiverem a solicitação de isenção negada</span> devem fazer o pagamento da taxa no dia do Exame Teórico.</h5>
        <h5>Caso o <span>candidato em situação de não-isenção</span> (não participou do processo de isenção ou teve a sua isenção indeferida pela administração do curso) <span>não levar os R$10,00</span> no dia da prova, <span>a sua permanência no processo seletivo ficará pendente</span> até que o candidato pague a taxa de inscrição, em dinheiro, diretamente na <span>secretaria da sede educacional da ONG</span>, Rua Tsunessaburo Makiguti, nº 139, Floradas de São José, São José dos Campos – SP, no <span>período das 19h às 21h entre os dias 07/10/2019 e 18/10/2019. O atendimento será efetuado apenas em dias úteis.</span></h5>
      </>
    },
    "casdinho": {
      text:
      <>
        <h5>Conforme previsto no <span>Item II, "Da Taxa de Inscrição"</span> do <span>Edital do Processo Seletivo de Alunos do CASDinho 2021</span>, será cobrada uma taxa de <span>R$ 10,00 (dez reais)</span> para participar do Processo Seletivo, sendo que tal valor deve ser levado, <span>em espécie</span>, pelo candidato no dia <span>no Exame Teórico</span>.</h5>
        <h5>Todavia, você pode solicitar <span>isenção do pagamento</span> da taxa de inscrição (ou seja, não ter que pagar a taxa de inscrição), sendo <span>obrigatória</span> a apresentação de uma <span>justificativa</span> no campo correspondente abaixo. As justificativas serão analisadas pela Diretoria do CASDinho e o <span>resultado dessa solicitação</span> será enviado <span>dia 1 de outubro</span> ao e-mail fornecido neste formulário e disponibilizado na central do candidato no site. Os candidatos que <span>tiverem a solicitação de isenção negada</span> devem fazer o pagamento da taxa no dia do Exame Teórico.</h5>
        <h5>Caso o <span>candidato em situação de não-isenção</span> (não participou do processo de isenção ou teve a sua isenção indeferida pela administração do curso) <span>não levar os R$10,00</span> no dia da prova, <span>a sua permanência no processo seletivo ficará pendente</span> até que o candidato pague a taxa de inscrição, em dinheiro, diretamente na <span>secretaria da sede educacional da ONG</span>, Rua Tsunessaburo Makiguti, nº 139, Floradas de São José, São José dos Campos – SP, no <span>período das 19h às 21h entre os dias 07/10/2019 e 18/10/2019. O atendimento será efetuado apenas em dias úteis.</span></h5>
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

    if (fee === "analysis") setRegistrationFee({...registrationFee, exemptionStatus: fee});
    else if (fee === "notRequested") setRegistrationFee({...registrationFee, exemptionStatus: fee, exemptionJustification: ""});
  }

  return (
    <Container>
      <h3>Taxa de inscrição</h3>
      { difCourses[0][idCourse].text }
   
      <label htmlFor="registrationFee">Solicitação de isenção <a>*</a></label>
      <select id="registrationFee" onChange={handleSelect}>
        <option value={formData.exemptionStatus} selected disabled hidden>{formData.exemptionStatus === "analysis" ?
        "QUERO receber isenção da taxa de inscrição, ou seja, NÃO QUERO fazer o pagamento da taxa"
        : (formData.exemptionStatus === "nao" ? 
        "NÃO QUERO receber isenção da taxa de inscrição, ou seja, QUERO fazer o pagamento da taxa" : "")}</option>
        <option value=""></option>
        <option value="analysis">QUERO receber isenção da taxa de inscrição, ou seja, NÃO QUERO fazer o pagamento da taxa</option>
        <option value="notRequested">NÃO QUERO receber isenção da taxa de inscrição, ou seja, QUERO fazer o pagamento da taxa</option>
      </select>
      {(formData.tryNext === true && (!formData.exemptionStatus || formData.exemptionStatus === "")) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}
      
      {formData.exemptionStatus === "analysis" ?
      <><label htmlFor="exemptionJustification" id="labelExemptionJustification">Justificativa da solicitação de isenção <a>*</a></label>
      <p id="textExemptionJustification">Descreva brevemente o motivo da sua necessidade de isenção, ou seja, de não pagar a taxa de inscrição. (máximo 300 caracteres)</p>
      <input
          type="text" id="exemptionJustification" maxLength="300" placeholder={formData.exemptionJustification}
          onChange={e => {const newData = {...registrationFee, exemptionJustification: e.target.value}; setRegistrationFee(newData);}}
      /></> : null}
      {(formData.tryNext === true && (formData.exemptionStatus === "analysis" && (!formData.exemptionJustification || formData.exemptionJustification === ""))) ? 
      <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

      {(formData.tryNext === true && formData.disabledButton === true) ? 
      <GeneralErrorMessage>Corrija os erros nos campos indicados acima.</GeneralErrorMessage> : null}
    </Container>
  );
}
export default RegistrationFeeInputs;