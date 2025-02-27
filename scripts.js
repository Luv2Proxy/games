// Path to the games folder
const gamesPath = './games/alu-games-main/';

// A function to check if a file exists

function fileExists(fileUrl){

    var http = new XMLHttpRequest();

    http.open('HEAD', fileUrl, false);
    http.send();

    return http.status != 404;

}

// Add buttons dynamically with logos
async function loadGameList() {
    const gameList = document.getElementById('game-list');

    try {
        const response = await fetch(gamesPath); // Fetch directory listing
        const text = await response.text();

        // Parse folder names from the directory listing
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a')).map(link => link.href);

        links.forEach(link => {
            const folderName = link.split('/').filter(Boolean).pop(); // Extract folder name
            if (folderName && folderName !== '..') {
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
            }
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
