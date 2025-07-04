import SUMS from './sums.json' with {type: 'json'}

const selection = {};

selection.sum = 5;
selection.digits = 2;
selection.results = SUMS[selection.digits][selection.sum];

selection.with = [];
selection.without = [];

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

function clearCheckboxes(){
    selection.with = [];
    selection.without = [];

    // probably unoptimal
    // setting 'checked' to false on each element did not uncheck
    makeCheckboxes();
}

function makeCheckboxes(){
    const checkboxes = document.createElement("div");
    checkboxes.id = "checkboxes";
    checkboxes.classList.add("checkboxes");

    ["with","without"].map((type) => {
        const div = document.createElement("div");
        div.id = type;
        div.classList.add(type);
        const h3 = document.createElement("h3");
        h3.innerText = type;
        div.appendChild(h3);

        [1,2,3,4,5,6,7,8,9].map((num) => {
            const checkbox = makeCheckbox(type,num)
            div.appendChild(checkbox);
        })

        checkboxes.appendChild(div);
    })

    document.getElementById("checkboxes").replaceWith(checkboxes);
}

function makeCheckbox(type,num){
    const p = document.createElement("p");
    p.innerText = num;
    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("checkbox");
    input.onchange = (event) => {
        if (event.target.checked){
            // add number to appropriate array
            selection[type].push(num);
            console.log(selection[type]);
        } else {
            // remove number to appropriate array
            selection[type] = selection[type].filter((number) => {
                return number !== num;
            })
            console.log(selection[type]);
        }
        handleResultChange();
    }
    p.appendChild(input);
    return p;
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

        clearCheckboxes();
        handleResultChange();
    } else {
        alert("no results found");
    }
}

document.getElementById("clear-button").onclick = () => {
    clearCheckboxes();
    handleResultChange();
}

makeCheckboxes();
handleResultChange();