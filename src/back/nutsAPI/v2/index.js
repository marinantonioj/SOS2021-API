var BASE_NUTS_API_PATH = "/api/v2/";
var DataStore = require("nedb");
var dat = require ('path');
var db = new DataStore({ filename: dat.join(__dirname, 'nuts-stats.db'), autoload: true});

var nutsstats = [];

module.exports.register = (app) => {
    /*
    //Get al info (tabla)
    app.get("/info/nuts-production-stats", (request,response) => {
        response.send("<html><body><h1>En esta tabla se muestran los datos de la producción de almendras, nueces y pistachos en los diferentes países que más rendimiento sacan de ello</h1><table border><tr><th>country</th><th>year</th><th>almond</th><th>walnut</th><th>pistachio</th></tr><tr><th>Spain</th><th>2011</th><th>208800</th><th>13815</th><th>2708</th></tr><tr><th>Italy</th><th>2011</th><th>104790</th><th>10500</th><th>3079</th></tr><tr><th>Greece</th><th>2011</th><th>29800</th><th>29800</th><th>7791</th></tr><tr><th>Turkey</th><th>2011</th><th>69838</th><th>203212</th><th>112000</th></tr><tr><th>USA</th><th>2011</th><th>1655000</th><th>418212</th><th>201395</th></tr></table></body></html>");
        console.log("New request to /info/nuts-production-stats has arrived");
    });
    */
    //GET loadInitialData
    app.get(BASE_NUTS_API_PATH+"nuts-production-stats/loadInitialData", (req, res) =>{
        
        console.log("NEW GET .../nuts-production-stats/loadInitialData");

        var nutsstatsInitial = [
            {
                "country": "Spain",
                "year": 2011,
                "almond": 208800,
                "walnut": 13815,
                "pistachio": 2708
            },
            {
                "country": "Italy",
                "year": 2011,
                "almond": 104790,
                "walnut": 10500,
                "pistachio": 3079
            },
            {
                "country": "Greece",
                "year": 2011,
                "almond": 29800,
                "walnut": 29800,
                "pistachio": 7791
            },
            {
                "country": "Turkey",
                "year": 2011,
                "almond": 69838,
                "walnut": 203212,
                "pistachio": 112000
            },
            {
                "country": "USA",
                "year": 2011,
                "almond": 1655000,
                "walnut": 418212,
                "pistachio": 201395
            },
            {
                "country": "Spain",
                "year": 2010,
                "almond": 22518,
                "walnut": 13525,
                "pistachio": 2722
            },
            {
                "country": "Italy",
                "year": 2010,
                "almond": 108160,
                "walnut": 14000,
                "pistachio": 2852
            },
            {
                "country": "Greece",
                "year": 2010,
                "almond": 32900,
                "walnut": 22200,
                "pistachio": 7902
            },
            {
                "country": "Turkey",
                "year": 2010,
                "almond": 55398,
                "walnut": 178142,
                "pistachio": 128000
            },
            {
                "country": "USA",
                "year": 2010,
                "almond": 1413800,
                "walnut": 457221,
                "pistachio": 236775
            },
            {
                "country": "Spain",
                "year": 2009,
                "almond": 270686,
                "walnut": 13299,
                "pistachio": 2783
            },
            {
                "country": "Italy",
                "year": 2009,
                "almond": 106660,
                "walnut": 12000,
                "pistachio": 3110
            },
            {
                "country": "Greece",
                "year": 2009,
                "almond": 39996,
                "walnut": 22000,
                "pistachio": 7939
            },
            {
                "country": "Turkey",
                "year": 2009,
                "almond": 54844,
                "walnut": 177298,
                "pistachio": 81795
            },
            {
                "country": "USA",
                "year": 2009,
                "almond": 1162200,
                "walnut": 396440,
                "pistachio": 161025
            }
        ];
        
       //Borrar db y cargar los datos iniciales
        db.remove({},{multi:true},function(err,numRemoved){});
        db.insert(nutsstatsInitial);
        res.sendStatus(200);
        console.log("Initial data loaded:"+JSON.stringify(nutsstatsInitial,null,2));
    });

    //GET a toda la lista de recursos
    app.get(BASE_NUTS_API_PATH+"nuts-production-stats", (req, res) =>{
        
        var query = req.query;
        var offset = query.offset;
        var limit = query.limit;
        delete query.offset;
        delete query.limit;

        //Pasamos los atributos de la query a Int
        if(query.hasOwnProperty("year")){
            query.year = parseInt(query.year);
        }
        if(query.hasOwnProperty("almond")){
            query.almond = parseInt(query.almond);
        }
        if(query.hasOwnProperty("walnut")){
            query.walnut = parseInt(query.walnut);
        }
        if(query.hasOwnProperty("pistachio")){
            query.pistachio = parseInt(query.pistachio);
        }

        db.find(query).skip(offset).limit(limit).exec((err, nutsInDB) => {
            if(err){
                console.error("ERROR accesing DB in GET");
                res.sendStatus(500);
            }
            else{
                if(nutsInDB.length == 0){
                    /*
                    console.error("No data found");
                    res.sendStatus(404);
                    */
                    var send = [];
                    console.log(`NEW GET to empty list`);
                    res.status(200).send(JSON.stringify(send, null, 2));
                }
                else{
                    var dataToSend = nutsInDB.map((c)=>{
                        return {country : c.country, year : c.year, almond : c.almond, walnut : c.walnut, pistachio : c.pistachio};
                    })
                    /*
                    if(dataToSend.length==1){
                        var objectToSend = dataToSend[0];
                        res.send(JSON.stringify(objectToSend, null, 2));
                        console.log("Data sent:"+JSON.stringify(objectToSend, null, 2));
                    }else{*/
                        res.send(JSON.stringify(dataToSend, null, 2));
                        console.log("Data sent:"+JSON.stringify(dataToSend, null, 2));
                    //}
                    
                }
            }
        });
    });

    //GET a un recurso concreto
    app.get(BASE_NUTS_API_PATH+"nuts-production-stats/:country/:year", (req, res) => {
        var reqCountry = req.params.country;
        var reqYear = parseInt(req.params.year);
        
        db.find({country: reqCountry, year: reqYear}, {_id: 0}, function (err, data) {
            if (err) {
                console.error("ERROR in GET");
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    console.error("No data found");
                    res.sendStatus(404);
                } else {
                    var send = data[0];
                    console.log(`NEW GET to <${reqCountry}>, <${reqYear}>`);
                    res.status(200).send(JSON.stringify(send, null, 2));
                }
            }
        });
    });

    //GET a un recurso concreto ERROR 1
    app.get(BASE_NUTS_API_PATH+"nuts-production-stats/:data", (req, res) => {
        console.error("BAD REQUEST");
        res.sendStatus(400).send("Incorrect fields");
    });

    //POST para crear un nuevo recurso en nuestra lista
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats", (req, res) => {
        console.log("New POST .../nuts-production-stats");
        var newData = req.body;
        var country = req.body.country;
        var year = parseInt(req.body.year);
        db.find({"country":country, "year":year}).exec((err, data)=>{
            if(err){
                console.error("ERROR in GET");
                res.sendStatus(500);
            }else {
                if(data.length == 0){
                    if (!newData.country 
                        || !newData.year 
                        || !newData['almond'] 
                        || !newData['walnut'] 
                        || !newData['pistachio']
                        || Object.keys(newData).length != 5){
                        console.log("The data is not correct");
                        return res.sendStatus(400);
                    }else{
                        console.log("Data imput:"+JSON.stringify(newData, null, 2));
                        db.insert(newData);
                        res.sendStatus(201);
                    }

                }else{
                    res.sendStatus(409);
                    console.log("the data already exist");
                }
            }
        });
    });

    //DELETE a /country/year
    app.delete(BASE_NUTS_API_PATH+"nuts-production-stats/:country/:year", (req,res)=>{
		console.log("NEW DELETE .....nuts-production-stats/:country/:year");
			var reqcountry = req.params.country;
			var reqyear = parseInt(req.params.year);
			db.remove({country:reqcountry,year:reqyear},{multi:true}, (err, salida) => {
				if(salida==1){
					console.log("DATA REMOVED");
					res.sendStatus(200);
				}else{
					console.log("DATA NOT FOUND");
					res.sendStatus(404);
				}
			});
	});

    // PUT a country/year
    app.put(BASE_NUTS_API_PATH+"nuts-production-stats/:country/:year", (req,res) => {
				
		var country = req.params.country;
		var year = parseInt(req.params.year);
		var body = req.body;
		
		db.find({"country":country, "year":year}, (err, dataFound) => {
			
			if(dataFound.length == 0) {
				res.sendStatus(404, "DATA NOT FOUND");
				console.log("Data not found");
			} else if(body.country != country || body.year != year || !body.country || !body.year || !body["almond"] || !body["walnut"] || !body["pistachio"] || Object.keys(body).length != 5){
				res.sendStatus(400, "FORMAT NOT VALID");
				console.log("The format is not valid");
			} else {
				db.update({"country":country,"year":year}, {$set:body});
				res.sendStatus(200);
				console.log("Data updated");
			}
		});
		
	});

    // POST a country/year error
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:country", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:year", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:production", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:exportation", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:distribution", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    })
    app.post(BASE_NUTS_API_PATH+"nuts-production-stats/:country/:year", (req,res)=>{
        console.log("NEW POST ...../nuts-production-stats/country/year");
        res.status(405).send("NOT ALLOWED");
    });

    //PUT a lista error
    app.put(BASE_NUTS_API_PATH+"nuts-production-stats", (req,res)=>{
        console.log("NEW PUT ...../nuts-production-stats");
        res.status(405).send("NOT ALLOWED");
    })

    // DELETE a lista
    app.delete(BASE_NUTS_API_PATH+"nuts-production-stats", (req,res)=>{
        db.remove({}, {multi:true}, function (err,numRemoved) {
            if (err) {
                console.error("ERROR deleting DB contacts in DELETE");
                res.sendStatus(500);
            }else{
                if(numRemoved == 0){
                    console.error("ERROR nuts-stats not found");
                    res.sendStatus(404);
                } else {
                    res.sendStatus(200);
                }
            }
        });
        
    });

}