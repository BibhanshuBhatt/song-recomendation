const YOUTUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=';

// Function to get recommendations
function getRecommendations() {
    const username = document.getElementById('username').value;
    const genre = document.getElementById('genre').value;

    if (!username) {
        alert('Please enter a valid username.');
        return;
    }

    // Fetch recommended songs based on username and genre
    fetch(`/api/recommendations?username=${username}&genre=${genre}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Recommended songs:', data); // Debug log
            displayRecommendations(data);
        })
        .catch(error => console.error('Error fetching recommendations:', error));
}

// Function to get songs by genre
function getSongsByGenre() {
    const genre = document.getElementById('genre').value;

    // Fetch songs by selected genre
    fetch(`/api/songs?genre=${genre}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Filtered songs by genre:', data); // Debug log
            displayAllSongs(data);
        })
        .catch(error => console.error('Error fetching songs by genre:', error));
}

// Function to create a YouTube search URL
function createYouTubeSearchURL(query) {
    return `${YOUTUBE_SEARCH_URL}${encodeURIComponent(query)}`;
}

// Function to display recommended songs
function displayRecommendations(songs) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '<h2>Recommended Songs</h2>';

    if (songs.length === 0) {
        recommendationsDiv.innerHTML += '<p>No recommended songs found for this user.</p>';
        return;
    }

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <a href="${createYouTubeSearchURL(song.title + ' ' + song.artist)}" target="_blank">
                <strong>${song.title}</strong> by ${song.artist} - Genre: ${song.genre}
            </a>
        `;
        recommendationsDiv.appendChild(songDiv);
    });
}

// Function to display all songs
function displayAllSongs(songs) {
    const allSongsDiv = document.getElementById('all-songs');
    allSongsDiv.innerHTML = '<h2>All Songs</h2>';

    if (songs.length === 0) {
        allSongsDiv.innerHTML += '<p>No songs available in this genre.</p>';
        return;
    }

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'song';
        songDiv.innerHTML = `
            <a href="${createYouTubeSearchURL(song.title + ' ' + song.artist)}" target="_blank">
                <strong>${song.title}</strong> by ${song.artist} - Genre: ${song.genre}
            </a>
        `;
        allSongsDiv.appendChild(songDiv);
    });
}
