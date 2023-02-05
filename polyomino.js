
function generatePolyomino(area) {
    
    
    // Generate center point (random, random)
    let center = [Math.floor(random(0, 10)), Math.floor(random(0, 10))];

    // Square coords list
    let squares = [[center[0], center[1]]];
    

    // Generate squares around it until area is reached
    currentArea = 1;
    while (currentArea < area) {
        // Get random square
        let square = squares[Math.floor(random(0, squares.length))];
        // Get random direction
        let direction = Math.floor(random(0, 4));
        // Get new square coords
        let newSquare = [square[0], square[1]];
        if (direction == 0) {
            newSquare[0]--;
        } else if (direction == 1) {
            newSquare[0]++;
        } if (direction == 2) {
            newSquare[1]--;
        } else if (direction == 3) {
            newSquare[1]++;
        }

        // Check if new square is valid
        if (newSquare[0] >= 0 && newSquare[0] < 10 && newSquare[1] >= 0 && newSquare[1] < 10) {
            // Check if new square is already in squares
            let alreadyInSquares = false;
            for (let i = 0; i < squares.length; i++) {
                if (squares[i][0] == newSquare[0] && squares[i][1] == newSquare[1]) {
                    alreadyInSquares = true;
                }
            }
            if (!alreadyInSquares) {
                // Add new square to squares
                squares.push(newSquare);
                currentArea++;
            }
        }
    }


    // Generate polyomino (10x10 grid)
    let polyomino = [];
    for (let i = 0; i < 10; i++) {
        polyomino.push([]);
        for (let j = 0; j < 10; j++) {
            polyomino[i].push(false);
            for (let k = 0; k < squares.length; k++) {
                if (squares[k][0] == i && squares[k][1] == j) {
                    polyomino[i][j] = true;
                }
            }
        }
    }

    return polyomino;
}


function drawPolyomino(polyomino, x, y, size) {
    // Draw background
    fill(0);
    rect(x, y, size, size);
    // Draw squares
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (polyomino[i][j]) {
                fill(255, 255, 255);
                rect(x + i * size / 10 + 1, y + j * size / 10 + 1, size / 10 - 2, size / 10 - 2);
            }
        }
    }
}


function scalePolyominoGrid(polyomino) {
    // This is goint to reduce the grid to the smallest possible size while keeping the polyomino the same
    // First, find the smallest x and y values
    let smallestX = 10;
    let smallestY = 10;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (polyomino[i][j]) {
                if (i < smallestX) {
                    smallestX = i;
                }
                if (j < smallestY) {
                    smallestY = j;
                }
            }
        }
    }

    // Then, move the polyomino to the top left corner
    let newPolyomino = [];
    for (let i = 0; i < 10 - smallestX; i++) {
        newPolyomino.push([]);
        for (let j = 0; j < 10 - smallestY; j++) {
            newPolyomino[i].push(polyomino[i + smallestX][j + smallestY]);
        }
    }


    // Then, find the biggest x and y values
    let biggestX = 0;
    let biggestY = 0;
    for (let i = 0; i < 10 - smallestX; i++) {
        for (let j = 0; j < 10 - smallestY; j++) {
            if (newPolyomino[i][j]) {
                if (i > biggestX) {
                    biggestX = i;
                }
                if (j > biggestY) {
                    biggestY = j;
                }
            }
        }
    }

    // Then, move the polyomino to the bottom right corner
    let newPolyomino2 = [];
    for (let i = 0; i < biggestX + 1; i++) {
        newPolyomino2.push([]);
        for (let j = 0; j < biggestY + 1; j++) {
            newPolyomino2[i].push(newPolyomino[i][j]);
        }
    }

    return newPolyomino2;
}


function isNew(polyomino) {
    // Check if polyomino is already in polyominoes
    for (let i = 0; i < polyominoes.length; i++) {
        let same = true;
        // check if polyominoes[i] is the same size as polyomino
        if (polyominoes[i].length == polyomino.length && polyominoes[i][0].length == polyomino[0].length) {
            // check if polyominoes[i] is the same as polyomino
            for (let j = 0; j < polyomino.length; j++) {
                for (let k = 0; k < polyomino[0].length; k++) {
                    if (polyominoes[i][j][k] != polyomino[j][k]) {
                        same = false;
                    }
                }
            }
        } else {
            same = false;
        }

        if (same) {
            return false;
        }
    }
    return true;
}


function polyomino_to_string(polyomino) {
    let string = "";
    for (let i = 0; i < polyomino.length; i++) {
        for (let j = 0; j < polyomino[0].length; j++) {
            if (polyomino[i][j]) {
                string += "1";
            } else {
                string += "0";
            }
        }
        string += ":"; // This is a separator
    }
    // Remove last separator
    string = string.substring(0, string.length - 1);
    return string;
}


function string_to_polyomino(string) {
    let polyomino = [];
    let lines = string.split(":");
    for (let i = 0; i < lines.length; i++) {
        polyomino.push([]);
        for (let j = 0; j < lines[i].length; j++) {
            if (lines[i][j] == "1") {
                polyomino[i].push(true);
            } else {
                polyomino[i].push(false);
            }
        }
    }
    return polyomino;
}