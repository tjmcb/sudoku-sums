import SUMS from './sums.json' with {type: 'json'}

const selection = {};

selection.sum = 5;
selection.digits = 2;
selection.results = SUMS[selection.digits][selection.sum];

selection.with = [];
selection.without = [2];
selection.show = [];
selection.eliminated = [];

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

function filter(string){
    // with certain digit, fails if does not include
    for (const i in selection.with){
        if (!string.includes(selection.with[i])){ return false }
    }
    // without certain digit, fails if includes
    for (const i in selection.without){
        if (string.includes(selection.without[i])){ return false }
    }
    return true;
}

makeResults();
selection.results.map((result) => {
    console.log(filter(result))
})