const express = require('express');
const router = require("./router/expressRouter.js");
const app = express();
const cors = require('cors');
const port = 3000;
const host = '0.0.0.0';

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(port, host, () => {
	console.log(`Server running on http://${host}:${port}`);
});
