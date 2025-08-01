# The Big Cheer Energy Top Hits Countdown - Music Player Requirements

## Project Overview
Create a comprehensive audio music player widget featuring "The Big Cheer Energy Top Hits Countdown" with Billboard-style chart statistics and a prominent now-playing display.

## Key Features Required

### 1. Layout Structure
- **Large Now Playing Section**: Positioned on the LEFT SIDE with prominent display
- **Playlist Display**: Shows 10 tracks automatically with rankings #1-10
- **Chart Title**: "The Big Cheer Energy Top Hits Countdown"

### 2. Now Playing Features (Left Side)
- Large album thumbnail/artwork
- Song title and artist name
- Audio progress bar with time display
- Play/pause, next/previous controls
- Volume control
- Repeat and shuffle options

### 3. Playlist Features (Right Side)
- Ranked list showing positions #1-10
- Large album thumbnails for each track
- Song title and artist for each track
- Track duration display

### 4. Billboard-Style Chart Statistics
For each track, display:
- **Current Position**: #1-10 ranking
- **Last Week Position**: Previous week's ranking
- **Peak Position**: Highest position ever held
- **Weeks on Chart**: Total weeks the song has been charted

### 5. Visual Design Elements
- Clean, modern interface similar to reference player
- Large, prominent album artwork
- Clear typography for readability
- Responsive design for different screen sizes
- Professional chart-style layout inspired by Billboard Hot 100

### 6. Technical Requirements
- HTML5 audio player functionality
- CSS for responsive design and styling
- JavaScript for player controls and interactivity
- Sample audio tracks for demonstration
- Mock chart data for statistics display

## Reference Analysis

### From Elfsight Audio Player:
- Clean, minimalist design
- Circular album artwork
- Progress bar with time display
- Playlist with thumbnails
- Play/pause and navigation controls

### From Billboard Hot 100:
- Chart ranking format with positions
- Statistics display (Last Week, Peak Pos., Weeks on Chart)
- Professional layout with clear hierarchy
- Large album thumbnails
- Artist and song information layout

## File Structure
```
music-player/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── player.js
├── assets/
│   ├── images/
│   └── audio/
└── data/
    └── tracks.json
```

