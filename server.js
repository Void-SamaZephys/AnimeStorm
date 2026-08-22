const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const animeler = [
    {
        id: "solo-leveling",
        baslik: "Solo Leveling",
        resim: "https://via.placeholder.com/300x400?text=Solo+Leveling",
        bolumler: [
            { no: 1, baslik: "Bölüm 1", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
            { no: 2, baslik: "Bölüm 2", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
    },
    {
        id: "jujutsu-kaisen",
        baslik: "Jujutsu Kaisen",
        resim: "https://via.placeholder.com/300x400?text=Jujutsu+Kaisen",
        bolumler: [
            { no: 1, baslik: "Bölüm 1", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
        ]
    }
];

app.get('/', (req, res) => {
    res.render('index', { animeler, siteAdi: "AnimeStorm" });
});

app.get('/watch/:animeId/:bolumNo', (req, res) => {
    const anime = animeler.find(a => a.id === req.params.animeId);
    if (!anime) return res.send("Anime bulunamadı.");
    
    const bolum = anime.bolumler.find(b => b.no == req.params.bolumNo);
    if (!bolum) return res.send("Bölüm bulunamadı.");

    res.render('watch', { anime, bolum, siteAdi: "AnimeStorm" });
});

app.listen(PORT, () => {
    console.log(`AnimeStorm sunucusu aktif: http://localhost:${PORT}`);
});

