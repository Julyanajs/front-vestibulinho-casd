import React from 'react';
import { Container } from '../../pages/FormRegistration/styles';

const infosCourse = [
  {
    "casdvest": {
      infoText: 
      <>
        <h5>Este é o formulário de inscrição para o <span>Processo Seletivo de Alunos do CASDvest</span> para o ano de <span>2021</span>. Para completar a inscrição, é <span>necessário preencher este formulário até o fim</span>.</h5>
        <h5>O CASDvest é um curso pré-vestibular de caráter assistencialista, voltado à preparação para vestibulares como a FUVEST, UNICAMP, UNESP e o ENEM. Oferecemos ensino gratuito para jovens em situação de vulnerabilidade socioeconômica na região do Vale do Paraíba. Se você é formado no Ensino Médio ou cursará o 3º ano do Ensino Médio em 2021, não deixe de se inscrever!</h5>
        <h5>Antes de continuar sua inscrição, é importante que você leia o <span>edital do Processo Seletivo</span>. Nele estão todas as informações necessárias quanto aos cursos fornecidos e etapas do processo. O documento pode ser acessado no seguinte link: <a target="a_blank" href="https://cursosantosdumont.org.br/wp-content/uploads/2019/06/Edital-CASDvest-2019-20.pdf">https://cursosantosdumont.org.br/wp-content/uploads/2019/06/Edital-CASDvest-2019-20.pdf</a>.</h5>
      </>
    },
    "casdinho": {
      infoText: 
      <>
        <h5>Este é o formulário de inscrição para o <span>Processo Seletivo de Alunos do CASDinho</span> para o ano de <span>2021</span>. Para completar a inscrição, é <span>necessário preencher este formulário até o fim</span>.</h5>
        <h5>O CASDinho é um curso de caráter assistencialista, voltado à preparação para os concursos e escolas de Ensino Médio de qualidade, como o Colégio Embraer Juarez Wanderley e a ETEC. Oferecemos ensino gratuito para jovens em situação de vulnerabilidade socioeconômica na região do Vale do Paraíba. Se você cursará o 8º ou 9º ano do Ensino Fundamental em 2021, não deixe de se inscrever!</h5>
        <h5>Antes de continuar sua inscrição, é importante que você leia o <span>edital do Processo Seletivo</span>. Nele estão todas as informações necessárias quanto aos cursos fornecidos e etapas do processo. O documento pode ser acessado no seguinte link: <a target="a_blank" href="https://cursosantosdumont.org.br/wp-content/uploads/2019/07/Edital-CASDinho-2019-20-1.pdf">https://cursosantosdumont.org.br/wp-content/uploads/2019/07/Edital-CASDinho-2019-20-1.pdf</a>.</h5>
      </>
    }
  }
];

function InfoForm({ idCourse }) {
  const infos = infosCourse[0][idCourse];
  return (
    <Container>
        <h3>Início</h3>
        {infos.infoText}
    </Container>
  );
}
export default InfoForm;