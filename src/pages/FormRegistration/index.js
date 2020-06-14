import React, { useState, useEffect } from 'react';
import FormRegistrationContext from './context';
import { Container, Button, Box, PageButton } from '../../pages/FormRegistration/styles';
import InfoForm from '../../sections/Form/infoForm';
import InitialDataInputs from '../../sections/Form/initalDataInputs';
import PersonalDataInputs from '../../sections/Form/personalDataInputs';
import PrivateSpacesInputs from '../../sections/Form/privateSpacesInputs';
import RegistrationFeeInputs from '../../sections/Form/registrationFeeInputs';
import Confirmation from '../../sections/Form/confirmation';
import FinalPage from '../../sections/Form/finalPage';

import api from '../../services/api';

const infosCourse = [
  {
    "casdvest": {
      infoTitle: "Inscrições Vestibulinho CASDvest 2021"
    },
    "casdinho": {
      infoTitle: "Inscrições Vestibulinho CASDinho 2021"
    }
  }
];

function FormRegistration({ idCourse }) {
  const [actualSection, setActualSection] = useState(0);
  const [formData, setFormData] = useState({disabledButton: false, tryNext: false});
  const [address, setAddress] = useState({});
  const [hasRGCandidate, setHasRGCandidate] = useState(false);
  const sizes=["0%", "16.7%", "33.3%", "50%", "66.7%", "83.3%", "100%"];

  const sections = [
                    <InfoForm idCourse={idCourse} />, 
                    <InitialDataInputs idCourse={idCourse}/>,
                    <PersonalDataInputs idCourse={idCourse}/>, 
                    <PrivateSpacesInputs idCourse={idCourse}/>, 
                    <RegistrationFeeInputs idCourse={idCourse}/>,
                    <Confirmation/>,
                    <FinalPage/>
                  ];

  useEffect(() => {
    if (formData.disabledButton && formData.disabledButton === true) {
      if (actualSection === 0)
          setFormData({...formData, disabledButton: false});

      if (actualSection === 1
          && !(!formData.cpf && idCourse == "casdvest") && formData.cpf !== "inval" // CPF obrigatório apenas para CASDvest
          && formData.email && formData.email !== "error"
          && formData.name
          && formData.rg) {
            setFormData({...formData, disabledButton: false, blockPage1: false });
          }
      
      if (actualSection === 2 // Validações de campos normais obrigatórios
          && formData.address
          && formData.birthDate && formData.birthDate !== "inval"
          && formData.gender
          && formData.ifSpecialNecessity
          && formData.kindSchool
          && formData.kinship
          && formData.phone1
          // phone2 --> dado não obrigatório
          && formData.relativeName
          && formData.school
          && formData.schooling
          && formData.wayPS) {
            if (formData.address.cep
              // address.additionalAddress --> dado não obrigatório
              && formData.address.city
              && formData.address.neighborhood
              && formData.address.numberStreet
              && formData.address.state
              && formData.address.street) {
                // Validações de campos condicionais obrigatórios
                if (!((formData.school === "Outra" && (!formData.otherSchool || formData.otherSchool === ""))
                    || (formData.wayPS === "Outro" && (!formData.otherWay || formData.otherWay === ""))
                    || (formData.kinship === "Outro" && (!formData.otherKinship || formData.otherKinship === ""))
                    || (formData.ifSpecialNecessity === "Sim" && (!formData.whichNecessity || formData.whichNecessity === "")))) {
                      setFormData({...formData, disabledButton: false, blockPage2: false }); 
                    }
            }
      } 

      if (actualSection === 3 && formData.privateSpace && formData.privateSpace !== "") {
        setFormData({...formData, disabledButton: false, blockPage3: false });
      }

      if (actualSection === 4 && formData.exemptionRequest) {
        if ((formData.exemptionRequest === "nao") 
            || (formData.exemptionRequest === "sim" && formData.justification && formData.justification !== "")) {
                setFormData({...formData, disabledButton: false, blockPage4: false });
            }
      }

    } else {
      if (actualSection === 1
        && ((!formData.cpf && idCourse == "casdvest") || formData.cpf === "inval"
        || !formData.email || formData.email === "error"
        || !formData.name
        || !formData.rg)
      ) {
        setFormData({...formData, disabledButton: true, blockPage1: true });
      }
      if (actualSection === 2) {
        if (!formData.address
          || !formData.birthDate || formData.birthDate === "inval"
          || !formData.gender
          || !formData.ifSpecialNecessity
          || !formData.kindSchool
          || !formData.kinship
          || !formData.phone1
          || !formData.relativeName
          || !formData.school
          || !formData.schooling
          || !formData.wayPS
          || (formData.school === "Outra" && (!formData.otherSchool || formData.otherSchool === ""))
          || (formData.wayPS === "Outro" && (!formData.otherWay || formData.otherWay === ""))
          || (formData.kinship === "Outro" && (!formData.otherKinship || formData.otherKinship === ""))
          || (formData.ifSpecialNecessity === "Sim" && (!formData.whichNecessity || formData.whichNecessity === ""))) {
            setFormData({...formData, disabledButton: true, blockPage2: true });
        }
        else if(!formData.address.cep
          || !formData.address.city
          || !formData.address.neighborhood
          || !formData.address.numberStreet
          || !formData.address.state
          || !formData.address.street) {
            setFormData({...formData, disabledButton: true, blockPage2: true });
        }
      } 
      if (actualSection === 3 && (!formData.privateSpace || formData.privateSpace === "")) {
        setFormData({...formData, disabledButton: true, blockPage3: true });
      }
      if (actualSection === 4 && 
        (!formData.exemptionRequest || formData.exemptionRequest === ""
        || (formData.exemptionRequest === "sim" && !formData.justification))) {
            setFormData({...formData, disabledButton: true, blockPage4: true });
      }
    }
  }, [formData]);

  function handlePreviousButton() {
    setActualSection(actualSection-1);
    setFormData({...formData, disabledButton: false, tryNext: false});
  }

  async function handleNextButton() {
    if (!formData.disabledButton && formData.disabledButton === false) {
      if(actualSection === 1){
        // const respGET = await api.get(`/candidate/checkCandidate?rg=${formData.rg}`);
        // if(!respGET.data){
           setActualSection(actualSection+1);
           console.log("Candidato não encontrado")
        // }
        // else
          //  alert("Este RG já está registrado!")
      }
      
      else if (actualSection < sections.length-1) {
        setActualSection(actualSection+1);
      }

      setFormData({...formData, tryNext: false});
    }
    else setFormData({...formData, tryNext: true});
  }

  function handlePageButton(e) {
    e.preventDefault();
    if (actualSection !== 6 && !formData.disabledButton && formData.disabledButton === false) {
      switch(e.target.className) {
        case "page0": setActualSection(0); break;
        case "page1": setActualSection(1); break;
        case "page2": if(!formData.blockPage1 && formData.blockPage1 === false) 
                        setActualSection(2); 
                      break;
        case "page3": if(!formData.blockPage1 && formData.blockPage1 === false
                        && !formData.blockPage2 && formData.blockPage2 === false)
                        setActualSection(3); 
                      break;
        case "page4": if(!formData.blockPage1 && formData.blockPage1 === false
                        && !formData.blockPage2 && formData.blockPage2 === false 
                        && !formData.blockPage3 && formData.blockPage3 === false)
                        setActualSection(4); 
                      break;
        case "page5": if(!formData.blockPage1 && formData.blockPage1 === false
                        && !formData.blockPage2 && formData.blockPage2 === false 
                        && !formData.blockPage3 && formData.blockPage3 === false
                        && !formData.blockPage4 && formData.blockPage4 === false)
                        setActualSection(5); 
                      break;
      }
      setFormData({...formData, tryNext: false});
    }
    else setFormData({...formData, tryNext: true});
  }

  document.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      //if(!formData.disabledButton && formData.disabledButton === false) handleNextButton();
    }
  });

  async function handleSubmit(e) {
    e.preventDefault(); 
    setFormData({...formData, disabledButton: true });
    console.log('formData', formData);
    
    if (actualSection === 0) {
      console.log(`VERIFICAR NO BANCO SE JÁ EXISTE O RG ${formData.rg} CADASTRADO`);
    }
    
    if(actualSection === sections.length-2) {
        console.log("oi");
        const { name, rg, cpf, email, privateSpace, registrationFee } = formData; // ------- [TODO] IR ADICIONANDO CAMPOS QDE CADA SECTION QUE SERÃO SALVOS
        const dataToSave = { name, rg, cpf, email, privateSpace, registrationFee };
        console.log('DADOS A SEREM SALVOS NO BANCO', formData);
        
        // const newCandidate = await api.post('/candidate/createCandidate',
          // JSON.stringify(formData), { headers: { 'Content-Type': 'application/json'}}  
        // );
        // console.log("Novo candidato Criado", newCandidate);

        setActualSection(6);
    }
  }

  return (
    <FormRegistrationContext.Provider value={{ formData, setFormData, address, setAddress }}>
      <Container>
        <h1>{infosCourse[0][idCourse].infoTitle}</h1>
        <Box size={sizes[actualSection]}></Box>
        <PageButton actualSection={actualSection}>
          <button className="page0" onClick={handlePageButton}>Início</button>
          <button className="page1" onClick={handlePageButton}>Dados iniciais</button>
          <button className="page2" onClick={handlePageButton}>Dados pessoais</button>
          <button className="page3" onClick={handlePageButton}>Vagas privativas</button>
          <button className="page4" onClick={handlePageButton}>Taxa de inscrição</button>
          <button className="page5" onClick={handlePageButton}>Confirmação</button>
        </PageButton>
        <form onSubmit={handleSubmit}>
          {sections[actualSection]}
          {actualSection !== 0 && actualSection !== 6 && <Button className="btn" onClick={handlePreviousButton} id="previousButton">Anterior</Button>}
          {actualSection !== 5 && actualSection !== 6 && <Button className="btn" onClick={handleNextButton} checkDisabled={formData.disabledButton} id="nextButton">Próximo</Button>}
          {actualSection == 5 && <Button className="btn" id="sendButton">Enviar</Button>}
        </form>
        {hasRGCandidate === true ? <p>Esse RG já foi cadastrado!</p> : null}

        {console.log(formData)}
      </Container>
    </FormRegistrationContext.Provider>
  );
}
export default FormRegistration;