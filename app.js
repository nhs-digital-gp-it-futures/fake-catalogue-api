import bodyParser from 'body-parser';
import express from 'express';
import solutions from './db/solutions';
import capabilities from './db/capabilities'
import { findSolution } from './db/findSolution';
import { updateSolution } from './db/updateSolution';
import { filterSolutionsByCapabilities } from './db/filterSolutionsByCapabilities';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let inMemSolutions = solutions;

app.get('/api/v1/solutions', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'solutions retrieved succesfully',
    solutions: inMemSolutions
  })
});

app.post('/api/v1/solutions', (req, res) => {
  const selectedCapabilites = req.body;

  const filteredSolutions = filterSolutionsByCapabilities(selectedCapabilites.capabilities);

  res.status(200).send({
    success: true,
    message: 'solutions retrieved succesfully',
    solutions: filteredSolutions
  })
});

app.get('/api/v1/solution/:solutionId', (req, res) => {
  console.log(`GET SOLUTION ${JSON.stringify(inMemSolutions[0])}`)
  const solutionId = req.params['solutionId']

  if (!inMemSolutions) {
    inMemSolutions = solutions
  }
  const solution = findSolution(solutionId, inMemSolutions)

  res.status(200).send({
    success: true,
    message: 'solution retrieved succesfully',
    solution: solution
  });
});

app.post('/api/v1/solution/:solutionId', (req, res) => {
  // console.log(`update solution - inMemSolutions ${JSON.stringify(inMemSolutions)}`);

  const solutionId = req.params['solutionId'];
  // console.log(`update solution - solutionId ${JSON.stringify(solutionId)}`);

  const updatedSolution = req.body;
  // console.log(`update solution - updatedSolution ${JSON.stringify(updatedSolution)}`);

  inMemSolutions = updateSolution(solutionId, inMemSolutions, updatedSolution);
  // console.log(`update solution - inMemSolutions updated ${JSON.stringify(inMemSolutions)}`);

  res.status(200).send({
    success: true,
    message: 'solution updated',
    solutions: inMemSolutions
  });
});

app.get('/api/v1/capabilities', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'capabilities retrieved succesfully',
    capabilities: capabilities
  })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
