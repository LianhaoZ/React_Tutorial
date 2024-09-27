import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => { 

  return (
    <div className="App"> 
      <header className="App-header">
        <h1>{schedule.title}</h1>
      </header>
    </div>
  );
};

export default App;
