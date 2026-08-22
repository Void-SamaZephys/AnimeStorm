let animeData = [];

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    animeData = data;
    renderAnimeGrid(animeData);
  })
  .catch(err => console.error("Data çekilemedi:", err));

function renderAnimeGrid(list) {
  const grid = document.getElementById('animeGrid');
  if (!grid) return;
  grid.innerHTML = '';

  list.forEach(anime => {
    let card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `<img src="${anime.image}" alt="${anime.title}"><h3>${anime.title}</h3>`;
    card.onclick = () => openModal(anime);
    grid.appendChild(card);
  });
}

function openModal(anime) {
  document.getElementById('modalTitle').textContent = anime.title;
  document.getElementById('modalImage').src = anime.image;
  document.getElementById('modalDescription').textContent = anime.description;

  let fansubSec = document.getElementById('fansubSection');
  let fansubLnk = document.getElementById('fansubLink');
  if (anime.fansub) {
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

  if (anime.episodes) {
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

  if (ep.sources) {
    ep.sources.forEach((s, idx) => {
      let b = document.createElement('button');
      b.className = 'episode-btn';
      b.textContent = s.name;
      b.onclick = () => {
        document.getElementById('videoPlayer').src = s.url;
      };
      srcContainer.appendChild(b);
      if (idx === 0) b.click();
    });
  }
}

document.getElementById('closeModal').onclick = () => {
  document.getElementById('detailModal').style.display = 'none';
  document.getElementById('videoPlayer').src = '';
};

// Steam Tarzı Arama
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';

    if (value === '') return;

    const filtered = animeData.filter(anime =>
      anime.title.toLowerCase().includes(value)
    );

    filtered.forEach(anime => {
      let item = document.createElement('div');
      item.className = 'search-item';
      item.innerHTML = `<img src="${anime.image}" alt="${anime.title}"><span>${anime.title}</span>`;
      
      item.onclick = () => {
        searchResults.innerHTML = '';
        searchInput.value = '';
        openModal(anime);
      };
      searchResults.appendChild(item);
    });
  });
}

// =======================
// PROFİL YÖNETİMİ (localStorage)
// =======================
const openProfileBtn = document.getElementById('openProfileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfileModal = document.getElementById('closeProfileModal');
const saveProfileBtn = document.getElementById('saveProfileBtn');

const usernameInput = document.getElementById('usernameInput');
const avatarSeedInput = document.getElementById('avatarSeedInput');
const navUsername = document.getElementById('navUsername');
const navAvatar = document.getElementById('navAvatar');
const profileAvatarPreview = document.getElementById('profileAvatarPreview');

// Sayfa yüklendiğinde var olan profili yükle
function loadProfile() {
  const savedName = localStorage.getItem('animestorm_username') || 'W';
  const savedSeed = localStorage.getItem('animestorm_avatar_seed') || 'W';

  usernameInput.value = savedName;
  avatarSeedInput.value = savedSeed;
  navUsername.textContent = savedName;

  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(savedSeed)}`;
  navAvatar.src = avatarUrl;
  profileAvatarPreview.src = avatarUrl;
}

// Profili Kaydet
saveProfileBtn.onclick = () => {
  const newName = usernameInput.value.trim() || 'Kullanıcı';
  const newSeed = avatarSeedInput.value.trim() || 'default';

  localStorage.setItem('animestorm_username', newName);
  localStorage.setItem('animestorm_avatar_seed', newSeed);

  loadProfile();
  profileModal.style.display = 'none';
};

// Avatar Tohumu değiştikçe önizlemeyi anlık güncelle
avatarSeedInput.addEventListener('input', (e) => {
  const seed = e.target.value.trim() || 'default';
  profileAvatarPreview.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`;
});

openProfileBtn.onclick = () => {
  profileModal.style.display = 'flex';
};

closeProfileModal.onclick = () => {
  profileModal.style.display = 'none';
};

// Sayfa açıldığında çalıştır
loadProfile();

