import React from 'react';
import EmailForm from './components/emailForm';
import Tabs from './components/tabs';
import NavBar from './components/navBar';
import './app.css';

function App() {
   return (
       <div className="App">
           <NavBar/>
           <EmailForm />
       </div>
   );
}

export default App;