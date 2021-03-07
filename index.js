const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
var request = require('request');

//accounts
const accounts = [{
    id: 1,
    name: "Selena",
    likes: "country"
}, {
    id: 2,
    name: "Enrique",
    likes: "hardrock"

}]

//app.use(express.static(dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Handlebars setting
app.set("view engine","hbs");
app.engine('.hbs',exphbs({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
}));

const port = 8900;
app.listen(port);
console.log(`Listening to server: http://localhost:${port}`);
//console.clear();


/////landing page///////
app.get('/', (req,res)=>{
res.render("home.hbs");

})

app.get("/about", (req,res)=>{
    res.render("about.hbs")
})

app.get("/contact", (req,res)=>{
    res.render("contact.hbs")
})

app.get("/accounts", (req,res)=>{

    const model = {
        accounts
    }
    res.render("accounts.hbs", model)
})

app.get("/accounts/:id", (req,res)=>{

    const id = request.params.id

    const account = accounts.find(
        acc => acc.id == id
    )

    const model = {
        account
    }
    res.render("account.hbs", model)
})
