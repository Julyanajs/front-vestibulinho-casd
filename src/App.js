import React from 'react';
import GlobalStyle from './styles/global';
import FormRegistration from './pages/FormRegistration';

// [TODO] ver como qual formulário está sendo acessado a partir da tela inicial e implementar a definição do idCourse  
const idCourse = "casdvest";

function App() {
  return (
    <>
      <FormRegistration idCourse={idCourse} />
      <GlobalStyle />
    </>
  );
}
export default App;
