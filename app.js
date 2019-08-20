import bodyParser from 'body-parser';
import express from 'express';
import solutions from './db/solutions';
import capabilities from './db/capabilities'
import { findSolution } from './db/findSolution';
import { filterSolutionsByCapabilities } from './db/filterSolutionsByCapabilities';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/solutions', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'solutions retrieved succesfully',
    solutions: solutions
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
  const solutionId = req.params['solutionId']
  res.status(200).send({
    success: true,
    message: 'solution retrieved succesfully',
    solution: findSolution(solutionId)
  })
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
