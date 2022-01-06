import compression from "compression";
import helmet from "helmet";
import app from "./app";

const PORT = process.env.PORT || 3000;

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.disable("x-powered-by");

const server = app.listen(PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`Starting ExpressJS server on port ${PORT}`);
});

export default server;
