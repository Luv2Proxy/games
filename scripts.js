// Path to the games folder
const gamesPath = './alu-games-main/';

// Function to load games from games.json
async function loadGameList() {
    const gameList = document.getElementById('game-list');

    try {
        // Fetch games.json
        const response = await fetch('games.json');
        const data = await response.json();

        // Loop through game folders
        data.games.forEach(folderName => {
            // Create a button
            const button = document.createElement('button');
            button.classList.add('game-button');
            button.onclick = () => loadGame(folderName);

            // Add the logo
            const logo = document.createElement('img');
            logo.src = `${gamesPath}${folderName}/logo.png`;
            logo.alt = folderName;
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

// Function to load a selected game into the iframe
function loadGame(folderName) {
    const gameFrame = document.getElementById('game-frame');
    gameFrame.src = `${gamesPath}${folderName}/index.html`;
}

// Initialize the game list
loadGameList();
