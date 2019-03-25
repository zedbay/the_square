const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  r = require("request");

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'azerty'));
const session = driver.session();

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    console.log('hello world');
    return (res.status(200).json({}));
});

app.post('/login', function(req, res) {
    console.log('** Tentative de connexion **');
    session.run(
        "MATCH (a:Person { email: $email, password: $password }) RETURN a",
        {
            email: req.body['email'],
            password: req.body['password']
        }
    ).then(function(result) {
        session.close();
        driver.close();
        if (result.records[0] === undefined) {
            console.log('*** connexion refusé ***');
            return res.status(200).json({ success: false });  
        } else {
            console.log('*** connexion authorisé ***');
           return res.status(200).json({ test: result.records[0].get(0).properties, success: true }); 
        }      
    });
    
})

app.post('/create/user', function(req, res) {
    console.log('** Creation d\'un utilisateur **');
    session.run(
        "CREATE (:Person { email: $email, password: $password, prenom: $prenom, name: $nom })",
        { 
            email: req.body['email'],
            password: req.body['password'],
            prenom: req.body['prenom'],
            nom: req.body['nom']
        }
    ).then(() => { session.close(); driver.close(); })
    return (res.status(200).json({ success: true }));
});

app.listen(8080, () => {
    console.log('App listen on port 8080');
});