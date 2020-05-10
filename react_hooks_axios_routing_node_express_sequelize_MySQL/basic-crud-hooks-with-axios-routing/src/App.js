import React from 'react';
// import logo from './logo.svg';
import './App.css';

// import all the needed for routing and the components
import {BrowserRouter,Link,Route} from 'react-router-dom';
import AddTutorials from './components/AddTutorials';
import TutorialList from './components/TutorialList';
import EditTutorial from './components/EditTutorial';

function App() {
  return (
   <BrowserRouter>
      <ul>
        <li>
          <Link to="/tutorialList">Tutorial List</Link>
        </li>
        <li>
          <Link to="/addTutorial">Add Tutorial</Link>
        </li>
      </ul>
      <br></br>
      <br></br>
      <Route path={'/tutorialList'}>
        <TutorialList/>
      </Route>  
      <Route path={'/addTutorial'}>
        <AddTutorials/>
      </Route>  
      <Route path={'/editTutorials/:id'}>
        <EditTutorial/>
      </Route>    
   </BrowserRouter>
  );
}

export default App;
