import GAMES_DATA from './games.js';

const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const backers = contributionsCard.reduce((acc,card)=>{
    acc + card.backers;
})
console.log(backers)