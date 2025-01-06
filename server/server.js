import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.get('/', async function(req, res) {
    const response = await fetch('https://potterapi-fedeperin.vercel.app/en/characters');
    const characters = await response.json();
    const gryffindor = await characters.filter(getHouse);

    function getHouse(character) {
        return character.hogwartsHouse != "Gryffindor"
    }

    var tagline = "No programming concept is complete without a cute animal mascot.";
    res.render('pages/index', {
        tagline: tagline,
        imageUrl: '/images/hogwarts.png',
        characters: characters,
        houseMates: gryffindor
    });
});

app.get('/about', function(req, res) {
    res.render('pages/about');
})


app.listen(process.env.PORT|5000, () => {
    console.log('server started on port ', process.env.PORT|5000)
})