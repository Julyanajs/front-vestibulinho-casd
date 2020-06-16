import React, { useState, useContext, useEffect } from 'react';
import { Container, ErrorMessage, GeneralErrorMessage } from '../../pages/FormRegistration/styles';
import FormRegistrationContext from '../../pages/FormRegistration/context';

// Diferenças entre CASDvest e CASDinho
const difCourse = [
    {
        "casdvest": {
            // Pergunta de escolaridade (legenda e opções)
            schoolingText:
                <p>O Processo Seletivo do CASDvest destina-se a alunos que já tenham concluído ou que concluirão o Ensino Médio em 2020.</p>,
            schoolingOptions:
            <>
                <option value="Ensino Médio completo">Ensino Médio completo</option>
                <option value="Cursando o 3º ano do Ensino Médio em 2020">Cursando o 3º ano do Ensino Médio em 2020</option>
                <option value="Cursando o 2º ano do Ensino Médio em 2020">Cursando o 2º ano do Ensino Médio em 2020</option>
            </>,
            // Pergunta de tipo de escola (legenda)
            kindSchoolText:
                <p>Considere a escola em que você concluiu ou concluirá o Ensino Médio.</p>,
            // Pergunta de escola (legenda e opções)
            schoolText:
                <p>Escolha a escola em que você concluiu ou concluirá o Ensino Médio.</p>,
            schoolOptions:
            <>
                <option value="ADVENTISTA DE SAO JOSE DOS CAMPOS COLEGIO">ADVENTISTA DE SAO JOSE DOS CAMPOS COLEGIO</option>
                <option value="ALCEU MAYNARD ARAUJO PROFESSOR">ALCEU MAYNARD ARAUJO PROFESSOR</option>
                <option value="ALPHA LUMEN INSTITUTO">ALPHA LUMEN INSTITUTO</option>
                <option value="ANA CANDIDA DE BARROS MOLINA PROFESSORA">ANA CANDIDA DE BARROS MOLINA PROFESSORA</option>
                <option value="ANCHIETA COLEGIO">ANCHIETA COLEGIO</option>
                <option value="ANTONIO TEIXEIRA FERNANDES COLEGIO TECNICO">ANTONIO TEIXEIRA FERNANDES COLEGIO TECNICO</option>
                <option value="AQUARIUS UNIVAP COLEGIO">AQUARIUS UNIVAP COLEGIO</option>
                <option value="ARMANDO D OLIVEIRA COBRA">ARMANDO D OLIVEIRA COBRA</option>
                <option value="AYR PICANCO BARBOSA DE ALMEIDA PROFESSORA">AYR PICANCO BARBOSA DE ALMEIDA PROFESSORA</option>
                <option value="BENEDITO MATARAZZO DEPUTADO">BENEDITO MATARAZZO DEPUTADO</option>
                <option value="CASSIANO RICARDO COLEGIO ENSINO MEDIO">CASSIANO RICARDO COLEGIO ENSINO MEDIO</option>
                <option value="CENTRO ESCOLAR VALE DO PARAIBA CENTRO EDUCACAO OBJETIVO">CENTRO ESCOLAR VALE DO PARAIBA CENTRO EDUCACAO OBJETIVO</option>
                <option value="COC SISTEMA DE EDUCACAO">COC SISTEMA DE EDUCACAO</option>
                <option value="COLEGIO JOSEENSE">COLEGIO JOSEENSE</option>
                <option value="COLÉGIO PLANCK">COLÉGIO PLANCK</option>
                <option value="CONEXAO DE ENSINO INSTITUTO">CONEXAO DE ENSINO INSTITUTO</option>
                <option value="DIACONO HAMILTON BONTORIM DE SOUZA PROFESSOR">DIACONO HAMILTON BONTORIM DE SOUZA PROFESSOR</option>
                <option value="DINORA PEREIRA RAMOS BRITO PROFESSORA">DINORA PEREIRA RAMOS BRITO PROFESSORA</option>
                <option value="DIRCE ELIAS PROFESSORA">DIRCE ELIAS PROFESSORA</option>
                <option value="DOM BOSCO COLEGIO">DOM BOSCO COLEGIO</option>
                <option value="DORIVAL MONTEIRO DE OLIVEIRA PROFESSOR">DORIVAL MONTEIRO DE OLIVEIRA PROFESSOR</option>
                <option value="EDERA IRENE PEREIRA DE OLIVEIRA CARDOSO PROFESSORA">EDERA IRENE PEREIRA DE OLIVEIRA CARDOSO PROFESSORA</option>
                <option value="EDGAR MELLO MATTOS DE CASTRO ENGENHEIRO">EDGAR MELLO MATTOS DE CASTRO ENGENHEIRO</option>
                <option value="EDUCARE CENTRO DE ENSINO">EDUCARE CENTRO DE ENSINO</option>
                <option value="ELIDIA TEDESCO DE OLIVEIRA PROFESSORA">ELIDIA TEDESCO DE OLIVEIRA PROFESSORA</option>
                <option value="ELMANO FERREIRA VELOSO">ELMANO FERREIRA VELOSO</option>
                <option value="ELO EDUCACIONAL">ELO EDUCACIONAL</option>
                <option value="EMBRAER JUAREZ WANDERLEY COLEGIO">EMBRAER JUAREZ WANDERLEY COLEGIO</option>
                <option value="ESCOLA CRISTA BATISTA REGULAR">ESCOLA CRISTA BATISTA REGULAR</option>
                <option value="ESTEVAM FERRI PROFESSOR">ESTEVAM FERRI PROFESSOR</option>
                <option value="ETEC PROFESSORA ILZA NASCIMENTO PINTUS">ETEC PROFESSORA ILZA NASCIMENTO PINTUS</option>
                <option value="EUCLIDES BUENO MIRAGAIA">EUCLIDES BUENO MIRAGAIA</option>
                <option value="EVERARDO PASSOS PROFESSOR ESCOLA TECNICA">EVERARDO PASSOS PROFESSOR ESCOLA TECNICA</option>
                <option value="EXPOENTEC CENTRO EDUCACIONAL TECNICO">EXPOENTEC CENTRO EDUCACIONAL TECNICO</option>
                <option value="FRANCISCANO NOSSA SENHORA APARECIDA COLEGIO">FRANCISCANO NOSSA SENHORA APARECIDA COLEGIO</option>
                <option value="FRANCISCO LOPES DE AZEVEDO PROFESSOR">FRANCISCO LOPES DE AZEVEDO PROFESSOR</option>
                <option value="FRANCISCO PEREIRA DA SILVA PROFESSOR">FRANCISCO PEREIRA DA SILVA PROFESSOR</option>
                <option value="GERALDINA COELHO MONTEIRO PROFESSORA">GERALDINA COELHO MONTEIRO PROFESSORA</option>
                <option value="ILZA IRMA MOELLER COPPIO PROFESSORA">ILZA IRMA MOELLER COPPIO PROFESSORA</option>
                <option value="INOVANDO O APRENDIZADO INSTITUTO DE DESENVOLVIME EDUC IDEIA">INOVANDO O APRENDIZADO INSTITUTO DE DESENVOLVIME EDUC IDEIA</option>
                <option value="INSPIRE COLEGIO">INSPIRE COLEGIO</option>
                <option value="INSTITUTO EDUCACIONAL IGUATEMY ESCOLA DE EI EF E EM">INSTITUTO EDUCACIONAL IGUATEMY ESCOLA DE EI EF E EM</option>
                <option value="INSTITUTO SAO JOSE">INSTITUTO SAO JOSE</option>
                <option value="JARDIM REPUBLICA">JARDIM REPUBLICA</option>
                <option value="JENI DAVI BACHA PROFESSORA">JENI DAVI BACHA PROFESSORA</option>
                <option value="JOAO CURSINO">JOAO CURSINO</option>
                <option value="JOAQUIM ANDRADE MEIRELLES PROFESSOR">JOAQUIM ANDRADE MEIRELLES PROFESSOR</option>
                <option value="JOAQUIM DE MOURA CANDELARIA PROFESSOR">JOAQUIM DE MOURA CANDELARIA PROFESSOR</option>
                <option value="JORGE BARBOSA MOREIRA PROFESSOR">JORGE BARBOSA MOREIRA PROFESSOR</option>
                <option value="JOSE MARIOTTO FERREIRA MAJOR AVIADOR">JOSE MARIOTTO FERREIRA MAJOR AVIADOR</option>
                <option value="JOSE VIEIRA MACEDO PROFESSOR">JOSE VIEIRA MACEDO PROFESSOR</option>
                <option value="JUVENAL MACHADO DE ARAUJO PROFESSOR">JUVENAL MACHADO DE ARAUJO PROFESSOR</option>
                <option value="LOURDES MARIA DE CAMARGO PROFESSORA">LOURDES MARIA DE CAMARGO PROFESSORA</option>
                <option value="MALBA THEREZA FERRAZ CAMPANER PROFESSORA">MALBA THEREZA FERRAZ CAMPANER PROFESSORA</option>
                <option value="MANOEL PEDRO OLIVEIRA COMED - ESCOLA POLITECNICA DE EM">MANOEL PEDRO OLIVEIRA COMED - ESCOLA POLITECNICA DE EM</option>
                <option value="MARCIA HELENA BARBOSA LINO PROFESSORA">MARCIA HELENA BARBOSA LINO PROFESSORA</option>
                <option value="MARIA APARECIDA VERISSIMO MADUREIRA RAMOS PROFESSORA">MARIA APARECIDA VERISSIMO MADUREIRA RAMOS PROFESSORA</option>
                <option value="MARIA DOLORES VERISSIMO MADUREIRA PROFESSORA">MARIA DOLORES VERISSIMO MADUREIRA PROFESSORA</option>
                <option value="MARIA FERREIRA SONNEWEND PROFESSORA">MARIA FERREIRA SONNEWEND PROFESSORA</option>
                <option value="MARIA LUIZA DE GUIMARAES MEDEIROS PROFESSORA">MARIA LUIZA DE GUIMARAES MEDEIROS PROFESSORA</option>
                <option value="MARILDA FERREIRA DE BRITO BARROS PEREIRA">MARILDA FERREIRA DE BRITO BARROS PEREIRA</option>
                <option value="MIGUEL NAKED MAJOR">MIGUEL NAKED MAJOR</option>
                <option value="MOABE CURY">MOABE CURY</option>
                <option value="NELSON DO NASCIMENTO MONTEIRO PROFESSOR">NELSON DO NASCIMENTO MONTEIRO PROFESSOR</option>
                <option value="NILCE CONCEICAO DE LIMA PROFESSORA">NILCE CONCEICAO DE LIMA PROFESSORA</option>
                <option value="NOVA GERACAO COLEGIO">NOVA GERACAO COLEGIO</option>
                <option value="OPCAO COLEGIO TECNICO">OPCAO COLEGIO TECNICO</option>
                <option value="PEDRO MASCARENHAS DOUTOR">PEDRO MASCARENHAS DOUTOR</option>
                <option value="PEDRO MAZZA PROFESSOR">PEDRO MAZZA PROFESSOR</option>
                <option value="POLIEDRO COLEGIO">POLIEDRO COLEGIO</option>
                <option value="RIBEIRO GOULART INSTITUTO DE EDUC ESC MAXIMUS">RIBEIRO GOULART INSTITUTO DE EDUC ESC MAXIMUS</option>
                <option value="RUI RODRIGUES DORIA DOUTOR">RUI RODRIGUES DORIA DOUTOR</option>
                <option value="RUTH COUTINHO SOBREIRO PROFESSORA">RUTH COUTINHO SOBREIRO PROFESSORA</option>
                <option value="SESI 182 CENTRO EDUCACIONAL">SESI 182 CENTRO EDUCACIONAL</option>
                <option value="SONIA MARIA ALEXANDRE PEREIRA PROFESSORA">SONIA MARIA ALEXANDRE PEREIRA PROFESSORA</option>
                <option value="TABLEAU COLEGIO">TABLEAU COLEGIO</option>
                <option value="TEOFILO REZENDE COLEGIO">TEOFILO REZENDE COLEGIO</option>
                <option value="VALMAR LOURENCO SANTIAGO PROFESSOR">VALMAR LOURENCO SANTIAGO PROFESSOR</option>
                <option value="WALTER FORTUNATO ESCOLA">WALTER FORTUNATO ESCOLA</option>
                <option value="XENOFONTE STRABAO DE CASTRO PROFESSOR">XENOFONTE STRABAO DE CASTRO PROFESSOR</option>
                <option value="YOSHIYA TAKAOKA">YOSHIYA TAKAOKA</option>
                <option value="ZILAH FERREIRA VIAGI PASSARELLI DE CAMPOS PROFESSORA">ZILAH FERREIRA VIAGI PASSARELLI DE CAMPOS PROFESSORA</option>
            </>,
            // Pergunta de forma de conhecimento sobre o PS (legenda)
            wayLabel: <>Como você tomou conhecimento do Processo Seletivo do CASDvest? <a>*</a></>
        },
        "casdinho": {
            schoolingText:
                <p>O Processo Seletivo do CASDinho 2021 destina-se a alunos que cursarão o 8º ou 9º ano do Ensino Fundamental em 2021.</p>,
            schoolingOptions:
            <>
                <option value="Cursando o 8º ano do Ensino Fundamental em 2020">Cursando o 8º ano do Ensino Fundamental em 2020</option>
                <option value="Cursando o 7º ano do Ensino Fundamental em 2020">Cursando o 7º ano do Ensino Fundamental em 2020</option>
            </>,
            kindSchoolText:
                <p>Considere a escola em que você estuda atualmente.</p>,
            schoolText:
                <p>Escolha a escola em que você estuda atualmente.</p>,
            schoolOptions:
            <>
                <option value="ADVENTISTA DE SAO JOSE DOS CAMPOS COLEGIO">ADVENTISTA DE SAO JOSE DOS CAMPOS COLEGIO</option>
                <option value="ALCEU MAYNARD ARAUJO PROFESSOR">ALCEU MAYNARD ARAUJO PROFESSOR</option>
                <option value="ALPHA LUMEN INSTITUTO">ALPHA LUMEN INSTITUTO</option>
                <option value="ALVARO GONCALVES PROF EMEF">ALVARO GONCALVES PROF EMEF</option>
                <option value="ANA BERLING MACEDO PROFA EMEF">ANA BERLING MACEDO PROFA EMEF</option>
                <option value="ANA CANDIDA DE BARROS MOLINA PROFESSORA">ANA CANDIDA DE BARROS MOLINA PROFESSORA</option>
                <option value="ANA HERONDINA SOARES SCHYCHOF PROFESSORA">ANA HERONDINA SOARES SCHYCHOF PROFESSORA</option>
                <option value="ANCHIETA COLEGIO">ANCHIETA COLEGIO</option>
                <option value="ANTONIO PALMA SOBRINHO PROF EMEF">ANTONIO PALMA SOBRINHO PROF EMEF</option>
                <option value="ARLINDO CAETANO FILHO PROF EEIEF">ARLINDO CAETANO FILHO PROF EEIEF</option>
                <option value="AUREA CANTINHO RODRIGUES PROFA EMEF">AUREA CANTINHO RODRIGUES PROFA EMEF</option>
                <option value="AYR PICANCO BARBOSA DE ALMEIDA PROFESSORA">AYR PICANCO BARBOSA DE ALMEIDA PROFESSORA</option>
                <option value="BENEDITO MATARAZZO DEPUTADO">BENEDITO MATARAZZO DEPUTADO</option>
                <option value="CARLOS SALONI ESCOLA">CARLOS SALONI ESCOLA</option>
                <option value="CASA PANDAVAS EEIPG CENTRO PEDAGOGICO">CASA PANDAVAS EEIPG CENTRO PEDAGOGICO</option>
                <option value="CASSIANO RICARDO COLEGIO EIEEF">CASSIANO RICARDO COLEGIO EIEEF</option>
                <option value="CENTRO ATEND SOCIOEDUC ADOLESC SAO JOSE DOS CAMPOS CI">CENTRO ATEND SOCIOEDUC ADOLESC SAO JOSE DOS CAMPOS CI</option>
                <option value="CENTRO ESCOLAR VALE DO PARAIBA CENTRO EDUCACAO OBJETIVO">CENTRO ESCOLAR VALE DO PARAIBA CENTRO EDUCACAO OBJETIVO</option>
                <option value="COLEGIO EVOLUCAO ED INFANTIL E ENS FUNDAMENTAL">COLEGIO EVOLUCAO ED INFANTIL E ENS FUNDAMENTAL</option>
                <option value="COLEGIO JOSEENSE">COLEGIO JOSEENSE</option>
                <option value="COLEGIO MATER DEI">COLEGIO MATER DEI</option>
                <option value="CONEXAO DE ENSINO INSTITUTO">CONEXAO DE ENSINO INSTITUTO</option>
                <option value="CRESCER ESPACO DE CRESCEMENTO E APERFEIC PSICOPEDAG COL">CRESCER ESPACO DE CRESCEMENTO E APERFEIC PSICOPEDAG COL</option>
                <option value="DIACONO HAMILTON BONTORIM DE SOUZA PROFESSOR">DIACONO HAMILTON BONTORIM DE SOUZA PROFESSOR</option>
                <option value="DINORA PEREIRA RAMOS BRITO PROFESSORA">DINORA PEREIRA RAMOS BRITO PROFESSORA</option>
                <option value="DIRCE ELIAS PROFESSORA">DIRCE ELIAS PROFESSORA</option>
                <option value="DOM BOSCO COLEGIO">DOM BOSCO COLEGIO</option>
                <option value="DOMINGOS DE MACEDO CUSTODIO PROFESSOR">DOMINGOS DE MACEDO CUSTODIO PROFESSOR</option>
                <option value="DOSULINA CHENQUE CHAVES DE ANDRADE PROFA EMEF">DOSULINA CHENQUE CHAVES DE ANDRADE PROFA EMEF</option>
                <option value="ECCOS COLEGIO">ECCOS COLEGIO</option>
                <option value="EDERA IRENE PEREIRA DE OLIVEIRA CARDOSO PROFESSORA">EDERA IRENE PEREIRA DE OLIVEIRA CARDOSO PROFESSORA</option>
                <option value="EDGAR MELLO MATTOS DE CASTRO ENGENHEIRO">EDGAR MELLO MATTOS DE CASTRO ENGENHEIRO</option>
                <option value="EDUCANDARIO JESUS EUCARISTICO">EDUCANDARIO JESUS EUCARISTICO</option>
                <option value="ELIDIA TEDESCO DE OLIVEIRA PROFESSORA">ELIDIA TEDESCO DE OLIVEIRA PROFESSORA</option>
                <option value="ELIZABETE DE PAULA HONORATO PROFA EMEF">ELIZABETE DE PAULA HONORATO PROFA EMEF</option>
                <option value="ELMANO FERREIRA VELOSO">ELMANO FERREIRA VELOSO</option>
                <option value="ELO EDUCACIONAL">ELO EDUCACIONAL</option>
                <option value="ELZA REGINA FERREIRA BEVILACQUA PROFA EMEF">ELZA REGINA FERREIRA BEVILACQUA PROFA EMEF</option>
                <option value="EMAK ESCOLA EMANUEL KANT">EMAK ESCOLA EMANUEL KANT</option>
                <option value="EMEF EMMANUEL ANTONIO DOS SANTOS">EMEF EMMANUEL ANTONIO DOS SANTOS</option>
                <option value="ESCOLA CRISTA BATISTA REGULAR">ESCOLA CRISTA BATISTA REGULAR</option>
                <option value="ESFERA ESCOLA INTERNACIONAL">ESFERA ESCOLA INTERNACIONAL</option>
                <option value="EUCLIDES BUENO MIRAGAIA">EUCLIDES BUENO MIRAGAIA</option>
                <option value="EVOLUTI CILEGIO">EVOLUTI CILEGIO</option>
                <option value="FRANCISCANO NOSSA SENHORA APARECIDA COLEGIO">FRANCISCANO NOSSA SENHORA APARECIDA COLEGIO</option>
                <option value="FRANCISCO JOAO LEME">FRANCISCO JOAO LEME</option>
                <option value="FRANCISCO LOPES DE AZEVEDO PROFESSOR">FRANCISCO LOPES DE AZEVEDO PROFESSOR</option>
                <option value="FUTURA GERACAO COLEGIO">FUTURA GERACAO COLEGIO</option>
                <option value="GERALDINA COELHO MONTEIRO PROFESSORA">GERALDINA COELHO MONTEIRO PROFESSORA</option>
                <option value="GERALDO DE ALMEIDA PROF EMEF">GERALDO DE ALMEIDA PROF EMEF</option>
                <option value="HELIO AUGUSTO DE SOUZA PROF EMEF">HELIO AUGUSTO DE SOUZA PROF EMEF</option>
                <option value="HELIO WALTER BEVILACQUA PROFESSOR EMEF">HELIO WALTER BEVILACQUA PROFESSOR EMEF</option>
                <option value="HOMERA DA SILVA BRAGA PROFA EMEF">HOMERA DA SILVA BRAGA PROFA EMEF</option>
                <option value="ILDETE MENDONCA BARBOSA PROFA EMEF">ILDETE MENDONCA BARBOSA PROFA EMEF</option>
                <option value="ILGA PUSPLATAIS PROFA EMEF">ILGA PUSPLATAIS PROFA EMEF</option>
                <option value="INOVANDO O APRENDIZADO INSTITUTO DE DESENVOLVIME EDUC IDEIA">INOVANDO O APRENDIZADO INSTITUTO DE DESENVOLVIME EDUC IDEIA</option>
                <option value="INSPIRE COLEGIO">INSPIRE COLEGIO</option>
                <option value="INSTITUTO EDUCACIONAL IGUATEMY ESCOLA DE EI EF E EM">INSTITUTO EDUCACIONAL IGUATEMY ESCOLA DE EI EF E EM</option>
                <option value="INSTITUTO SAO JOSE">INSTITUTO SAO JOSE</option>
                <option value="JACYRA VIEIRA BARACHO PROFA EMEF">JACYRA VIEIRA BARACHO PROFA EMEF</option>
                <option value="JENI DAVI BACHA PROFESSORA">JENI DAVI BACHA PROFESSORA</option>
                <option value="JOAO CURSINO">JOAO CURSINO</option>
                <option value="JOAO FERREIRA DOS SANTOS PROFESSOR">JOAO FERREIRA DOS SANTOS PROFESSOR</option>
                <option value="JOAO MOROTTI FILHO">JOAO MOROTTI FILHO</option>
                <option value="JOAQUIM ANDRADE MEIRELLES PROFESSOR">JOAQUIM ANDRADE MEIRELLES PROFESSOR</option>
                <option value="JOAQUIM DE MOURA CANDELARIA PROFESSOR">JOAQUIM DE MOURA CANDELARIA PROFESSOR</option>
                <option value="JORGE BARBOSA MOREIRA PROFESSOR">JORGE BARBOSA MOREIRA PROFESSOR</option>
                <option value="JOSE MARIOTTO FERREIRA MAJOR AVIADOR">JOSE MARIOTTO FERREIRA MAJOR AVIADOR</option>
                <option value="JUVENAL MACHADO DE ARAUJO PROFESSOR">JUVENAL MACHADO DE ARAUJO PROFESSOR</option>
                <option value="LEONOR PEREIRA NUNES GALVAO PROFA EMEF">LEONOR PEREIRA NUNES GALVAO PROFA EMEF</option>
                <option value="LOURDES MARIA DE CAMARGO PROFESSORA">LOURDES MARIA DE CAMARGO PROFESSORA</option>
                <option value="LUCE PRIMA COLEGIO">LUCE PRIMA COLEGIO</option>
                <option value="LUCIA PEREIRA RODRIGUES PROFA EMEF">LUCIA PEREIRA RODRIGUES PROFA EMEF</option>
                <option value="LUIZ LEITE PROF EMEF">LUIZ LEITE PROF EMEF</option>
                <option value="LUZIA LEVINA APARECIDA BORGES PROFA EMEF">LUZIA LEVINA APARECIDA BORGES PROFA EMEF</option>
                <option value="MALBA THEREZA FERRAZ CAMPANER PROFESSORA">MALBA THEREZA FERRAZ CAMPANER PROFESSORA</option>
                <option value="MARIA AMELIA WAKAMATSU PROFA EMEF">MARIA AMELIA WAKAMATSU PROFA EMEF</option>
                <option value="MARIA ANTONIETA FERREIRA PAYAR PROFA EMEF">MARIA ANTONIETA FERREIRA PAYAR PROFA EMEF</option>
                <option value="MARIA APARECIDA SANTOS RONCONI PROFA EMEF">MARIA APARECIDA SANTOS RONCONI PROFA EMEF</option>
                <option value="MARIA APARECIDA VERISSIMO MADUREIRA RAMOS PROFESSORA">MARIA APARECIDA VERISSIMO MADUREIRA RAMOS PROFESSORA</option>
                <option value="MARIA DE MELO PROFA EMEF">MARIA DE MELO PROFA EMEF</option>
                <option value="MARIA FERREIRA SONNEWEND PROFESSORA">MARIA FERREIRA SONNEWEND PROFESSORA</option>
                <option value="MARIA NAZARETH DE MOURA VERONESE PROFA EMEF">MARIA NAZARETH DE MOURA VERONESE PROFA EMEF</option>
                <option value="MARIA OFELIA VENEZIANI PEDROSA PROFA EMEF">MARIA OFELIA VENEZIANI PEDROSA PROFA EMEF</option>
                <option value="MARIANA TEIXEIRA CORNELIO PROFA EMEF">MARIANA TEIXEIRA CORNELIO PROFA EMEF</option>
                <option value="MARILDA FERREIRA DE BRITO BARROS PEREIRA">MARILDA FERREIRA DE BRITO BARROS PEREIRA</option>
                <option value="MERCEDES CARNEVALLI KLEIN PROFA EMEF">MERCEDES CARNEVALLI KLEIN PROFA EMEF</option>
                <option value="MERCEDES RACHID EDWARDS EMEF">MERCEDES RACHID EDWARDS EMEF</option>
                <option value="MIGUEL NAKED MAJOR">MIGUEL NAKED MAJOR</option>
                <option value="MOABE CURY">MOABE CURY</option>
                <option value="MOACYR BENEDICTO DE SOUZA PROF EMEF">MOACYR BENEDICTO DE SOUZA PROF EMEF</option>
                <option value="MONTEIRO LOBATO EEIFM">MONTEIRO LOBATO EEIFM</option>
                <option value="MOPPE EDUCACAO INFANTIL E ENSINO FUNDAMENTAL">MOPPE EDUCACAO INFANTIL E ENSINO FUNDAMENTAL</option>
                <option value="NATURAL VIVENCIA ESCOLA DE EI E EF">NATURAL VIVENCIA ESCOLA DE EI E EF</option>
                <option value="NILCE CONCEICAO DE LIMA PROFESSORA">NILCE CONCEICAO DE LIMA PROFESSORA</option>
                <option value="NORMA DE CONTI SIMAO PROFA EMEF">NORMA DE CONTI SIMAO PROFA EMEF</option>
                <option value="NOVA PAULISTA CENTRO EDUCACIONAL">NOVA PAULISTA CENTRO EDUCACIONAL</option>
                <option value="OLIMPIO CATAO">OLIMPIO CATAO</option>
                <option value="OPCAO COLEGIO TECNICO">OPCAO COLEGIO TECNICO</option>
                <option value="OTACILIA MADUREIRA DE MOURA PROFA EMEF">OTACILIA MADUREIRA DE MOURA PROFA EMEF</option>
                <option value="PALMYRA SANT'ANNA PROFA EMEF">PALMYRA SANT'ANNA PROFA EMEF</option>
                <option value="PEDRO DE ALCANTARA DOM EMEF">PEDRO DE ALCANTARA DOM EMEF</option>
                <option value="PEDRO MASCARENHAS DOUTOR">PEDRO MASCARENHAS DOUTOR</option>
                <option value="PEDRO MAZZA PROFESSOR">PEDRO MAZZA PROFESSOR</option>
                <option value="POLIEDRO ENSINO FUNDAMENTAL COLEGIO">POLIEDRO ENSINO FUNDAMENTAL COLEGIO</option>
                <option value="POSSIDONIO JOSE DE FREITAS EMEF">POSSIDONIO JOSE DE FREITAS EMEF</option>
                <option value="PRESBITERIANA ESCOLA DE EDUCACAO INFANTIL ENSINO FUNDAMENTAL">PRESBITERIANA ESCOLA DE EDUCACAO INFANTIL ENSINO FUNDAMENTAL</option>
                <option value="RIBEIRO GOULART INSTITUTO DE EDUC ESC MAXIMUS">RIBEIRO GOULART INSTITUTO DE EDUC ESC MAXIMUS</option>
                <option value="RONDON MARECHAL">RONDON MARECHAL</option>
                <option value="ROSA TOMITA PROFA EMEF">ROSA TOMITA PROFA EMEF</option>
                <option value="RUI RODRIGUES DORIA DOUTOR">RUI RODRIGUES DORIA DOUTOR</option>
                <option value="RUTH COUTINHO SOBREIRO PROFESSORA">RUTH COUTINHO SOBREIRO PROFESSORA</option>
                <option value="RUTH NUNES DA TRINDADE PROFA EMEF">RUTH NUNES DA TRINDADE PROFA EMEF</option>
                <option value="SEBASTIANA COBRA PROFA EMEF">SEBASTIANA COBRA PROFA EMEF</option>
                <option value="SESI 182 CENTRO EDUCACIONAL">SESI 182 CENTRO EDUCACIONAL</option>
                <option value="SILVANA MARIA RIBEIRO DE ALMEIDA PROFA EMEF">SILVANA MARIA RIBEIRO DE ALMEIDA PROFA EMEF</option>
                <option value="SONHO DE CRIANCA CENTRO EDUCACIONAL">SONHO DE CRIANCA CENTRO EDUCACIONAL</option>
                <option value="SONIA MARIA ALEXANDRE PEREIRA PROFESSORA">SONIA MARIA ALEXANDRE PEREIRA PROFESSORA</option>
                <option value="SONIA MARIA PEREIRA DA SILVA PROFA EMEF">SONIA MARIA PEREIRA DA SILVA PROFA EMEF</option>
                <option value="TABLEAU COLEGIO">TABLEAU COLEGIO</option>
                <option value="TEOFILO REZENDE COLEGIO">TEOFILO REZENDE COLEGIO</option>
                <option value="THEREZINHA DO MENINO JESUS SOARES DO NASCIMENTO PROFA EMEF">THEREZINHA DO MENINO JESUS SOARES DO NASCIMENTO PROFA EMEF</option>
                <option value="UBIRAJARA BERNA DE CHIARA UBIRAJARA BRASIL">UBIRAJARA BERNA DE CHIARA UBIRAJARA BRASIL</option>
                <option value="VERA BABO DE OLIVEIRA PROFA EMEF">VERA BABO DE OLIVEIRA PROFA EMEF</option>
                <option value="VERA LUCIA CARNEVALLI BARRETO PROFA EMEF">VERA LUCIA CARNEVALLI BARRETO PROFA EMEF</option>
                <option value="WALDEMAR RAMOS PROF EMEF">WALDEMAR RAMOS PROF EMEF</option>
                <option value="WALTER FORTUNATO ESCOLA">WALTER FORTUNATO ESCOLA</option>
                <option value="WILMA RAGAZZI BOCCARDO PROFESSORA">WILMA RAGAZZI BOCCARDO PROFESSORA</option>
                <option value="XENOFONTE STRABAO DE CASTRO PROFESSOR">XENOFONTE STRABAO DE CASTRO PROFESSOR</option>
                <option value="YOSHIYA TAKAOKA">YOSHIYA TAKAOKA</option>
                <option value="ZILAH FERREIRA VIAGI PASSARELLI DE CAMPOS PROFESSORA">ZILAH FERREIRA VIAGI PASSARELLI DE CAMPOS PROFESSORA</option>
            </>,
            wayLabel: <>Como você tomou conhecimento do Processo Seletivo do CASDinho? <a>*</a></>
        }
    }
]

function PersonalDataInputs({ idCourse }) {
    const [personalData, setPersonalData] = useState();
    const [errors, setErrors] = useState({});
    const { address, setAddress } = useContext(FormRegistrationContext);
    const { formData, setFormData } = useContext(FormRegistrationContext);

    const infos = difCourse[0][idCourse];

    useEffect(() => setFormData({...formData, ...personalData}), [personalData, setFormData, setPersonalData]);
    useEffect(() => setPersonalData({...personalData, address: address}), [address, setPersonalData]);

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

    // Estrutura de perguntas com validação por padrão:
    /// const ... = RegExp(...); --> expressão regular que define o padrão
    /// function handle...(e) --> função que lida com a validação
    /// Se o input obedece padrão, salva no banco de dados
    /// Se não obedece, salva string vazia

    // Validação da data de nascimento
    const dataRegEx = RegExp(/^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/);
    function handleDate(e) {
        var date = e.target.value;
        var val = false;

        if (dataRegEx.test(date)) {
            val = true;
            var day = parseInt(date[0] + date[1]);
            var month = parseInt(date[3] + date[4]);
            var year = parseInt(date[6] + date[7] + date[8] + date[9]);

            if (day <= 0 || month <= 0 || month > 12 || year < 1900 || year > 2020) val = false;
            else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                if (day > 31) val = false;
            }
            else if (month == 2) {
                if (year % 4 == 0 && day > 29) val = false;
                else if (year % 4 != 0 && day > 28) val = false;
            }
            else if (day > 30) val = false;
        }

        if (val) {
            setPersonalData({...personalData, birthDate: date});
            setErrors({...errors, birthDate: ""});
        }
        else {
            if (date === "") {
                setPersonalData({...personalData, birthDate: ""});
                setErrors({...errors, birthDate: "Esse campo é obrigatório."});
            }
            else {
                setPersonalData({...personalData, birthDate: "inval"});
                setErrors({...errors, birthDate: "Insira uma data válida no formato indicado."});
            }
        }
    }

    // Validação do nome do responsável
    const NomeRegEx = RegExp(/[A-ZÁÉÍÓÚa-záéíóúç]+[ ]+([A-ZÁÉÍÓÚa-záéíóúç]+[ ]*)+/);
    function handleRelativeName(e) {
        var name = e.target.value;

        if(NomeRegEx.test(name)) {
            var handledName = handleStrings(name);
            setPersonalData({...personalData, relativeName: handledName});
            setErrors({...errors, relativeName: ""});
        }
        else {
            setPersonalData({...personalData, relativeName: ""});
            if (name == "") setErrors({...errors, relativeName: "Esse campo é obrigatório."});
            else setErrors({...errors, relativeName: "Escreva o nome completo do responsável."});
        }
    }

    // Validação dos telefones
    const telRegEx1 = RegExp(/^[0-9]{11}$/); // Telefone celular
    const telRegEx2 = RegExp(/^[0-9]{10}$/); // Telefone fixo
    function handlePhone(phone) {
        var telRegEx;

        while(phone[0] == '0') phone = phone.replace('0', ''); // Eliminar 0 do DDD, se houver
        
        // Selecionar expressão regular
        var i = phone[2];
        if(i == '9') telRegEx = telRegEx1; // Telefone celular
        else if(i == '2' || i == '3' || i == '4' || i == '5') telRegEx = telRegEx2; // Telefone fixo
        else return "";
    
        if(telRegEx.test(phone)) return phone;
        else return "";
    }
    function handlePhone1(e) {
        var phone = handlePhone(e.target.value);
        setPersonalData({...personalData, phone1: phone});

        if (e.target.value === "") setErrors({...errors, phone1: "Esse campo é obrigatório."});
        else if (phone === "") setErrors({...errors, phone1: "Insira um número de telefone válido no formato indicado."});
        else setErrors({...errors, phone1: ""});
    }
    function handlePhone2(e) {
        var phone = handlePhone(e.target.value);
        setPersonalData({...personalData, phone2: phone});

        if (e.target.value === "" || phone !== "") setErrors({...errors, phone2: ""});
        else if (phone === "") setErrors({...errors, phone2: "Insira um número de telefone válido no formato indicado."});
    }

    // Validação do CEP
    const CEPRegEx = RegExp(/^[0-9]{8}$/);
    function handleCEP(e) {
        if(CEPRegEx.test(e.target.value)) {
            setAddress({...address, cep: e.target.value});
            setErrors({...errors, cep: ""});
        }
        else {
            setAddress({...address, cep: ""});
            setErrors({...errors, cep: "Insira um CEP válido."});
        }
    }

    // Estrutura de perguntas condicionais
    /// function handle...(e)
    /// var ... = e.target.value --> variável com o input da pergunta-pai
    /// if --> salva valor
    /// else --> salva valor e string vazia para pergunta Outro

    // Pergunta condicional do parentesco
    function handleKinship(e) {
        var par = e.target.value;

        if (par === "Outro") setPersonalData({...personalData, kinship: par});
        else setPersonalData({...personalData, kinship: par, otherKinship: ''});
    }

    // Pergunta condicional de necessidade especial
    function handleSpecialNecessity(e) {
        var nec = e.target.value;

        if(nec === "Sim") setPersonalData({...personalData, ifSpecialNecessity: nec});
        else setPersonalData({...personalData, ifSpecialNecessity: nec, whichNecessity: ''});
    }

    // Pergunta condicional de escola
    function handleSchool(e) {
        var esc = e.target.value;

        if (esc === "Outra") setPersonalData({...personalData, school: esc});
        else setPersonalData({...personalData, school: esc, otherSchool: ''});
    }

    // Pergunta condicional de forma de conhecimento do PS
    function handleWay(e) {
        var fo = e.target.value;

        if (fo === "Outro") setPersonalData({...personalData, wayPS: fo});
        else setPersonalData({...personalData, wayPS: fo, otherWay: ''});
    }

    return (
        <Container>
            <h3>Dados pessoais</h3>

            <label htmlFor="gender">Gênero <a>*</a></label>
            <select id="gender"
            onChange={e => {const newData = {...personalData, gender: e.target.value}; setPersonalData(newData);}}>
                <option value={formData.gender} selected disabled hidden>{formData.gender}</option>
                <option value=""></option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
            </select>
            {(formData.tryNext === true && (!formData.gender || formData.gender === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="birthDate">Data de nascimento <a>*</a></label>
            <p>Escreva no formato DD/MM/AAAA.</p>
            <input 
                type="text" id="birthDate" 
                placeholder={(!formData.birthDate || formData.birthDate === "") ? "DD/MM/AAAA": formData.birthDate}
                onChange={handleDate}
            />
            {(formData.tryNext === true && (!formData.birthDate || formData.birthDate === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage>
            : <ErrorMessage>{errors.birthDate}</ErrorMessage>}

            <label htmlFor="relativeName">Nome de um responsável <a>*</a></label>
            <p>Conforme consta no documento de identidade.</p>
            <input 
                type="text" id="relativeName" placeholder={formData.relativeName}
                onChange={handleRelativeName}
            />
            {(formData.tryNext === true && (!formData.relativeName || formData.relativeName === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> 
            : <ErrorMessage>{errors.relativeName}</ErrorMessage>}

            <label htmlFor="kinship">Parentesco do responsável <a>*</a></label>
            <select id="kinship" 
            onChange={handleKinship}>
                <option value={formData.kinship} selected disabled hidden>{formData.kinship}</option>
                <option value=""></option>
                <option value="Mãe">Mãe</option>
                <option value="Pai">Pai</option>
                <option value="Avó">Avó</option>
                <option value="Avô">Avô</option>
                <option value="Tia">Tia</option>
                <option value="Tio">Tio</option>
                <option value="Irmã">Irmã</option>
                <option value="Irmão">Irmão</option>
                <option value="Outro">Outro</option>
            </select>
            {(formData.tryNext === true && (!formData.kinship || formData.kinship === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            {formData.kinship === "Outro" ?
            <><label htmlFor="otherKinship" id="labelKinship">Outro parentesco: <a>*</a></label>
            <input
                type="text" id="otherKinship" placeholder={formData.otherKinship}
                onChange={e => {var handledKinship = handleStrings(e.target.value);
                                const newData = {...personalData, otherKinship: handledKinship}; setPersonalData(newData);}}
            /></> : null}
            {(formData.tryNext === true && formData.kinship === "Outro" && (!formData.otherKinship || formData.otherKinship === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="phone1">Telefone 1 <a>*</a></label>
            <p>Insira apenas os números, incluindo DDD.</p>
            <input 
                type="text" id="phone1" placeholder={formData.phone1}
                onChange={handlePhone1}
            />
            {(formData.tryNext === true && (!formData.phone1 || formData.phone1 === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> 
            : <ErrorMessage>{errors.phone1}</ErrorMessage>}

            <label htmlFor="phone2">Telefone 2</label>
            <p>Insira apenas os números, incluindo DDD.</p>
            <input 
                type="text" id="phone2" placeholder={formData.phone2}
                onChange={handlePhone2}
            />
            <ErrorMessage>{errors.phone2}</ErrorMessage>

            <label htmlFor="street">Endereço <a>*</a></label>
            <p>Nome da rua, avenida ou correspondente (sem número ou complemento).</p> 
            <input 
                type="name" id="street" placeholder={formData.address ? formData.address.street : null}
                onChange={e => {var handledStreet = handleStrings(e.target.value);
                                const newData = {...address, street: handledStreet}; setAddress(newData);}}
            />
            {(formData.tryNext === true && (!formData.address.street || formData.address.street === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}
            
            <label htmlFor="numberStreet">Número <a>*</a></label>
            <p>Número da residência.</p>
            <input 
                type="number" id="numberStreet" placeholder={formData.address ? formData.address.numberStreet : null}
                onChange={e => {const newData = {...address, numberStreet: e.target.value}; setAddress(newData);}}
            />
            {(formData.tryNext === true && (!formData.address.numberStreet || formData.address.numberStreet === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="additionalAddress">Complemento</label>
            <p>Complemento do endereço, se houver.</p>
            <input 
                type="text" id="additionalAddress" placeholder={formData.address ? formData.address.additionalAddress : null}
                onChange={e => {var handledAdditional = handleStrings(e.target.value);
                                const newData = {...address, additionalAddress: handledAdditional}; setAddress(newData);}}
            />

            <label htmlFor="neighborhood">Bairro <a>*</a></label>    
            <input
                type="name" id="neighborhood" placeholder={formData.address ? formData.address.neighborhood : null}
                onChange={e => {var handledNeighborhood = handleStrings(e.target.value);
                                const newData = {...address, neighborhood: handledNeighborhood}; setAddress(newData);}}
            />
            {(formData.tryNext === true && (!formData.address.neighborhood || formData.address.neighborhood === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="cep">CEP <a>*</a></label>
            <p>Insira apenas os números.</p>
            <input
                type="number" id="cep" placeholder={formData.address ? formData.address.cep : null}
                onChange={handleCEP}
            />
            {(formData.tryNext === true && (!formData.address.cep || formData.address.cep === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage>
            : <ErrorMessage>{errors.cep}</ErrorMessage>}

            <label htmlFor="city">Cidade <a>*</a></label>
            <input
                type="name" id="city" placeholder={formData.address ? formData.address.city : null}
                onChange={e => {var handledCity = handleStrings(e.target.value);
                                const newData = {...address, city: handledCity}; setAddress(newData);}}
            />
            {(formData.tryNext === true && (!formData.address.city || formData.address.city === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="state">Estado <a>*</a></label>
            <select id="state"
            onChange={e => {const newData = {...address, state: e.target.value}; setAddress(newData);}}>
                <option value={formData.address ? formData.address.state : null} selected disabled hidden>{formData.address ? formData.address.state : null}</option>
                <option value=""></option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AM">AM</option>
                <option value="AP">AP</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MG">MG</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="PR">PR</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="RS">RS</option>
                <option value="SC">SC</option>
                <option value="SE">SE</option>
                <option value="SP">SP</option>
                <option value="TO">TO</option>
            </select>
            {(formData.tryNext === true && (!formData.address.state || formData.address.state === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="specialNecessity">Você possui alguma necessidade especial? <a>*</a></label>
            <select id="specialNecessity"
            onChange={handleSpecialNecessity}>
                <option value={formData.ifSpecialNecessity} selected disabled hidden>{formData.ifSpecialNecessity}</option>
                <option value=""></option>
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
            </select>
            {(formData.tryNext === true && (!formData.ifSpecialNecessity || formData.ifSpecialNecessity === "")) ? 
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            {formData.ifSpecialNecessity === "Sim" ?
            <><label htmlFor="whichNecessity" id="labelSpecialNecessity">Qual sua necessidade especial? <a>*</a></label>
            <input
                type="text" id="whichNecessity" placeholder={formData.whichNecessity}
                onChange={e => {var handledNecessity = handleStrings(e.target.value);
                                const newData = {...personalData, whichNecessity: handledNecessity}; setPersonalData(newData);}}
            /></> : null}
            {(formData.tryNext === true && formData.ifSpecialNecessity === "Sim" && (!formData.whichNecessity || formData.whichNecessity === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="schooling">Escolaridade <a>*</a></label>
            {infos.schoolingText}
            <select id="schooling"
            onChange={e => {const newData = {...personalData, schooling: e.target.value}; setPersonalData(newData);}}>
                <option value={formData.schooling} selected disabled hidden>{formData.schooling}</option>
                <option value=""></option>
                {infos.schoolingOptions}
            </select>
            {(formData.tryNext === true && (!formData.schooling || formData.schooling === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="kindSchool">Tipo de escola <a>*</a></label>
            {infos.kindSchoolText}
            <select id="kindSchool"
            onChange={e => {const newData = {...personalData, kindSchool: e.target.value}; setPersonalData(newData);}}>
                <option value={formData.kindSchool} selected disabled hidden>{formData.kindSchool}</option>
                <option value=""></option>
                <option value="Pública Federal">Pública Federal</option>
                <option value="Pública Estadual">Pública Estadual</option>
                <option value="Pública Municipal">Pública Municipal</option>
                <option value="Privada">Privada</option>
            </select>
            {(formData.tryNext === true && (!formData.kindSchool || formData.kindSchool === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="school">Nome da escola <a>*</a></label>
            {infos.schoolText}
            <select id="school"
            onChange={handleSchool}>
                { /* Lista de escolas tirada do site do governo, adaptada para código em Excel */ }
                <option value={formData.school} selected disabled hidden>{formData.school}</option>
                <option value=""></option>
                {infos.schoolOptions}
                <option value="Outra">Outra</option>
            </select>
            {(formData.tryNext === true && (!formData.school || formData.school === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            {formData.school === "Outra" ?
            <><label htmlFor="otherSchool" id="labelSchool">Outra escola: <a>*</a></label>
            <input
                type="text" id="otherSchool" placeholder={formData.otherSchool}
                onChange={e => {var handledSchool = handleStrings(e.target.value);
                                const newData = {...personalData, otherSchool: handledSchool}; setPersonalData(newData);}}
            /></> : null}
            {(formData.tryNext === true && formData.school === "Outra" && (!formData.otherSchool || formData.otherSchool === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            <label htmlFor="wayPS">{infos.wayLabel}</label>
            <select id="wayPS"
            onChange={handleWay}>
                <option value={formData.wayPS} selected disabled hidden>{formData.wayPS}</option>
                <option value=""></option>
                <option value="Indicação de alunos do CASD">Indicação de alunos do CASD</option>
                <option value="Indicação de voluntários do CASD">Indicação de voluntários do CASD</option>
                <option value="Indicação de outros conhecidos">Indicação de outros conhecidos</option>
                <option value="Redes sociais (Facebook e Instagram)">Redes sociais (Facebook e Instagram)</option>
                <option value="Internet (site e mecanismos de busca)">Internet (site e mecanismos de busca)</option>
                <option value="Imprensa (TV, rádio e jornal)">Imprensa (TV, rádio e jornal)</option>
                <option value="Outdoor em ônibus">Outdoor em ônibus</option>
                <option value="Visita à escola">Visita à escola</option>
                <option value="Outro">Outro</option>
            </select>
            {(formData.tryNext === true && (!formData.wayPS || formData.wayPS === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            {formData.wayPS === "Outro" ?
            <><label htmlFor="otherWay" id="labelWay">Outra forma: <a>*</a></label>
            <input
                type="text" id="otherWay" placeholder={formData.otherWay}
                onChange={e => {var handledWay = handleStrings(e.target.value);
                                const newData = {...personalData, otherWay: handledWay}; setPersonalData(newData);}}
            /></> : null}
            {(formData.tryNext === true && formData.wayPS === "Outro" && (!formData.otherWay || formData.otherWay === "")) ?
            <ErrorMessage>Esse campo é obrigatório.</ErrorMessage> : null}

            {(formData.tryNext === true && formData.disabledButton === true) ? 
            <GeneralErrorMessage>Corrija os erros nos campos indicados acima.</GeneralErrorMessage> : null}
        </Container>
    );
}

export default PersonalDataInputs;