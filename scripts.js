// Games list directly in the script
const games = [
  "1v1.lol",
  "2048",
  "adarkroom",
  "asciispace",
  "asteroids",
  "astray",
  "backcountry",
  "baldisbasics",
  "basketballlegends",
  "basketrandom",
  "blackholesquare",
  "bounceback",
  "breaklock",
  "breakout",
  "btd4",
  "captaincallisto",
  "chess",
  "chromaincident",
  "chromedino",
  "clusterrush",
  "connect3",
  "cookie-clicker",
  "crossyroad",
  "csgoclicker",
  "cubitomayhem",
  "deathrun3d",
  "deepestsword",
  "doodle-jump",
  "drifthunters",
  "drivemad",
  "ducklife",
  "ducklife2",
  "ducklife3",
  "ducklife4",
  "ducklife5",
  "eaglercraft-1-8-8",
  "edgenotfound",
  "eggycar",
  "flappy2048",
  "flappybird",
  "flightsimulator",
  "friendlyfire",
  "geometrydash",
  "gladihoppers",
  "gopherkart",
  "grindcraft",
  "hexgl",
  "hextris",
  "konnekt",
  "letssurf",
  "mergeroundracers",
  "monkeymart",
  "moto-x3m-pool",
  "moto-x3m-spooky",
  "moto-x3m-winter",
  "moto-x3m",
  "ninjavsevilcorp",
  "packabunchas",
  "pacman",
  "pushback",
  "racer",
  "radiusraid",
  "redball4/redball4",
  "retro-bowl/retro-bowl",
  "retrohaunt/retrohaunt",
  "riddleschool2/riddleschool2",
  "roadblocks/roadblocks",
  "rooftopsnipers/rooftopsnipers",
  "shuttledeck",
  "sketchbook04",
  "sleepingbeauty",
  "slope/slope",
  "snake/snake",
  "spacecompany/spacecompany",
  "spacegarden/spacegarden",
  "spacehuggers/spacehuggers",
  "stack/stack",
  "stackball/stackball",
  "themazeofspacegoblins/themazeofspacegoblins",
  "tinyfishing/tinyfishing",
  "tombofthemask/tombofthemask",
  "towermaster/towermaster",
  "tunnelrush/tunnelrush",
  "vex3/vex3",
  "worlds-hardest-game/worlds-hardest-game",
  "worldshardestgame2/worldshardestgame2",
  "xx142b2exe"
];

// Path to the games folder
const gamesPath = 'https://luv2proxy.github.io/games/alu-games-main/';

// Load the game list
function loadGameList() {
    const gameList = document.getElementById('game-list');

    games.forEach(folderName => {
        const button = document.createElement('button');
        button.classList.add('game-button');
        button.onclick = () => loadGame(folderName);

        const logoPath = `${gamesPath}${folderName}/logo.png`;
        const logo = document.createElement('img');
        logo.src = logoPath;
        logo.alt = folderName;
        logo.classList.add('game-logo');

        const text = document.createElement('span');
        text.textContent = folderName;

        button.appendChild(logo);
        button.appendChild(text);
        gameList.appendChild(button);
    });
}

// Load a game into the iframe
function loadGame(folderName) {
    document.getElementById('game-frame').src = `${gamesPath}${folderName}/`;
}

// Initialize
document.addEventListener('DOMContentLoaded', loadGameList);
