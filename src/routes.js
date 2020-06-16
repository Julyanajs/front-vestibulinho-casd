import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import FormRegistration from './pages/FormRegistration';
import CandidateStatus from './pages/CandidateStatus';
import Admin from './pages/Admin';

export default function Routes({ idCourse }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/inscricao" render={() => <FormRegistration idCourse={idCourse} />} />
        <Route path="/status" render={() => <CandidateStatus idCourse = {idCourse} />} />
        <Route path="/admin" render={() => <Admin idCourse = {idCourse} />} />
      </Switch>
    </BrowserRouter>
  );
}