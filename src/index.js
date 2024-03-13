const express = require("express");
const { approuter } = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();

//middleware for parse the json data
app.use(express.json());

// middleware for route
app.use("/api/v1/", approuter);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
