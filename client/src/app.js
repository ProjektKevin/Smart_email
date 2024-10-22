import React from 'react';
import EmailForm from './components/emailForm';
import Tabs from './components/tabs';
import './app.css';

function App() {
   return (
       <div className="App">
           <Tabs />
           <EmailForm />
       </div>
   );
}

export default App;