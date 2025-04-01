document.getElementById('lastModified').textContent = document.lastModified;

const storyData = {
    start: {
        text: " <strong>The Neon Temple</strong> stands before you, its entrance pulsing with cosmic energy. Two glowing pathways diverge before you...",
        choices: [
            { text: " Violet Path - Humming with strange energy", next: "leftPassage" },
            { text: " Golden Path - Warm light beckons", next: "rightPassage" }
        ],
        image: "images/download.jpeg"
    },
    leftPassage: {
        text: "🌀 <strong>Violet Energy Field</strong><br>The air crackles with purple electricity. Your hair stands on end as shadowy figures dart at the edge of vision...",
        choices: [
            { text: "🔦 Activate photon torch", next: "torchLit" },
            { text: "🌑 Embrace the darkness", next: "darkFall" }
        ],
        image: "images/dark_corridor.jpg"
    },
    rightPassage: {
        text: "✨ <strong>Hall of Golden Guardians</strong><br>Massive statues with jeweled eyes watch your every move. Their surfaces ripple like liquid metal...",
        choices: [
            { text: " Examine the guardians", next: "statueTrap" },
            { text: " Move cautiously forward", next: "hiddenDoor" }
        ],
        image: "images/golden_hall.png"
    },
    statueTrap: {
        text: "💥 <strong>Guardians Awaken!</strong><br>The statues come alive with a thunderous roar! Golden tendrils shoot out, immobilizing you completely...",
        choices: [],
        image: "images/statue_trap.png"
    },
    hiddenDoor: {
        text: "🚪 <strong>Hidden Chamber</strong><br>Behind a cascading waterfall of light, you find a door covered in glowing runes. It hums with power...",
        choices: [
            { text: " Decipher the runes", next: "treasureRoom" },
            { text: " Retreat to entrance", next: "start" }
        ],
        image: "images/hidden_door.png"
    },
    treasureRoom: {
        text: " <strong>Cosmic Relic Found!</strong><br>Before you floats the legendary artifact, pulsing with the energy of a thousand stars!",
        choices: [],
        image: "images/treasure.png"
    },
    darkFall: {
        text: " <strong>Endless Abyss</strong><br>The ground vanishes beneath you! You fall through infinite darkness as whispering voices fade above...",
        choices: [],
        image: "images/pit_fall.jpeg"
    },
    torchLit: {
        text: " <strong>Ancient Writings</strong><br>Your torch reveals holographic symbols floating in the air, forming an intricate map of the temple...",
        choices: [
            { text: "Follow the map", next: "symbolPath" },
            { text: " Ignore the signs", next: "trappedForever" }
        ],
        image: "images/ancient_symbol.png"
    },
    trappedForever: {
        text: " <strong>Sealed Fate</strong><br>With a terrible grinding sound, the walls close in permanently. Your torch flickers out...",
        choices: [],
        image: "images/trapped.png"
    },
    symbolPath: {
        text: " <strong>Relic Chamber</strong><br>The map leads you to a floating platform where the artifact spins slowly in a beam of celestial light...",
        choices: [
            { text: " Grab it quickly", next: "relicCollapse" },
            { text: " Study first", next: "guardianPuzzle" }
        ],
        image: "images/relic.png"
    },
    relicCollapse: {
        text: " <strong>Temple Collapse!</strong><br>The moment you touch the relic, the entire structure begins crumbling around you!",
        choices: [],
        image: "images/temple_collapse.png"
    },
    guardianPuzzle: {
        text: " <strong>Final Challenge</strong><br>A spectral guardian materializes, projecting a complex puzzle in the air before you...",
        choices: [
            { text: " Solve the puzzle", next: "wiseExplorer" },
            { text: " Grab and run", next: "relicCollapse" }
        ],
        image: "images/guardian.png"
    },
    wiseExplorer: {
        text: " <strong>Victory!</strong><br>You solve the puzzle! The guardian bows and vanishes, leaving the relic floating safely in your reach...",
        choices: [
            { text: " Harness its power", next: "powerfulExplorer" },
            { text: " Sell to collectors", next: "richExplorer" }
        ],
        image: "images/safe_escape.png"
    },
    powerfulExplorer: {
        text: " <strong>Cosmic Ascension</strong><br>The relic bonds with you, granting abilities beyond human comprehension!",
        choices: [],
        image: "images/powerful.jpg"
    },
    richExplorer: {
        text: " <strong>Life of Luxury</strong><br>The relic fetches enough wealth to buy a small planet. You retire in spectacular fashion!",
        choices: [],
        image: "images/rich.png"
    }
};

function updateStory(scene) {
    const storyDiv = document.getElementById("story");
    const choicesDiv = document.getElementById("choices");
    const storyImage = document.getElementById("storyImage");
    
    storyDiv.innerHTML = storyData[scene].text;
    storyImage.src = storyData[scene].image;
    storyImage.alt = storyData[scene].text.replace(/<[^>]*>/g, '').substring(0, 50) + '...';
    choicesDiv.innerHTML = "";
    
    storyData[scene].choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.className = "neon-btn";
        button.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            ${choice.text}
        `;
        button.onclick = () => updateStory(choice.next);
        
        const colorClasses = ['neon-green', 'neon-blue', 'neon-purple', 'neon-yellow'];
        button.classList.add(colorClasses[index % colorClasses.length]);
        
        choicesDiv.appendChild(button);
    });
}

function restartGame() {
    updateStory("start");
}

document.addEventListener("DOMContentLoaded", () => {
    updateStory("start");
    
    // Preload all images
    Object.values(storyData).forEach(scene => {
        const img = new Image();
        img.src = scene.image;
    });
    
    // Addendum toggle
    const addendumBtn = document.getElementById('addendumBtn');
    const addendumContent = document.getElementById('addendumContent');
    
    addendumBtn.addEventListener('click', () => {
        addendumContent.classList.toggle('show');
        addendumBtn.innerHTML = addendumContent.classList.contains('show') ? 
            `<span></span><span></span><span></span><span></span>Hide Addendum` : 
            `<span></span><span></span><span></span><span></span>Show Addendum`;
    });
});
