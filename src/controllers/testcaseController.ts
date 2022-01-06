import testcases from '../db/testcases.json';
import { Request, Response } from "express";

export const getTestcaseNames = (req: Request, res: Response, next: () => void) => {
  const names = Object.keys(testcases).map((x) => ({
    id: x,
    description: testcases[x].testcaseName,
  }));
  res.json(names);
};

export const getTestcaseById = (req: Request, res: Response, next: () => void) => {
  const { id } = req.params;

  const data = testcases[id];
  data.patient.observationCodes = []; // Added to support select-relevant-series
  if (!!!data) res.sendStatus(404);

  res.json(data);
};

export const getTestcaseHistoryById = (req: Request, res: Response, next: () => void) => {
  const { id } = req.params;

  const data = testcases[id];
  data.patient.observationCodes = []; // Added to support select-relevant-series
  if (!!!data) res.sendStatus(404);

  const doses = data.evaluation.administeredDoses.map(x => ({
    cvx: x.cvx,
    mvx: x.mvx,
    vaccineName: x.vaccineName,
    dateAdministered: x.dateAdministered,
    lotExpiration: "",
    condition: ""
  }))

  res.json({ ...data.patient, doses });
};


export default { getTestcaseNames, getTestcaseById, getTestcaseHistoryById };
