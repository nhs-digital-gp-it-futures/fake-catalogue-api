import bodyParser from 'body-parser';
import express from 'express';
import db from './db/db';
import { findSolution } from './db/findSolution';

const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/v1/solutions', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'solutions retrieved succesfully',
    solutions: db
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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
