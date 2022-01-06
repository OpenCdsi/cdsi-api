import { cvxToAntigenMap, liveVirusConflicts, vaccineGroups, vaccineGroupToAntigenMap } from "../db/schedule.json";
import { Request, Response } from "express";

export const getVaccineGroupNames = (req: Request, res: Response, next: () => void) => {
    const names = vaccineGroups.map((x) => x.name);
    res.json(names);
};

export const getVaccineNames = (req: Request, res: Response, next: () => void) => {
    const names = cvxToAntigenMap.map((x) => ({
        cvx: x.cvx,
        description: x.shortDescription
    }));
    res.json(names);
};

export const getAntigensByGroup = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = vaccineGroupToAntigenMap.find((x) => x.name === name);
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getVaccineGroupByName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = vaccineGroups.find((x) => x.name === name);
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getConflictsById = (req: Request, res: Response, next: () => void) => {
    const { cvx } = req.params;

    const data = liveVirusConflicts.find((x) => parseInt(x.current.cvx) === parseInt(cvx));
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getVaccineById = (req: Request, res: Response, next: () => void) => {
    const { cvx } = req.params;

    const data = cvxToAntigenMap.find((x) => parseInt(x.cvx) === parseInt(cvx));
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getAntigensByVaccineId = (req: Request, res: Response, next: () => void) => {
    const { cvx } = req.params;

    const data = cvxToAntigenMap.find((x) => parseInt(x.cvx) === parseInt(cvx));
    if (!!!data) res.sendStatus(404);

   const list = data?.association.map(x=>x.antigen);
    res.json(list);
}

