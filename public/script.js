let animeData = [];

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        animeData = data;
        let grid = document.getElementById('animeGrid');
        grid.innerHTML = '';
        data.forEach(anime => {
            let card = document.createElement('div');
            card.className = 'anime-card';
            card.innerHTML = `<img src="${anime.image}"><h3>${anime.title}</h3>`;
            card.onclick = () => openModal(anime);
            grid.appendChild(card);
        });
    });

function openModal(anime) {
    document.getElementById('modalTitle').textContent = anime.title;
    document.getElementById('modalImage').src = anime.image;
    document.getElementById('modalDescription').textContent = anime.description || '';
    
    let fansubSec = document.getElementById('fansubSection');
    let fansubLnk = document.getElementById('fansubLink');
    if(anime.fansub) {
        fansubSec.style.display = 'block';
        fansubLnk.textContent = anime.fansub;
        fansubLnk.href = anime.fansubUrl || '#';
    } else {
        fansubSec.style.display = 'none';
    }

    let epGrid = document.getElementById('episodesGrid');
    epGrid.innerHTML = '';
    document.getElementById('playerSection').style.display = 'none';
    document.getElementById('videoPlayer').src = '';

    if(anime.episodes) {
        anime.episodes.forEach(ep => {
            let btn = document.createElement('button');
            btn.className = 'episode-btn';
            btn.textContent = ep.title;
            btn.onclick = () => playEp(ep);
            epGrid.appendChild(btn);
        });
    }

    document.getElementById('detailModal').style.display = 'flex';
}

function playEp(ep) {
    document.getElementById('currentEpisodeTitle').textContent = ep.title;
    document.getElementById('playerSection').style.display = 'block';
    let srcContainer = document.getElementById('sourcesContainer');
    srcContainer.innerHTML = '';

    if(ep.sources) {
        ep.sources.forEach((s, idx) => {
            let b = document.createElement('button');
            b.className = 'episode-btn';
            b.textContent = s.name;
            b.onclick = () => {
                document.getElementById('videoPlayer').src = s.url.replace('http://', 'https://');
            };
            srcContainer.appendChild(b);
            if(idx === 0) b.click();
        });
    }
}

document.getElementById('closeModal').onclick = () => {
    document.getElementById('detailModal').style.display = 'none';
    document.getElementById('videoPlayer').src = '';
};

document.getElementById('searchInput').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();
    const filtered = animeData.filter(anime => 
        anime.title.toLowerCase().includes(value)
    );
    
    const grid = document.getElementById('animeGrid');
    grid.innerHTML = '';
    
    filtered.forEach(anime => {
        let card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `<img src="${anime.image}" alt="${anime.title}"><h3>${anime.title}</h3>`;
        card.onclick = () => openModal(anime);
        grid.appendChild(card);
    });
});

