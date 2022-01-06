import { observations } from "../db/schedule.json";
import { Request, Response } from "express";

export const getOpservationCodes = (req: Request, res: Response, next: () => void) => {
    const codes = observations.map((x) => ({
        code: x.observationCode,
        text: x.observationTitle
    }));
    res.json(codes);
};

export const getObservationByCode = (req: Request, res: Response, next: () => void) => {
    const { code } = req.params;

    const data = observations.find((x) => parseInt(x.observationCode) === parseInt(code));
    if (!!!data) res.sendStatus(404);

    res.json(data);
};