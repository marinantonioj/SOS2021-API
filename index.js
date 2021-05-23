var cool = require("cool-ascii-faces");

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");

var port = (process.env.PORT || 10000);
//var BASE_API_PATH = "/api/v1/";
var app = express();
app.use(cors());

/*
app.get("/cool", (request,response) => {//request son los datos que me mandan a mi y response es para devolver datos al cliente
	response.send(cool());
	console.log("New request to /cool has arrived");
});
*/
app.use("/", express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
//=========================================== AJMR =========================================================

var nutsAPI =  require("./src/back/nutsAPI/v2");
nutsAPI.register(app);

// =======================================Codigo de grupo===========================
app.listen(port, () => {//la segunda parte del listen se ejecuta cuando el servidor esta listo
	console.log("Server ready. Listening on port " + port);
});