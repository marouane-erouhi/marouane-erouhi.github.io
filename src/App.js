import React, { useState } from 'react';
import './App.css';
import Bio from './components/bio'
import SectionContainer from './components/section_container'

function App() {
  const [currentPage, setCurrentPage] = useState('Home')

  const changePage = pageName => {
    setCurrentPage(pageName)
  }
  return (
    <div className="App">
      <SectionContainer currentSection={currentPage} />
      <Bio/>
    </div>
  );
}

export default App;
