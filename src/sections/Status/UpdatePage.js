import React, { useState, useContext } from 'react';
import { Container, Button, Section, Text, Explain } from '../../pages/CandidateStatus/styles';
import CandidateStatusContext from '../../pages/CandidateStatus/context';
import api from '../../services/api';

function UpdatePage({ idCourse }) {
    const { actualSection, setActualSection } = useContext(CandidateStatusContext);
    //const { candidateData, setCandidateData } = useContext(CandidateStatusContext);
    var candidateData = JSON.parse(sessionStorage.getItem('candData'));
    const [ db2TextMap, setDb2TextMap ] = useState({ name: "Nome Completo",
        rg: "RG",
        cpf: "CPF",
        email: "E-mail",
        gender: "Genero",
        birthDate: "Data de Nascimento",
        relativeName: "Nome de um responsável",
        kinship: "Parentesco do responsável",
        phone1: "Telefone 1",
        phone2: "Telefone 2",
        street: "Endereço",
        numberStreet: "Número",
        additionalAddress: "Complemento",
        neighborhood: "Bairro",
        cep: "CEP",
        city: "Cidade",
        state: "Estado",
        ifSpecialNecessity : "Possui necessidade especial?",
        whichNecessity: "Qual sua necessidade especial?",
        school: "Nome da escola",
        schooling: "Escolaridade",
        kindSchool: "Tipo de escola",

    }); 
    const final = [];
    //var handles = [];

    function printValues(obj) {
        for (var key in obj) {
            if (key === "_id" || key === "candidateStatus" || key === "__v" 
                || key === "createdAt" || key === "updatedAt" || key === "candidateNumber") continue;
            if (typeof obj[key] === "object") {
                printValues(obj[key]);   
            } else {
                //handles[key] = (e) => {candidateData[e.target.id] = e.target.value; console.log(e.target.id, candidateData[e.target.id])};
                final.push(
                    <>
                    <label htmlFor={key}>{db2TextMap[key]} <a>*</a></label>
                    <input 
                    type={typeof obj[key]} id={key} placeholder={obj[key]}
                    //onChange={(e) => setCandidateData({...candidateData, key: e.target.value})}
                    onChange={(e) => {obj[e.target.id] = e.target.value; console.log(e.target.id, obj[e.target.id])}}
                    />
                    </>
                );
            }
        }
    }
    printValues(candidateData);
    async function handleSubmit(e) {
        e.preventDefault(); 
        delete candidateData["updatedAt"]
        delete candidateData["createdAt"]
        delete candidateData["id"]
        delete candidateData["__v"]
        delete candidateData.additionalInfo["updatedAt"]
        delete candidateData.additionalInfo["createdAt"]
        delete candidateData.additionalInfo["id"]
        delete candidateData.additionalInfo["__v"]
        //delete candidateData.candidateStatus

        const updateCandidate = await api.put('/candidate/updateCandidate',
            JSON.stringify(candidateData), { headers: { 'Content-Type': 'application/json'}}  
        );
        sessionStorage.setItem('candData', JSON.stringify(candidateData));

        console.log("Candidato atualizado", updateCandidate);
        setActualSection(actualSection-1);
    }
    return (
        <>
        <h3> Atualização Cadastral </h3>
        <form onSubmit={handleSubmit}>
        {final}
        <Button>Atualizar</Button>
        <Button onClick={() => {localStorage.clear(); setActualSection(actualSection-1);}}>Voltar</Button>
        </form>
        </>
    );

}
export default UpdatePage;
