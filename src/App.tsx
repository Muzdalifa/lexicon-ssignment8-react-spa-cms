import React from 'react';
import { AddPerson } from './AddPerson';
import './App.css';
import { Details } from './Details';
import { Table } from './Table';
import { useApp } from './useApp';

function App() {
   const {people, cities, countries, languages, updateApp} = useApp();  
  return (
    <div>
      <h1 className="align-text-center">Welcome to People's records</h1>

      <div className="row py-3">
      <AddPerson cities={cities} countries={countries} languages={languages} updateApp={updateApp} />
  </div>

<Details  cities={cities} countries={countries} languages={languages} updateApp={updateApp} />


<div className="row py-3">
    <div className="col">
        <div className="row bg-gradient bg-opacity bg-secondary header-table">
            <div className="col-md-1">ID</div>
            <div className="col-md-1">Name</div>
            <div className="col-md-2">City</div>
            <div className="col-md-2">Country</div>
            <div className="col-md-3">Languages</div>
            <div className="col-md-2">Phone number</div>
            <div className="col-md-1"></div>
        </div>
        <Table people={people}/>

    </div>
    </div>
</div>
  );
}

export default App;
