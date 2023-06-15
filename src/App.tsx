import React from 'react';
import './App.css';
import { Form } from './Form'
import FloatingBar from './FloatingBar'
import ManualAssetEntry from './ManualAssetEntry'


function App (props: any) {

  return (
      // <Form/>
      <ManualAssetEntry addProcedureAssetScanMutation={undefined} procedureId={''} resetQueryAndMutation={function (): void {
      throw new Error('Function not implemented.')
    } } setAssetMetadata={function (data: any): void {
      throw new Error('Function not implemented.')
    } }/>
  );
}

export default App;