import React, { useState, useContext } from 'react';
import { Button, Section, Text, Explain } from '../../pages/CandidateStatus/styles';
import CandidateStatusContext from '../../pages/CandidateStatus/context';

function Dashboard({ idCourse }) {
  const { actualSection, setActualSection } = useContext(CandidateStatusContext);
  //TODO: antes de montar a estrutura do componente - puxar dados do banco com useEffect
  //ver sobre ciclos de vida do react e uso do hook useEffect

  //lembrar de inserir um botão de logout - cancelar sessão no localStorage

  // Variavel para indicar momento atual do Processo Seletivo
  // 0 -> Prova ainda vai acontecer
  // 1 -> Prova aconteceu, resultado ainda não foi divulgado
  // 2 -> Resultado da prova já foi divulgado
  // 3 -> Entrevista Socioeconômica já aconteceu, resultado não divulgado
  // 4 -> Resultado da Entrevista Socioeconômica divulgado, mas não da matrícula
  // 5 -> Chamada para matrícula feita
  const [processSituation, setProcessSituation] = useState("0");

  // Informações de status do candidato
  // Ajustar para buscar no DB
  const [status, setStatus] = useState({
    name: "NOME DE TESTE",
    registrationStatus: true,
    exemptionStatus: "exempted",
    roomId: "1G1",
    testPresence: true,
    grade: 40,
    privateSpace: true,
    esStatus: true,
    esPresence: true,
    esDate: "11 de novembro de 2020",
    esTime: "19:15",
    esResult: true,
    enrollStatus: false
  });

  const [buttons, setButtons] = useState({ bttnRegistrationStatus: false, bttnExemption: false, bttnRoom: false, bttnTestPresence: false, bttnGrade: false, bttnPrivateSpace: false, bttnEsStatus: false, bttnEsPresence: false, bttnEsResult: false, bttnEnroll: false });

  const infosCourse = [
    {
      "casdvest": {
        course: "CASDvest",
        date: "DD de mês",
        time: "14h",
        place: <>na <span>UNIP</span> (Rodovia Presidente Dutra, km 157 - 5 - Pista Sul, São José dos Campos-SP, 12240-420)</>,
        numberQuestions: 60,
        testResultDate: "DD de mês",
        esResultDate: "DD de mês",
        enrollResultDate: "DD de mês",
        privateSpaces: 130
      },
      "casdinho": {
        course: "CASDinho",
        date: "DD de mês",
        time: "14h",
        place: <>na <span>UNIP</span> (Rodovia Presidente Dutra, km 157 - 5 - Pista Sul, São José dos Campos-SP, 12240-420)</>,
        numberQuestions: 60,
        testResultDate: "DD de mês",
        esResultDate: "DD de mês",
        enrollResultDate: "DD de mês",
        privateSpaces: 45
      }
    }
  ];
  const infos = infosCourse[0][idCourse];

  // Função para coordenar os botões de explicação
  function handleButton(e) {
    e.preventDefault();
    switch (e.target.className) {
      case "bttnRegistrationStatus": setButtons({ ...buttons, bttnRegistrationStatus: !(buttons.bttnRegistrationStatus) }); break;
      case "bttnExemption": setButtons({ ...buttons, bttnExemption: !(buttons.bttnExemption) }); break;
      case "bttnRoom": setButtons({ ...buttons, bttnRoom: !(buttons.bttnRoom) }); break;
      case "bttnTestPresence": setButtons({ ...buttons, bttnTestPresence: !(buttons.bttnTestPresence) }); break;
      case "bttnGrade": setButtons({ ...buttons, bttnGrade: !(buttons.bttnGrade) }); break;
      case "bttnPrivateSpace": setButtons({ ...buttons, bttnPrivateSpace: !(buttons.bttnPrivateSpace) }); break;
      case "bttnEsStatus": setButtons({ ...buttons, bttnEsStatus: !(buttons.bttnEsStatus) }); break;
      case "bttnEsPresence": setButtons({ ...buttons, bttnEsPresence: !(buttons.bttnEsPresence) }); break;
      case "bttnEsResult": setButtons({ ...buttons, bttnEsResult: !(buttons.bttnEsResult) }); break;
      case "bttnEnroll": setButtons({ ...buttons, bttnEnroll: !(buttons.bttnEnroll) }); break;
    }
  }

  return (
    <>
      {/* Campos temporários para feedback */}

      <label>Selecionar visualização</label>
      <select onChange={e => { setProcessSituation(e.target.value) }}>
        <option value={"0"}>Antes da prova</option>
        <option value={"1"}>Depois da prova, antes da divulgação do resultado</option>
        <option value={"2"}>Depois da divulgação do resultado, antes da ES</option>
        <option value={"3"}>Depois da ES</option>
        <option value={"4"}>Depois do resultado da ES</option>
        <option value={"5"}>Depois da convocação para matrícula</option>
      </select>

      <label>Selecionar presença na prova</label>
      <select onChange={e => {
        if (e.target.value === "true") setStatus({ ...status, testPresence: true });
        else if (e.target.value === "false") setStatus({ ...status, testPresence: false })
      }}>
        <option value={"true"}>Presente</option>
        <option value={"false"}>Ausente</option>
      </select>

      <label>Selecionar resultado da prova</label>
      <select onChange={e => {
        if (e.target.value === "true") setStatus({ ...status, esStatus: true });
        else if (e.target.value === "false") setStatus({ ...status, esStatus: false })
      }}>
        <option value={"true"}>Passou</option>
        <option value={"false"}>Não passou</option>
      </select>

      <label>Selecionar presença na ES</label>
      <select onChange={e => {
        if (e.target.value === "true") setStatus({ ...status, esPresence: true });
        else if (e.target.value === "false") setStatus({ ...status, esPresence: false })
      }}>
        <option value={"true"}>Presente</option>
        <option value={"false"}>Ausente</option>
      </select>

      {/* Fim dos campos temporários */}

      <Section>
        <h4>Nome do candidato:</h4>
        <Text>{status.name}</Text>
      </Section>

      {processSituation === "0" ?

        <><Section>
          <h4>Situação da inscrição:</h4>
          {status.registrationStatus === true ?
            <Text>Confirmada.</Text> :
            <Text>Não confirmada.</Text>}
          <button className="bttnRegistrationStatus" onClick={handleButton}>?</button>
        </Section>

          {buttons.bttnRegistrationStatus ?
            <Explain>O candidato com a inscrição <span>confirmada</span> já está cadastrado no Processo Seletivo.
      Se ocorreu algum problema com a sua inscrição, entre em contato com a administração do curso.</Explain>
            : <></>}

          <Section>
            <h4>Solicitação de isenção:</h4>
            {status.exemptionStatus === "exempted" ?
              <Text>Isento.</Text>
              : (status.exemptionStatus === "notExempted" ?
                <Text>Não isento.</Text>
                : (status.exemptionStatus === "notRequired" ?
                  <Text>Isenção não solicitada.</Text>
                  : (status.exemptionStatus === "analysis" ?
                    <Text>Em análise.</Text>
                    : <></>)))}
            <button className="bttnExemption" onClick={handleButton}>?</button>
          </Section>

          {buttons.bttnExemption ?
            <><Explain>Para participação no Processo Seletivo, é necessário o pagamento da taxa de inscrição de R$10,00 (dez reais), conforme previsto em edital, no dia da prova teórica.
      Entretanto, no momento da inscrição foi fornecida a opção de pedir <span>isenção</span> do pagamento, ou seja, a não necessidade de pagamento da taxa.</Explain>
              <Explain>Com isso, os candidatos <span>isentos</span> não precisam fazer o pagamento da taxa de inscrição.</Explain>
              <Explain>Os candidatos <span>não isentos</span> tiveram seu pedido de isenção negado.</Explain>
              <Explain>O resultado dos pedidos de isenção será divulgado no site e nas páginas do curso no dia X de x.</Explain></>
            : <></>}

          <Section>
            <h4>Informações sobre a prova:</h4>
          </Section>

          <Explain>A prova teórica do {infos.course} será realizada no <span>dia {infos.date}</span>, às <span>{infos.time}</span>, {infos.place}.
      Mais informações podem ser encontradas no nosso site e nas redes sociais.</Explain>

          <Section>
            <h4>Sala de prova:</h4>
            {status.roomId === "undefined" ? <Text>Não divulgado.</Text> : <Text>{status.roomId}</Text>}
            <button className="bttnRoom" onClick={handleButton}>?</button>
          </Section>

          {buttons.bttnRoom ?
            <Explain>A lista de salas de prova será divulgada até 1 (um) dia antes da data do Vestibulinho no site e nas redes sociais.
      A localização das salas estará indicada no local da prova no dia de sua realização.</Explain>
            : <></>}

          <Section>
            <h4>Deseja editar sua inscrição?</h4>
          </Section>

          <Explain>Ao clicar no botão abaixo, você pode visualizar e mudar os dados que cadastrou no momento da sua inscrição.</Explain>

          <Button>Editar</Button>

        </> :

        (status.testPresence === false ?

          <><Section>
            <h4>Participação na prova teórica:</h4>
            <Text>Ausente.</Text>
            <button className="bttnTestPresence" onClick={handleButton}>?</button>
          </Section>

            {buttons.bttnTestPresence ?
              <Explain>Os candidatos registrados como <span>presentes</span> fizeram a prova teórica e terão seu resultado divulgado. Os candidatos <span>ausentes</span> não fizeram a prova teórica e não participam mais do Processo Seletivo.</Explain>
              : <></>}

          </> :

          (processSituation === "1" ?

            <><Section>
              <h4>Participação na prova teórica:</h4>
              <Text>Presente.</Text>
              <button className="bttnTestPresence" onClick={handleButton}>?</button>
            </Section>

              {buttons.bttnTestPresence ?
                <Explain>Os candidatos registrados como <span>presentes</span> fizeram a prova teórica e terão seu resultado divulgado. Os candidatos <span>ausentes</span> não fizeram a prova teórica e não participam mais do Processo Seletivo.</Explain>
                : <></>}

              {status.testPresence === true ?

                <><Section>
                  <h4>Nota da prova teórica:</h4>
                  <Text>Em correção.</Text>
                </Section>

                  <Explain>O resultado da prova teórica será divulgado no dia {infos.testResultDate}.</Explain>

                </> : <></>}

            </> : <></>))}

      {((processSituation === "2" || processSituation === "3" || processSituation === "4" || processSituation === "5") && status.testPresence === true) ?

        <><Section>
          <h4>Nota da prova teórica:</h4>
          <Text>{status.grade}</Text>
          <button className="bttnGrade" onClick={handleButton}>?</button>
        </Section>

          {buttons.bttnGrade ?
            <Explain>A prova teórica teve um total de {infos.numberQuestions} questões.</Explain>
            : <></>}

          <Section>
            <h4>Vaga privativa?</h4>
            {status.privateSpace ? <Text>Sim.</Text> : <Text>Não</Text>}
            <button className="bttnPrivateSpace" onClick={handleButton}>?</button>
          </Section>

          {buttons.bttnPrivateSpace ?
            <Explain>Conforme previsto no edital do Processo Seletivo, {infos.privateSpaces} vagas são destinadas a candidatos autodeclarados pretos, pardos ou indígenas no momento da inscrição.</Explain>
            : <></>}

          <Section>
            <h4>Resultado de convocação para a Entrevista Socioeconômica:</h4>
            {status.esStatus ? <Text>Convocado.</Text> : <Text>Não convocado.</Text>}
            <button className="bttnEsStatus" onClick={handleButton}>?</button>
          </Section>

          {buttons.bttnEsStatus ?
            <><Explain>A Entrevista Socioeconômica é a segunda etapa do Processo Seletivo e consiste na coleta de documentos para comprovar a situação socioeconômica do candidato, conforme previsto em edital.
      A partir da nota de corte, são definidos os candidatos aprovados para essa etapa. Entretanto, destacamos que a convocação não significa aprovação para entrada no curso.</Explain>
              <Explain>Os candidatos <span>convocados</span> atingiram a nota necessária na prova teórica.</Explain></>
            : <></>}

        </> : <></>}

      {(processSituation === "2" && status.testPresence === true && status.esStatus === true) ?

        <><Section>
          <h4>Informações sobre a Entrevista Socioeconômica:</h4>
        </Section>

          <Explain>Os candidatos convocados para a Entrevista Socioeconômica devem comparecer à sede do curso (Rua Tsunessaburo Makiguti, 139, Floradas de São José, São José dos Campos - SP, 12230-084) no dia e horário especificados abaixo para entrega dos documentos.</Explain>

          <Section>
            <h4>Data:</h4>
            {status.esDate === "undefined" ? <Text>Ainda não divulgado.</Text> : <Text>{status.esDate}</Text>}
          </Section>

          <Section>
            <h4>Horário:</h4>
            {status.esTime === "undefined" ? <Text>Ainda não divulgado.</Text> : <Text>{status.esTime}</Text>}
          </Section>

        </> : <></>}

      {(status.esStatus === true && status.esPresence === false && (processSituation === "3" || processSituation === "4" || processSituation === "5")) ?

        <><Section>
          <h4>Participação na Entrevista Socioeconômica:</h4>
          <Text>Ausente.</Text>
          <button className="bttnEsPresence" onClick={handleButton}>?</button>
        </Section>

          {buttons.bttnEsPresence ?
            <Explain>Os candidatos registrados como <span>presentes</span> entregaram seus documentos na Entrevista Socioeconômica e terão seu resultado divulgado. Os candidatos <span>ausentes</span> não compareceram à Entrevista e não participam mais do Processo Seletivo.</Explain>
            : <></>}

        </> : <></>}

      {(processSituation === "3" && status.testPresence === true && status.esStatus === true && status.esPresence === true) ?

        <><Section>
          <h4>Participação na Entrevista Socioeconômica:</h4>
          <Text>Presente.</Text>
          <button className="bttnEsPresence" onClick={handleButton}>?</button>
        </Section>

          {buttons.bttnEsPresence ?
            <Explain>Os candidatos registrados como <span>presentes</span> entregaram seus documentos na Entrevista Socioeconômica e terão seu resultado divulgado. Os candidatos <span>ausentes</span> não compareceram à Entrevista e não participam mais do Processo Seletivo.</Explain>
            : <></>}

          {status.esPresence === true ?

            <><Section>
              <h4>Resultado da Entrevista Socioeconômica:</h4>
              <Text>Não divulgado.</Text>
              <button className="bttnEsResult" onClick={handleButton}>?</button>
            </Section>

              {buttons.bttnEsResult ?
                <><Explain>Os candidatos aprovados na Entrevista Socioeconômica se encaixam no perfil socioeconômico estipulado para o curso e estão aptos para serem convocados.
      Entretanto, essa aprovação não implica em aprovação direta para o curso. Os candidatos aprovados serão classificados de acordo com a nota na prova teórica e convocados para matrícula de acordo com a quantidade de vagas do curso.</Explain>
                  <Explain>Os resultados serão divulgados no dia {infos.esResultDate}.</Explain></>
                : <></>}

            </> : <></>}

        </> : <></>}

      {(processSituation === "4" && status.testPresence === true && status.esStatus === true && status.esPresence === true) ?

        <><Section>
          <h4>Resultado da Entrevista Socioeconômica:</h4>
          {status.esResult ? <Text>Aprovado.</Text> : <Text>Reprovado.</Text>}
          <button className="bttnEsResult" onClick={handleButton}>?</button>
        </Section>

          {buttons.bttnEsResult ?
            <Explain>Os candidatos aprovados na Entrevista Socioeconômica se encaixam no perfil socioeconômico estipulado para o curso e estão aptos para serem convocados.
            Entretanto, essa aprovação não implica em aprovação direta para o curso. Os candidatos aprovados serão classificados de acordo com a nota na prova teórica e convocados para matrícula de acordo com a quantidade de vagas do curso.
      </Explain>
            : <></>}

          <Section>
            <h4>Resultado de convocação para matrícula:</h4>
            <Text>Não divulgado.</Text>
            <button className="bttnEnroll" onClick={handleButton}>?</button>
          </Section>

          {buttons.bttnEnroll ?
            <><Explain>Os candidatos convocados devem comparecer na sede do curso (Rua Tsunessaburo Makiguti, 139, Floradas de São José, São José dos Campos - SP, 12230-084) no dia e horário a serem divulgados no site e nas redes sociais do curso para realizarem sua matrícula.
      De acordo com a quantidade de alunos matriculados e a quantidade de vagas do curso, novas chamadas de convocação podem ser realizadas.</Explain>
              <Explain>A 1ª chamada será realizada no dia {infos.enrollResultDate}.</Explain></>
            : <></>}

        </> : <></>}

      {(processSituation === "5" && status.testPresence === true && status.esStatus === true && status.esPresence === true) ?

        <><Section>
          <h4>Resultado de convocação para matrícula:</h4>
          {status.enrollStatus ? <Text>Convocado.</Text> : <Text>Não convocado.</Text>}
          <button className="bttnEnroll" onClick={handleButton}>?</button>
        </Section>

          {buttons.bttnEnroll ?
            <Explain>Os candidatos convocados devem comparecer na sede do curso (Rua Tsunessaburo Makiguti, 139, Floradas de São José, São José dos Campos - SP, 12230-084) no dia e horário a serem divulgados no site e nas redes sociais do curso para realizarem sua matrícula.
              De acordo com a quantidade de alunos matriculados e a quantidade de vagas do curso, novas chamadas de convocação podem ser realizadas.
            </Explain>
            : <></>}

        </> : <></>}

      <Button onClick={() => {localStorage.clear(); setActualSection(actualSection-1);}}>Sair</Button>

    </>
  );
}

export default Dashboard;
