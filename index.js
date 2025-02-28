/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
const OG_gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
        games.forEach(game=>{
            const gameCard = document.createElement("div");
            gameCard.classList.add("game-card");

            gameCard.innerHTML = `
            <img src = ${game.img}>
            <p> name = "${game.name}" </p>
            <p> description = "${game}" </p>
            `;
            gamesContainer.append(gameCard);
        })



        

        

}

   addGamesToPage(GAMES_JSON)
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const backers = GAMES_JSON.reduce((acc, card) => {
  return acc + card.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${backers.toLocaleString("en-us")}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const amount_pledged= GAMES_JSON.reduce((acc,games)=>{
   return acc + games.pledged;
},0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${amount_pledged.toLocaleString("en-us")}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const numGames = GAMES_JSON.length;
gamesCard.innerHTML = `${numGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    console.log("hello!!");
    // use filter() to get a list of games that have not yet met their goal
    const gamesGoalNotMet = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    });
    console.log("amount of unfunded games:", gamesGoalNotMet.length);
   


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesGoalNotMet);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal
    const gamesFunded = GAMES_JSON.filter((game)=>{
        return game.pledged>= game.goal;
    });
    console.log("Games funded: ", gamesFunded.length);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesFunded)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    

}

let on = [false,false,false];
const names = ["filterUnfundedOnly","filterFundedOnly","showAllGames"];

function OnOff(method){
    for(let i =0; i<names.length; i++){
        if(method.name === names[i]){
            if(!on[i]){
                method();
                on[i]= true;
            }
            else{
                deleteChildElements(gamesContainer);
                on[i] = false;
            }
        }
    }
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click",()=>{return OnOff(filterUnfundedOnly)});
fundedBtn.addEventListener("click",()=>{ return OnOff(filterFundedOnly)});
allBtn.addEventListener("click",()=>{ return OnOff(showAllGames)});
// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game)=>{
    return game.pledged < game.goal;
}).length



// create a string that explains the number of unfunded games using the ternary operator
const str1 = `A total of ${unfundedGames==1 ? "1 game is unfunded.": unfundedGames + " games are unfunded."}`


// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement("p");
paragraph.textContent = str1;
descriptionContainer.appendChild(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const firstWord = sortedGames[0].name;
const secondWord = sortedGames[1].name;
console.log(`first word: ${firstWord}. Second word: ${secondWord}`);

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.innerHTML = firstWord;
secondGameContainer.innerHTML = secondWord;
// do the same for the runner up item