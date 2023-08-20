import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ModelsPages from './Components/ModelsPages';
import "./App.css";
import Hero from './Components/Hero';
import SimulationPages from './Components/SimulationPages';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function App() {
  const [showSimulation, setShowSimulation] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [simulationButtonPressed, setSimulationButtonPressed] = useState(false);
  const [modelsButtonPressed, setModelsButtonPressed] = useState(false);

  const handleSimulationClick = () => {
    setShowSimulation(true);
    setShowModels(false);
    setSimulationButtonPressed(true);
    setModelsButtonPressed(false);
  };

  const handleModelsClick = () => {
    setShowSimulation(false);
    setShowModels(true);
    setSimulationButtonPressed(false);
    setModelsButtonPressed(true);
  };

  return (
    <div className="App">
      <div className="content">
        <Header />
        <Hero />
        <div>
          <Stack spacing={6} direction="row" sx={{
            margin: '4rem auto',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Button
              variant="contained"
              onClick={handleSimulationClick}
              sx={{
                fontWeight:'600',
                padding:'10px 20px',
                boxShadow: '5px 5px 10px #BAFF39',
                backgroundColor: simulationButtonPressed ? '#fff' : '#6E6E6E',
                color: simulationButtonPressed ? '#6E6E6E' : '#fff',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: simulationButtonPressed ? '#6E6E6E' : '#fff',
                  color: simulationButtonPressed ? '#fff' : '#6E6E6E',
                },
              }}
            >
              Simulation
            </Button>
            <Button
              variant="contained"
              onClick={handleModelsClick}
              sx={{
                fontWeight:'600',
                padding:'10px 20px',
                boxShadow: '5px 5px 10px #BAFF39',
                backgroundColor: modelsButtonPressed ? '#fff' : '#6E6E6E',
                color: modelsButtonPressed ? '#6E6E6E' : '#fff',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: modelsButtonPressed ? '#6E6E6E' : '#fff',
                  color: modelsButtonPressed ? '#fff' : '#6E6E6E',
                },
              }}
            >
              Models
            </Button>
          </Stack>
        </div>
        {showSimulation && <SimulationPages />}
        {showModels && <ModelsPages />}
      </div>
      <Footer />
    </div>
  );
}


export default App;