import React from "react";
import Header from './Components/Layout/Header/Header'
import Main from './Components/Layout/Main/Main'
import Global from "./Styles/GlobalStyles"


function App() {
  return (
    <div className="App">
      <Header />
      <Main/>
      <Global />
    </div>
  );
}

export default App;
