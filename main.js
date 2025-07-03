import SUMS from './sums.json' with {type: 'json'}

const selection = {}

selection.sum = 5
selection.digits = 2
selection.results = SUMS[2][5];

function makeResults(){
    const newDiv = document.createElement("div");
    newDiv.id = "results";
    newDiv.classList.add("results");
    const h3 = document.createElement("h3");
    h3.innerText = `${selection.sum}/${selection.digits} (${selection.results.length} Results)`
    newDiv.appendChild(h3);
    selection.results.map((sum) => {
        const p = document.createElement("p");
        p.innerText = sum;
        newDiv.appendChild(p);
    });

    const options = document.getElementById("results");
    options.replaceWith(newDiv)
}

document.getElementById("search-form").onsubmit = (event) => {
    event.preventDefault();

    const sum = event.target.sum.value || 5;
    const digits = event.target.digits.value || 2;

    const data = SUMS[digits][sum]

    if (data) {
        selection.sum = sum;
        selection.digits = digits;
        selection.results = data;
        makeResults();
    } else {
        alert("no results found");
    }
}

makeResults();