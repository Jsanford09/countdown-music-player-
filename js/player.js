document.addEventListener("DOMContentLoaded", () => {
  fetch('data/tracks.json')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(tracks => {
      initializePlayer(tracks);
    })
    .catch(error => console.error('Error loading tracks.json:', error));
});

function initializePlayer(tracks) {
  let currentTrackIndex = 0;
  const audio = new Audio();

  const nowPlayingTitle = document.getElementById('current-title');
  const nowPlayingArtist = document.getElementById('current-artist');
  const nowPlayingImage = document.getElementById('current-image');
  const playlistContainer = document.getElementById('playlist');

  function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.audioSrc;
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist;
    nowPlayingImage.src = track.imageSrc;
    audio.play();
  }

  function buildPlaylist() {
    playlistContainer.innerHTML = '';
    tracks.forEach((track, index) => {
      const item = document.createElement('div');
      item.classList.add('playlist-item');
      item.innerHTML = `
        <img src="${track.imageSrc}" alt="${track.title}" />
        <div>
          <strong>${track.title}</strong><br/>
          <small>${track.artist}</small>
        </div>
      `;
      item.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(index);
      });
      playlistContainer.appendChild(item);
    });
  }

  buildPlaylist();
  loadTrack(currentTrackIndex);
}
