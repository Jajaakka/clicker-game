// Variables
let score = 0;
let multiplier = 1;
let autoClick = false;

// Select elements
const clickerButton = document.getElementById('clicker-button');
const scoreDisplay = document.getElementById('score');
const upgradeScoreDisplay = document.getElementById('upgrade-score');

// Check if we're on the main page
if (clickerButton) {
    clickerButton.addEventListener('click', () => {
        score += 1 * multiplier;
        updateScore();
    });
}

// Update the score display
function updateScore() {
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
    if (upgradeScoreDisplay) upgradeScoreDisplay.textContent = score;
}

// Handle upgrades
const upgradeButtons = document.querySelectorAll('.upgrade-button');
if (upgradeButtons) {
    upgradeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const upgradeType = e.target.getAttribute('data-upgrade');
            if (upgradeType === 'multiplier' && score >= 10) {
                score -= 10;
                multiplier += 1;
            } else if (upgradeType === 'auto-click' && score >= 50) {
                score -= 50;
                startAutoClick();
            }
            updateScore();
        });
    });
}

// Auto-click logic
function startAutoClick() {
    if (!autoClick) {
        autoClick = true;
        setInterval(() => {
            score += 1;
            updateScore();
        }, 1000);
    }
}

// Task Points
const taskButtons = document.querySelectorAll('.task-button');

if (taskButtons) {
    taskButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const points = parseInt(e.target.getAttribute('data-points'), 10);
            score += points;
            updateScore();
            e.target.disabled = true; // Disable button after claiming points
            e.target.textContent = "Claimed!";
        });
    });
}

