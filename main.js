import SUMS from './sums.json' with {type: 'json'}

const selection = {};

selection.sum = 5;
selection.digits = 2;
selection.results = SUMS[selection.digits][selection.sum];

selection.with = [1];
selection.without = [2];

selection.show = [];
selection.eliminated = [];

function handleResultChange(){
    selection.show = [];
    selection.eliminated = [];

    // filter results into show and eliminated lists
    selection.results.map((sum) => {
        if (filter(sum)) {
            selection.show.push(sum);
        } else {
            selection.eliminated.push(sum);
        }
    })

    // update component
    makeResults();
}

function makeResults(){
    const newDiv = document.createElement("div");
    newDiv.id = "results";
    newDiv.classList.add("results");
    const h3 = document.createElement("h3");
    h3.innerText = `${selection.sum}/${selection.digits} (${selection.show.length} Results)`
    newDiv.appendChild(h3);
    // "show" list of valid filtered results first
    selection.show.map((sum) => {
        const p = document.createElement("p");
        p.innerText = sum;
        newDiv.appendChild(p);
    });
    // "eliminated" list shows invalid answers in red below valid ones
    selection.eliminated.map((sum) => {
        const p = document.createElement("p");
        p.innerText = sum;
        p.classList.add("eliminated"); // red text
        newDiv.appendChild(p);
    });
    const options = document.getElementById("results");
    options.replaceWith(newDiv)
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

document.getElementById("search-form").onsubmit = (event) => {
    event.preventDefault();

    const sum = event.target.sum.value || 5;
    const digits = event.target.digits.value || 2;

    const data = SUMS[digits][sum]

    if (data) {
        selection.sum = sum;
        selection.digits = digits;
        selection.results = data;

        //selection.with = [];
        //selection.without = [];
        handleResultChange();
    } else {
        alert("no results found");
    }
}

handleResultChange();