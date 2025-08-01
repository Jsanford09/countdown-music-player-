class MusicPlayer {
    constructor() {
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.repeatMode = 'none'; // 'none', 'one', 'all'
        this.volume = 0.7;
        
        // Initialize tracks data
        this.tracks = [
            {
                title: "Ordinary",
                artist: "Alex Warren",
                albumArt: "assets/images/album1.jpg",
                audioSrc: "",
                duration: "3:26",
                chartStats: {
                    currentPos: 1,
                    lastWeek: 1,
                    peakPos: 1,
                    weeksOnChart: 22
                }
            },
            {
                title: "Flowers",
                artist: "Miley Cyrus",
                albumArt: "assets/images/album2.jpg",
                audioSrc: "",
                duration: "3:20",
                chartStats: {
                    currentPos: 2,
                    lastWeek: 3,
                    peakPos: 1,
                    weeksOnChart: 15
                }
            },
            {
                title: "Anti-Hero",
                artist: "Taylor Swift",
                albumArt: "assets/images/album3.jpg",
                audioSrc: "",
                duration: "3:21",
                chartStats: {
                    currentPos: 3,
                    lastWeek: 2,
                    peakPos: 1,
                    weeksOnChart: 28
                }
            },
            {
                title: "As It Was",
                artist: "Harry Styles",
                albumArt: "assets/images/album4.jpg",
                audioSrc: "",
                duration: "2:47",
                chartStats: {
                    currentPos: 4,
                    lastWeek: 4,
                    peakPos: 1,
                    weeksOnChart: 45
                }
            },
            {
                title: "Unholy",
                artist: "Sam Smith ft. Kim Petras",
                albumArt: "assets/images/album5.jpg",
                audioSrc: "",
                duration: "2:36",
                chartStats: {
                    currentPos: 5,
                    lastWeek: 6,
                    peakPos: 1,
                    weeksOnChart: 18
                }
            },
            {
                title: "Bad Habit",
                artist: "Steve Lacy",
                albumArt: "assets/images/album6.jpg",
                audioSrc: "",
                duration: "3:51",
                chartStats: {
                    currentPos: 6,
                    lastWeek: 5,
                    peakPos: 1,
                    weeksOnChart: 32
                }
            },
            {
                title: "I'm Good (Blue)",
                artist: "David Guetta & Bebe Rexha",
                albumArt: "assets/images/album7.jpg",
                audioSrc: "",
                duration: "2:55",
                chartStats: {
                    currentPos: 7,
                    lastWeek: 8,
                    peakPos: 4,
                    weeksOnChart: 12
                }
            },
            {
                title: "Creepin'",
                artist: "Metro Boomin, The Weeknd, 21 Savage",
                albumArt: "assets/images/album8.jpg",
                audioSrc: "",
                duration: "3:41",
                chartStats: {
                    currentPos: 8,
                    lastWeek: 7,
                    peakPos: 3,
                    weeksOnChart: 25
                }
            },
            {
                title: "Lavender Haze",
                artist: "Taylor Swift",
                albumArt: "assets/images/album9.jpg",
                audioSrc: "",
                duration: "3:22",
                chartStats: {
                    currentPos: 9,
                    lastWeek: 10,
                    peakPos: 2,
                    weeksOnChart: 8
                }
            },
            {
                title: "Kill Bill",
                artist: "SZA",
                albumArt: "assets/images/album10.jpg",
                audioSrc: "",
                duration: "2:33",
                chartStats: {
                    currentPos: 10,
                    lastWeek: 9,
                    peakPos: 2,
                    weeksOnChart: 14
                }
            }
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.loadTrack(this.currentTrackIndex);
        this.renderPlaylist();
    }
    
    initializeElements() {
        // Audio element
        this.audioElement = document.getElementById('audio-player');
        
        // Current track display elements
        this.currentTitle = document.getElementById('current-title');
        this.currentArtist = document.getElementById('current-artist');
        this.currentAlbumArt = document.getElementById('current-album-art');
        this.currentRank = document.getElementById('current-rank');
        this.lastWeekStat = document.getElementById('last-week');
        this.peakPosStat = document.getElementById('peak-pos');
        this.weeksOnChartStat = document.getElementById('weeks-on-chart');
        
        // Control buttons
        this.mainPlayBtn = document.getElementById('main-play-btn');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.shuffleBtn = document.getElementById('shuffle-btn');
        this.repeatBtn = document.getElementById('repeat-btn');
        this.volumeBtn = document.getElementById('volume-btn');
        
        // Progress elements
        this.currentTime = document.getElementById('current-time');
        this.totalTime = document.getElementById('total-time');
        this.progressBarContainer = document.querySelector('.progress-bar-container');
        this.progressFill = document.getElementById('progress-fill');
        this.progressHandle = document.getElementById('progress-handle');
        
        // Volume elements
        this.volumeBarContainer = document.querySelector('.volume-bar-container');
        this.volumeFill = document.getElementById('volume-fill');
        this.volumeHandle = document.getElementById('volume-handle');
        
        // Download button
        this.downloadBtn = document.getElementById('download-btn');
        
        // Playlist element
        this.playlist = document.getElementById('playlist');
    }
    
    bindEvents() {
        // Play/pause buttons
        this.mainPlayBtn.addEventListener('click', () => this.togglePlay());
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Control buttons
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.volumeBtn.addEventListener('click', () => this.toggleMute());
        
        // Download button
        this.downloadBtn.addEventListener('click', () => this.downloadCurrentTrack());
        
        // Progress bar
        this.progressBarContainer.addEventListener('click', (e) => this.seekTo(e));
        
        // Volume bar
        this.volumeBarContainer.addEventListener('click', (e) => this.setVolumeFromClick(e));
        
        // Audio events
        this.audioElement.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioElement.addEventListener('timeupdate', () => this.updateProgress());
        this.audioElement.addEventListener('ended', () => this.handleTrackEnd());
        
        // Playlist item clicks
        this.playlist.addEventListener('click', (e) => {
            const playlistItem = e.target.closest('.playlist-item');
            if (playlistItem) {
                const index = parseInt(playlistItem.dataset.index);
                this.selectTrack(index);
            }
        });
    }
    
    loadTrack(index) {
        const track = this.tracks[index];
        
        // Update current track display
        this.currentTitle.textContent = track.title;
        this.currentArtist.textContent = track.artist;
        this.currentAlbumArt.src = track.albumArt;
        this.currentRank.textContent = track.chartStats.currentPos;
        
        // Update chart statistics
        this.lastWeekStat.textContent = track.chartStats.lastWeek;
        this.peakPosStat.textContent = track.chartStats.peakPos;
        this.weeksOnChartStat.textContent = track.chartStats.weeksOnChart;
        
        // Update total time
        this.totalTime.textContent = track.duration;
        
        // Load audio (for demo, we'll just simulate)
        if (track.audioSrc) {
            this.audioElement.src = track.audioSrc;
        }
    }
    
    renderPlaylist() {
        this.playlist.innerHTML = '';
        
        this.tracks.forEach((track, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = `playlist-item ${index === this.currentTrackIndex ? 'active' : ''}`;
            playlistItem.dataset.index = index;
            
            playlistItem.innerHTML = `
                <div class="track-rank">#${track.chartStats.currentPos}</div>
                <div class="track-thumbnail">
                    <img src="${track.albumArt}" alt="${track.title}">
                </div>
                <div class="track-info">
                    <h4>${track.title}</h4>
                    <p>${track.artist}</p>
                </div>
                <div class="chart-info">
                    <span>Last Week</span>
                    <div class="last-week">${track.chartStats.lastWeek}</div>
                </div>
                <div class="chart-info">
                    <span>Peak Pos.</span>
                    <div class="last-week">${track.chartStats.peakPos}</div>
                </div>
                <div class="chart-info">
                    <span>Weeks</span>
                    <div class="last-week">${track.chartStats.weeksOnChart}</div>
                </div>
                <div class="track-duration">${track.duration}</div>
            `;
            
            this.playlist.appendChild(playlistItem);
        });
    }
    
    selectTrack(index) {
        this.currentTrackIndex = index;
        this.loadTrack(index);
        this.renderPlaylist();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.isPlaying = true;
        this.mainPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // For demo purposes, we'll simulate audio playback
        if (this.audioElement.src) {
            this.audioElement.play();
        }
    }
    
    pause() {
        this.isPlaying = false;
        this.mainPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        if (this.audioElement.src) {
            this.audioElement.pause();
        }
    }
    
    previousTrack() {
        if (this.currentTrackIndex > 0) {
            this.selectTrack(this.currentTrackIndex - 1);
        } else {
            this.selectTrack(this.tracks.length - 1);
        }
    }
    
    nextTrack() {
        if (this.currentTrackIndex < this.tracks.length - 1) {
            this.selectTrack(this.currentTrackIndex + 1);
        } else {
            this.selectTrack(0);
        }
    }
    
    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active', this.isShuffled);
    }
    
    toggleRepeat() {
        const modes = ['none', 'all', 'one'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];
        
        this.repeatBtn.classList.toggle('active', this.repeatMode !== 'none');
        
        if (this.repeatMode === 'one') {
            this.repeatBtn.innerHTML = '<i class="fas fa-redo"></i><span>1</span>';
        } else {
            this.repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
        }
    }
    
    toggleMute() {
        if (this.volume > 0) {
            this.previousVolume = this.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume || 0.7);
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.volumeFill.style.width = `${this.volume * 100}%`;
        this.audioElement.volume = this.volume;
        
        // Update volume icon
        if (this.volume === 0) {
            this.volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (this.volume < 0.5) {
            this.volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            this.volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    setVolumeFromClick(e) {
        const rect = this.volumeBarContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.setVolume(percent);
    }
    
    seekTo(e) {
        const rect = this.progressBarContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        
        if (this.audioElement.duration) {
            this.audioElement.currentTime = percent * this.audioElement.duration;
        }
    }
    
    updateProgress() {
        if (this.audioElement.duration) {
            const percent = (this.audioElement.currentTime / this.audioElement.duration) * 100;
            this.progressFill.style.width = `${percent}%`;
            this.currentTime.textContent = this.formatTime(this.audioElement.currentTime);
        }
    }
    
    updateDuration() {
        this.totalTime.textContent = this.formatTime(this.audioElement.duration);
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    handleTrackEnd() {
        if (this.repeatMode === 'one') {
            this.selectTrack(this.currentTrackIndex);
            this.play();
        } else if (this.repeatMode === 'all' || this.currentTrackIndex < this.tracks.length - 1) {
            this.nextTrack();
            if (this.isPlaying) {
                this.play();
            }
        } else {
            this.pause();
        }
    }
    
    downloadCurrentTrack() {
        const track = this.tracks[this.currentTrackIndex];
        
        // For demo purposes, we'll create a download link
        // In a real application, this would link to actual audio files
        if (track.audioSrc && track.audioSrc !== '') {
            // If there's a real audio source, download it
            const link = document.createElement('a');
            link.href = track.audioSrc;
            link.download = `${track.artist} - ${track.title}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // For demo purposes, show a message
            const message = `Download "${track.title}" by ${track.artist}`;
            
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #008080, #20b2aa);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 128, 128, 0.3);
                z-index: 1000;
                font-weight: 600;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;
            
            // Add animation keyframes
            if (!document.querySelector('#download-notification-styles')) {
                const style = document.createElement('style');
                style.id = 'download-notification-styles';
                style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
        
        // Analytics or tracking could be added here
        console.log(`Download requested for: ${track.title} by ${track.artist}`);
    }
}

// Initialize the music player when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});

