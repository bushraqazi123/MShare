const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
var request = require('request')
const { response } = require('express')

const port = 8900
app.listen(port)
console.log(`Listening to server: http://localhost:${port}`)
//console.clear()

//accounts
const accounts = [{
    id: 1,
    name: "Selena",
    favorite: "country"
}, {
    id: 2,
    name: "Enrique",
    favorite: "hardrock"

}]

//your playlists
const playlists = [{
    trackid: 1,
    song: "Star Boy",
    artist: "Weekend",
    genre: "R&B"
}, {
    trackid: 2,
    song: "Don't Start Now",
    artist: "Dua Lipa",
    genre: "Pop"

}]

//let nextaccountId = 3

app.use(express.static("static"))
app.use(bodyParser.urlencoded({extended: false}))

//Handlebars setting
app.set("view engine","hbs");
app.engine('.hbs',exphbs({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
}));


app.get("/layout.css")

/////landing page///////
app.get('/', function(req, res){
res.render("home.hbs");

})

app.get("/about", (req,res)=>{
    res.render("about.hbs")
})

app.get("/contact", (req,res)=>{
    res.render("contact.hbs")
})

app.get("/accounts", (req, res)=>{

    const model = {
        accounts
    }
    res.render("accounts.hbs", model)
})

app.get("/your-playlists", function(req, res){

    const model2 = {
        playlists
    }
    res.render("playlists.hbs", model2)
})

app.get("/signup", function(req, res){

    res.render("signup.hbs")
})

app.post("/signup", function(request, response){

    const name = request.body.username
    const favorite = request.body.favoritegenre

    const account = {
        name,
        favorite,
        id: accounts.length + 1
    }

    accounts.push(account)

    response.redirect("/accounts/"+account.id)

})

app.get("/create-playlist", function(req, res){

    res.render("create-playlist.hbs")
})

app.post("/create-playlist", function(request, response){

    const song = request.body.track
    const artist = request.body.trackartist
    const genre = request.body.trackgenre

    const playlist = {
        song,
        artist,
        genre,
        trackid: playlists.length + 1

        
    }

    playlists.push(playlist)

    response.redirect("/your-playlists/"+playlist.trackid)

})

app.post("/delete-playlist/:trackid", function(request, response){

    const playlistIndex = playlists.findIndex(
        play => play.trackid == trackid
    )

    playlists.splice(playlistIndex, 1)
    
    response.redirect("/your-playlists")
    
    })

    app.get("/edit-playlist/:trackid", function(request, response){

        const trackid = request.params.trackid
    
        const playlist = playlists.find(
            play=> play.trackid == trackid
        )
    
        const model2 = {
            playlist
        }
    
        response.render("edit-playlist.hbs", model2)
    })
    
    app.post("/edit-playlist/:trackid", function(request, response){
        const id = request.params.trackid
        const newSong = request.body.song
        const newArtist = request.body.artist
        const newGenre = request.body.genre
    
        const playlist = playlists.find(
            play => play.trackid == trackid
        )
        playlist.song = newSong
        playlist.artist = newArtist
        playlist.genre = newGenre
    
        response.redirect("/edit-playlist/"+trackid)
    
    })

app.get("/edit-account/:id", function(request, response){

    const id = request.params.id

    const account = accounts.find(
        acc=> acc.id == id
    )

    const model = {
        account
    }

    response.render("edit-account.hbs", model)
})

app.post("/edit-account/:id", function(request, response){
    const id = request.params.id
    const newName = request.body.name
    const newFav = request.body.favoritegenre

    const account = accounts.find(
        acc => acc.id == id
    )
    account.name =newName
    account.favorite = newFav

    response.redirect("/edit-account/"+id)

})

app.post("/delete-account/:id", function(request, response){

const id = request.params.id

const accountIndex = accounts.findIndex(
    acc => acc.id == id
)

accounts.splice(accountIndex, 1)

response.redirect("/accounts")

})

app.get("/accounts/:id", function(request, response){

    const id = request.params.id

    const account = accounts.find(
        acc => acc.id == id
    )

    const model = {
        account
    }
    response.render("account.hbs", model)
})
