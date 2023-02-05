
let areaMenu = true;
let area;

let areaInput;

let loading = true;


let alreadyFound = 0;
let polyominoes = [];




function setup() {
    createCanvas(600, 600);
    background(50);

    // Create input box
    areaInput = createInput();
    areaInput.position(250, 300);
    areaInput.size(100);
    areaInput.style('font-size', 35+'px');
}



function draw() {
    background(50);
    if (areaMenu) {
        // Area menu text
        fill(255, 255, 255);
        textSize(70);
        textAlign(CENTER, CENTER);
        text("Area:", 300, 200);
    } else if (!loading) {
        fill(255, 255, 255);
        textSize(40);
        textAlign(CENTER, CENTER);

        // Already found text
        text("Already found: " + alreadyFound, 300, 30);

        // New found text
        text("New found: " + (polyominoes.length - alreadyFound), 300, 80);

        // Total found text
        text("Total found: " + polyominoes.length, 300, 550);

        for (let _ = 0; _ < 1000; _++) {
            // Generate and draw polyominoes
            polyomino = generatePolyomino(area);
            // Scale polyomino
            scaledpolyomino = scalePolyominoGrid(polyomino, 10, 10);
            // Check if polyomino is new
            if (isNew(scaledpolyomino)) {
                polyominoes.push(scaledpolyomino);
            }
        }

        drawPolyomino(polyomino, 100, 100, 400);
    }
}



function keyPressed() {
    if (keyCode === ENTER) {
        if (areaMenu) {
            area = areaInput.value();
            // Check if valid area
            // Try to parse area to int
            try {
                area = parseInt(area);
                // Check if area is valid
                if (area > 0 && area < 51) {
                    areaMenu = false;
                    areaInput.remove();

                    loadPolyominoes();
                }
            } catch (e) {
                console.log("Invalid area");
            }
        } else {
            // Save polyominoes
            string_polyominoes = polyominoes.slice(alreadyFound, polyominoes.length);
            for (let i = 0; i < string_polyominoes.length; i++) {
                string_polyominoes[i] = polyomino_to_string(string_polyominoes[i]);
            }
            database.add_to_document(area, string_polyominoes);
            alreadyFound = polyominoes.length;
        }
    }
}



async function loadPolyominoes() {
    // Load polyominoes
    let string_polyominoes = await database.get_document(area);
    string_polyominoes = string_polyominoes.data;
    for (let i = 0; i < string_polyominoes.length; i++) {
        polyominoes.push(string_to_polyomino(string_polyominoes[i]));
    }
    alreadyFound = polyominoes.length;
    loading = false;
}