// Path to the games JSON file
const gamesJsonPath = '/games/games.json';
const gamesPath = '/games/alu-games-main/';

// Add buttons dynamically with logos
async function loadGameList() {
    const gameList = document.getElementById('game-list');

    try {
        const response = await fetch(gamesJsonPath);
        const data = await response.json(); // Parse JSON
        const games = data.games; // Get the games array

        games.forEach(folderName => {
            // Create the button
            const button = document.createElement('button');
            button.classList.add('game-button');
            button.onclick = () => loadGame(folderName);

            // Add the logo
            const logoPath = `${gamesPath}${folderName}/logo.png`;
            const logo = document.createElement('img');
            
            logo.src = logoPath;
            logo.alt = `${folderName}`;
            logo.classList.add('game-logo');

            // Add the game name
            const text = document.createElement('span');
            text.textContent = folderName;

            // Append logo and text to the button
            button.appendChild(logo);
            button.appendChild(text);

            // Append the button to the game list
            gameList.appendChild(button);
        });
    } catch (error) {
        console.error('Error loading game list:', error);
    }
}

// Load a game into the iframe
function loadGame(folderName) {
    const gameFrame = document.getElementById('game-frame');
    gameFrame.src = `${gamesPath}${folderName}/`;
}

// Initialize the game list
loadGameList();
