import express from "express";
import api from "./server";

const app = express();

// Define api base url and append api endpoint routes
app.use("/api/v1", api);

app.listen(4000, () => {
    console.log("API RUNNING IN PORT 4000");
});
