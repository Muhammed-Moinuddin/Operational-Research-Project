import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CountUp from "react-countup";
import { useCountUp } from "react-countup";

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function generateRandomExponential(lambda) {
  return -Math.log(1 - Math.random()) / lambda  //Poisson;
}

function mm1Simulation(lambda, mu  , numCustomers) { //mu - service
  let arrivalTime = [];
  let startTime = [];
  let endTime = [];
  let serviceTime = [];
  let turnaroundTime = [];
  let waitTime = [];
  let responseTime = [];
  let serverUtilization;

  let interArrivalTime = [];
  let serviceStartTime = [];
  let serviceEndTime = [];

  // Generate inter-arrival times
  for (let i = 0; i < numCustomers; i++) {
    interArrivalTime.push(generateRandomExponential(lambda));
    arrivalTime.push(i === 0 ? 0 : arrivalTime[i - 1] + interArrivalTime[i]);
  }

  // Generate service start and end times
  for (let i = 0; i < numCustomers; i++) {
    serviceStartTime.push(i === 0 ? arrivalTime[i] : Math.max(arrivalTime[i], serviceEndTime[i - 1]));
    serviceTime.push(generateRandomExponential(mu));
    serviceEndTime.push(serviceStartTime[i] + serviceTime[i]);
  }

  // Calculate performance metrics
  for (let i = 0; i < numCustomers; i++) {
    startTime.push(serviceStartTime[i]);
    endTime.push(serviceEndTime[i]);
    turnaroundTime.push(endTime[i] - arrivalTime[i]);
    waitTime.push(startTime[i] - arrivalTime[i]);
    responseTime.push(endTime[i] - arrivalTime[i]);
  }

  // Calculate server utilization
  let totalServiceTime = serviceTime.reduce((a, b) => a + b, 0);
  serverUtilization = totalServiceTime / endTime[numCustomers - 1];

  // Prepare the result table
  let table = [];
  for (let i = 0; i < numCustomers; i++) {
    table.push({
      arrivalTime: arrivalTime[i].toFixed(2),
      startTime: startTime[i].toFixed(2),
      endTime: endTime[i].toFixed(2),
      serviceTime: serviceTime[i].toFixed(2),
      turnaroundTime: turnaroundTime[i].toFixed(2),
      waitTime: waitTime[i].toFixed(2),
      responseTime: responseTime[i].toFixed(2),
    });
  }

  return {
    arrivalTime,
    startTime,
    endTime,
    serviceTime,
    turnaroundTime,
    waitTime,
    responseTime,
    serverUtilization,
    interArrivalTime,
    serviceStartTime,
    serviceEndTime
  }

}


export default function MM1() {
  const countUpRef = React.useRef(null);
  const [showResult, setShowResult] = useState(false)
  // const [mu, setMue] = useState(0);
  // const [lambda, setLemda] = useState(0);
  // const [temp, setTemp] = useState(null);
  const [rows, setRows] = useState([]);
  const [serverUtilization, setServerUtilization] = useState(0);

  // const rows = [];

  function createData(arrivalTime, startTime, endTime, serviceTime, turnaroundTime, waitTime, responseTime,interArrivalProbability,serviceProbability ) {
    return { arrivalTime, startTime, endTime, serviceTime, turnaroundTime, waitTime, responseTime,interArrivalProbability,serviceProbability };
  }

  // const lambda = 2.15; // Arrival rate
  // const mu = 1.58; // Service rate
  // const numCustomers = 5; // Number of customers to simulate


  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let mu = data.get("mue");
    let lambda = data.get("lemda");
    let numCustomers = data.get("customers");

    console.log({
      customers: data.get("customers"),
      lemda: data.get("lemda"),
      mue: data.get("mue"),
    });



    if (mu === "" || lambda === "") {
      alert("Please enter required values");
    }
    else {
      setShowResult(true)

      const simulationResult = mm1Simulation(lambda, mu, numCustomers);
      setServerUtilization(simulationResult.serverUtilization.toFixed(2));

      const interArrivalProbabilities = [];
      let cumulativeProbability = 0;
      for (let i = 0; i < numCustomers; i++) {
        cumulativeProbability += 1 / numCustomers;
        interArrivalProbabilities.push(cumulativeProbability.toFixed(4));
      }

      const serviceProbabilities = [];
      cumulativeProbability = 0;
      for (let i = 0; i < numCustomers; i++) {
        cumulativeProbability += 1 / numCustomers;
        serviceProbabilities.push(cumulativeProbability.toFixed(4));
      }
    

      for (let i = 0; i < numCustomers; i++) {
        rows.push(createData(
          simulationResult.arrivalTime[i].toFixed(2),
          simulationResult.startTime[i].toFixed(2),
          simulationResult.endTime[i].toFixed(2),
          simulationResult.serviceTime[i].toFixed(2),
          simulationResult.turnaroundTime[i].toFixed(2),
          simulationResult.waitTime[i].toFixed(2),
          simulationResult.responseTime[i].toFixed(2),
          interArrivalProbabilities[i], // Add cumulative inter-arrival probability
          serviceProbabilities[i] // Add cumulative service probability
        ));
      }
      console.log(rows)


    }
  }
  return <>
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container flexDirection="row" justifyContent="space-evenly">
            <Grid md={10}>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: 3,
                  mb: 5,
                }}
                className="container"
              >
                <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                  Number of customers ( C )
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="customers"
                  label="Number of customers"
                  name="customers"
                  type="number"
                />
                <Typography sx={{ color: "gray", fontSize: 10 }}>
                  Number of customers in parallel open to attend customers.
                </Typography>
              </Box>
            </Grid>
            <Grid md={4.5}>
              {" "}
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: 3,
                  mb: 5,
                }}
                className="container"
              >
                <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                  Arrival Rate ( λ )
                </Typography>
                <Box mb={2}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="lemda"
                    label="λ"
                    type="number"
                    id="lemda"
                  // value={lambda}
                  // onChange={(e) => setLemda(e.target.value)}
                  />
                </Box>

              </Box>
            </Grid>
            <Grid md={4.5}>
              {" "}
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  padding: 3,
                  mb: 5,
                }}
                className="container"
              >
                <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                  Service Rate ( μ )
                </Typography>
                <Box mb={2}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="mue"
                    label="μ"
                    type="number"
                    id="mue"
                  // value={mu}
                  // onChange={(e) => setMue(e.target.value)}
                  />
                </Box>

              </Box>
            </Grid>
          </Grid>

          <Button
              type="submit"
              // fullWidth
              variant="contained"
              sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#BAFF39',
                  width: '60%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                  alignItem: 'center',
                  justifyContent: 'center',
                  color: '#6E6E6E',
                  fontWeight:'800',
                  padding: '12px',
                  borderRadius: '10px',
                  '&:hover': {
                      backgroundColor: '#6E6E6E',
                      color: '#BAFF39',
                      border: '2px solid #BAFF39'
                  }
              }}
          >
              Calculate
          </Button>
        </Box>
        {
          showResult ?
            <>
              <TableContainer component={Paper} sx={{
                maxWidth: '1200px', margin: 'auto',
              }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Arrival Time</StyledTableCell>
                      <StyledTableCell align="center">Start Time</StyledTableCell>
                      <StyledTableCell align="center">End Time</StyledTableCell>
                      <StyledTableCell align="center">Service Time</StyledTableCell>
                      <StyledTableCell align="center">Turnaround Time</StyledTableCell>
                      <StyledTableCell align="center">Wait Time</StyledTableCell>
                      <StyledTableCell align="center">Response Time</StyledTableCell>
                      <StyledTableCell align="center">interArrivalProbability</StyledTableCell>
                      <StyledTableCell align="center">serviceProbability</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="center">{row.arrivalTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.startTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.endTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.serviceTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.turnaroundTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.waitTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.responseTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.interArrivalProbability}</StyledTableCell>
                        <StyledTableCell align="center">{row.serviceProbability}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                <h4 style={{
                  margin: '1em auto',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '1rem',
                  }}>
                    Server Utilization: {serverUtilization * 100}%
                  </p>
                </h4>
              </TableContainer>
            </>

            : null
        }

      </Container>
    </ThemeProvider>
  </>;
}