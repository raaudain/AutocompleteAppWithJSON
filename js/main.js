const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch("../data/states.json");
    const states = await res.json();
    
    // Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, "gi");

        // Clears states when the characters don't match
        if (!state.name.match(regex) || !state.abbr.match(regex)){
            matchList.innerHTML = "";
        }

        return state.name.match(regex) || state.abbr.match(regex);
    })

    if(!searchText.length){
        matches = [];
        matchList.innerHTML = "";
    }

    outputHTML(matches);
    //console.log(matches)
}

// Show results in HTML
const outputHTML = matches => {
    if(matches.length){
        const html = matches.map(match => `
        <li><a href="#">${match.name} (${match.abbr})</a></li>`).join("")
        
        matchList.innerHTML = html;
    }
}

search.addEventListener("input", () => searchStates(search.value));