import antigens from '../db/antigens.json';
import { Request, Response } from "express";
import kebabCase from 'just-kebab-case';

const toSymbol = str => {
    if (str.length === 3) str = str.toLowerCase();
    return kebabCase(str).toUpperCase();
}

const keyMap = {}
Object.keys(antigens).forEach(x => {
    keyMap[x.toLowerCase()] = x;
    keyMap[toSymbol(x).toLowerCase()] = x;
})

const getKey = str => {
    return keyMap[str.replace(':', '').toLowerCase()]
}

export const getAntigenNames = (req: Request, res: Response, next: () => void) => {
    const names = Object.keys(antigens);
    res.send(names);
};

export const getAntigenByName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = antigens[getKey(name)];
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getSeriesByAntigenName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = antigens[getKey(name)];
    if (!!!data) res.sendStatus(404);

    res.json(data.series);
};

export const getSeriesByAntigenNameAndIndex = (req: Request, res: Response, next: () => void) => {
    const { name, id } = req.params;

    let data = antigens[getKey(name)];
    if (!!!data) res.sendStatus(404);

    const idx = parseInt(id);
    data = isNaN(idx) ? data.series.find(x => x.seriesName === id) : data.series[idx];
    if (!!!data) res.sendStatus(404);

    res.json(data);
};

export const getContraindicationsByAntigenName = (req: Request, res: Response, next: () => void) => {
    const { name } = req.params;

    const data = antigens[getKey(name)];
    if (!!!data) res.sendStatus(404);

    res.json(data.contraindications);
};
