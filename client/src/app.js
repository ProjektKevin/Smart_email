import React from 'react';
import EmailForm from './components/emailForm';
import Tabs from './components/tabs';
// import NavBar from './components/navBar';
import EmailBar from './components/emailBar'; // Ensure this is imported
import './app.css';

function App() {
   return (
       <div className="App">

           <div className="main-content">
               <Tabs />
               <div className="email-section">
                <EmailBar /> {/* Ensure this component is rendered */}
                   <EmailForm />
               </div>
           </div>
       </div>
   );
}

export default App;
