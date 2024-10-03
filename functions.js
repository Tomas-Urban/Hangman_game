// PROMĚNNÉ
var secretWithoutPunction = '';
var originalSecretSplit = '';
var secretWithoutPunctionSplit = '';
var guessedLetter = '';
var falseCounter = 0;
console.log(falseCounter);
var victory = false;

// ODSTRANĚNÍ INTERPUNKCE Z TAJENKY
const removePunction = (str) => {
    console.log("spuštěno removePunction()" )
    const charMap = {
        'á': 'a',
        'é': 'e',
        'ě': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ů': 'u',
        'ü': 'u',
        'ý': 'y',
        'ž': 'z',
        'š': 's',
        'č': 'c',
        'ř': 'r',
        'ď': 'd',
        'ť': 't',
        'ň': 'n'
    };

    return str.replace(/[áéěíóúůüýžščřďťň]/g, match => charMap[match]);
};

// FUNKCE PRO PŘEKLESNÍ BUXŮ PŘI ZMĚNĚ VELIKOSTI OKNA
let previousWidth = window.innerWidth;
let previousHeight = window.innerHeight;

const detectResize = () => {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    // Pokud dojde ke změně šířky nebo výšky okna, znovu vykreslíme tajenku
    if (currentWidth !== previousWidth || currentHeight !== previousHeight) {
        handleResize();
        previousWidth = currentWidth;
        previousHeight = currentHeight;
    }
};

// Spustíme interval, který každých 300 ms kontroluje změnu velikosti okna
setInterval(detectResize, 300);


const handleResize = () => {
    drawLetterBoxes();
    refillGuessedLetters();  // Znovu doplní uhádnutá písmena
};

// Přidání posluchače události 'resize'
window.addEventListener('resize', handleResize);
window.addEventListener('scroll', () => {
    drawLetterBoxes();   // Překreslí tajenku při posunutí obrazovky
    refillGuessedLetters();  // Znovu doplní uhádnutá písmena
});

// SPLIT WORDS TO FIT SECRET DIV (vizuální rozdělovník bez ovlivnění indexace tajenky)
const splitWordsToFit = (words, containerWidth) => {
    const letterWidth = containerWidth <= 669 ? 30 : 38;
    const maxLettersPerLine = Math.floor(containerWidth / letterWidth);
    let splitWords = [];   // Vizuální zobrazení tajenky s "-"
    let mapping = [];      // Mapování mezi vizuálními a originálními indexy

    words.forEach((word, wordIndex) => {
        let currentIndex = 0;
        while (currentIndex < word.length) {
            let endIndex = currentIndex + maxLettersPerLine;
            if (endIndex < word.length) {
                splitWords.push(word.slice(currentIndex, endIndex) + "-");  // Přidáme "-"
                for (let i = currentIndex; i < endIndex; i++) {
                    mapping.push([wordIndex, i]);  // Uložíme původní index
                }
                currentIndex = endIndex;
            } else {
                splitWords.push(word.slice(currentIndex));  // Zbytek slova bez "-"
                for (let i = currentIndex; i < word.length; i++) {
                    mapping.push([wordIndex, i]);
                }
                break;
            }
        }
    });

    return { splitWords, mapping };  // Vracíme vizuální rozdělení a mapování
};



// FUNKCE PRO VYKRESLENÍ BOXŮ PRO TAJENKU
const drawLetterBoxes = () => {
    console.log("spuštěno drawLetterBoxes()");
    secretContainer.innerHTML = '';

    const secretDiv = document.getElementById('secretDiv');
    const containerWidth = secretDiv.clientWidth;

    const { splitWords, mapping } = splitWordsToFit(originalSecretSplit, containerWidth);  // Získáme vizuální tajenku a mapování

    let mapIndex = 0;  // Sledujeme pozici v mapování

    // Pro každé slovo v rozdělené vizuální verzi
    for (let i = 0; i < splitWords.length; i++) {
        const wordBox = document.createElement('div');
        wordBox.className = 'wordBox';
        wordBox.id = 'letterBox' + i;

        secretContainer.appendChild(wordBox);

        // Pro každé písmeno v jednotlivém slově
        for (let j = 0; j < splitWords[i].length; j++) {
            if (splitWords[i][j] === '-') {
                const hyphenBox = document.createElement('div');
                hyphenBox.className = 'hyphenBox';
                hyphenBox.textContent = '-';
                wordBox.appendChild(hyphenBox);
            } else {
                const letterBox = document.createElement('div');
                letterBox.className = 'letterBox';
                letterBox.id = 'letterBox' + mapping[mapIndex][0] + '-' + mapping[mapIndex][1];  // Mapování na originální index
                wordBox.appendChild(letterBox);
                mapIndex++;  // Posuneme se na další index
            }
        }
    }
};


// NAČTENÍ TAJNEKY, VYTVOŘENÍ PROMĚNNÝCH 
const secretLoad = () => {
    const secretForm = document.getElementById('secretForm');
    secretForm.addEventListener('submit', (event) => {
        console.log("spuštěno secretLoad()")
        event.preventDefault();

        const secretInput = document.getElementById('secretInput');
        let secret = secretInput.value.toLowerCase();
        secret = secret.replace(/  +/g, ' ');
        originalSecretSplit = secret.split(' ');
        secretWithoutPunction = removePunction(secret);
        secretWithoutPunctionSplit = secretWithoutPunction.split(' ');

        drawLetterBoxes();
        secretInput.value = '';
    });
};

// POROVNÁNÍ ZADANÉHO PÍSMENE S TAJENKOU BEZ DIKRITIKY
const guessedLetterMatch = () => {
    console.log("spuštěno guessedLetterMatch()");
    const indexes = [];

    // Procházení tajenky bez interpunkce a hledání indexů odpovídajících písmen
    for (let i = 0; i < secretWithoutPunctionSplit.length; i++) {
        for (let j = 0; j < secretWithoutPunctionSplit[i].length; j++) {
            if (secretWithoutPunctionSplit[i][j] === guessedLetter) {
                indexes.push([i, j]);  // Původní indexy bez "-"
            }
        }
    }

    console.log(indexes);

    let currentKey = document.getElementById(guessedLetter);
    if (indexes.length > 0) {
        console.log('Hádané písmeno je na indexech: ' + indexes.join(', '));
        for (let i = 0; i < indexes.length; i++) {
            // Najdeme správný element na základě mapovaných indexů
            let letterBox = document.getElementById('letterBox' + indexes[i][0] + '-' + indexes[i][1]);
            letterBox.textContent = originalSecretSplit[indexes[i][0]][indexes[i][1]].toUpperCase();
            currentKey.classList.add('keyGreen');
        }
    } else {
        console.log('Hádané písmeno není v tajence.');
        if (!currentKey.classList.contains('keyRed')) {
            falseCounter += 1;
            console.log(falseCounter);
            sibenice();
            if (falseCounter === 11) {
                const gameOverSpan = document.getElementById('gameOver').querySelector('span');
                gameOverSpan.textContent = 'Game Over!';
                gameOver.style.zIndex = '10';
                gameOver.style.backgroundColor = '#be3144';
            }
            currentKey.classList.add('keyRed');
        }
    }

    secretCheck();
};


// BUTTONS
document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const keyClickedMatch = () => {
        console.log("spuštěno keyClickedMatch()")
        keys.forEach(key => {
            key.addEventListener('click', (event) => {  
                if (falseCounter != 11 && victory === false && secretWithoutPunction != '') {
                    guessedLetter = event.target.textContent.toLowerCase();
                    guessedLetterMatch();
                }
            });
        });
    }

    const newGame = document.getElementById('newGame');
    const newGameClicked = () => {
        newGame.addEventListener('click', (event) => {
            console.log("spuštěno newGameClicked()")
            event.preventDefault();
            secretWithoutPunction = '';
            originalSecretSplit = '';
            secretWithoutPunctionSplit = '';
            guessedLetter = '';
            falseCounter = 0;
            console.log('falseCounter = ' + falseCounter);
            victory = false;
            secretContainer.innerHTML = '';
            gameOver.style.zIndex = '-1';
            keys.forEach(key => {
                key.classList.remove('keyRed', 'keyGreen');
            });
            sibenice();
        })
    }
    
    const showSecretClicked = () => {
        showSecret.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("spuštěno showSecret()")
            for (let i = 0; i < originalSecretSplit.length; i++) {
                for (let j = 0; j < originalSecretSplit[i].length; j++) {
                    let letterBox = document.getElementById('letterBox' + i + '-' + j);
                    console.log("Trying to update letterBox: ", 'letterBox' + i + '-' + j);
                    if (letterBox) {
                        const content = originalSecretSplit[i][j].toString().toUpperCase();
                        console.log("Updating letterBox: ", 'letterBox' + i + '-' + j, " with content: ", content);
                        letterBox.textContent = content;
                        console.log(content);
                    } else {
                        console.error("Element not found for ID: 'letterBox" + i + '-' + j + "'");
                    }
                }
            }
        });
    }

    keyClickedMatch();
    newGameClicked();
    showSecretClicked();
});

// kontrola vyplnění tajenky
const secretCheck = () => {
    console.log("spuštěno secretCheck()")
    let allLettersFilled = true;

    for (let i = 0; i < secretWithoutPunctionSplit.length; i++) {
        for (let j = 0; j < secretWithoutPunctionSplit[i].length; j++) {
            let letterBox = document.getElementById('letterBox' + i + '-' + j);
            if (letterBox.textContent === '') {
                allLettersFilled = false;
                break;
            }
        }

        if (!allLettersFilled) {
            break;
        }
    }

    victory = allLettersFilled;

    if (victory) {
        gameOver.style.backgroundColor = 'green';
        gameOver.style.zIndex = '10';
        const gameOverSpan = document.getElementById('gameOver').querySelector('span');
        gameOverSpan.textContent = 'Victory!';
        console.log(victory);
    }
};

const refillGuessedLetters = () => {
    // Najdeme všechna zeleně označená tlačítka
    const greenKeys = document.querySelectorAll('.keyGreen');
    
    greenKeys.forEach(key => {
        const guessedLetter = key.textContent.toLowerCase();
        const indexes = [];

        // Najdeme všechny pozice v tajence, kde se písmeno vyskytuje
        for (let i = 0; i < secretWithoutPunctionSplit.length; i++) {
            for (let j = 0; j < secretWithoutPunctionSplit[i].length; j++) {
                if (secretWithoutPunctionSplit[i][j] === guessedLetter) {
                    indexes.push([i, j]);
                }
            }
        }

        // Vyplníme uhádnuté písmeno zpět do tajenky
        indexes.forEach(index => {
            let letterBox = document.getElementById('letterBox' + index[0] + '-' + index[1]);
            letterBox.textContent = originalSecretSplit[index[0]][index[1]].toUpperCase();
        });
    });
};