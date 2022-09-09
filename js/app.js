
// ----------------------------Constants----------------------------------------------

// ----------------------------Variables (state)--------------------------------------
//? once testing is good we can shrink this into one line.
const deck = [
  {id:'dA', value:1},
  {id:'dK', value:10},
  {id:'dQ', value:10},
  {id:'dJ', value:10},
  {id:'d10', value:10},
  {id:'d09', value:9},
  {id:'d08', value:8},
  {id:'d07', value:7},
  {id:'d06', value:6},
  {id:'d05', value:5},
  {id:'d04', value:4},
  {id:'d03', value:3},
  {id:'d02', value:2},
  {id:'hA', value:1},
  {id:'hK', value:10},
  {id:'hQ', value:10},
  {id:'hJ', value:10},
  {id:'h10', value:10},
  {id:'h09', value:9},
  {id:'h08', value:8},
  {id:'h07', value:7},
  {id:'h06', value:6},
  {id:'h05', value:5},
  {id:'h04', value:4},
  {id:'h03', value:3},
  {id:'h02', value:2},
  {id:'cA', value:1},
  {id:'cK', value:10},
  {id:'cQ', value:10},
  {id:'cJ', value:10},
  {id:'c10', value:10},
  {id:'c09', value:9},
  {id:'c08', value:8},
  {id:'c07', value:7},
  {id:'c06', value:6},
  {id:'c05', value:5},
  {id:'c04', value:4},
  {id:'c03', value:3},
  {id:'c02', value:2},
  {id:'sA', value:1},
  {id:'sK', value:10},
  {id:'sQ', value:10},
  {id:'sJ', value:10},
  {id:'s10', value:10},
  {id:'s09', value:9},
  {id:'s08', value:8},
  {id:'s07', value:7},
  {id:'s06', value:6},
  {id:'s05', value:5},
  {id:'s04', value:4},
  {id:'s03', value:3},
  {id:'s02', value:2},
]

let playerHand = []
let dealerHand = []
// ----------------------------Cached Element references------------------------------
let messageEl = document.querySelector('#game-message')
let drawBtn = document.querySelector('#draw-btn')
// ----------------------------Event Listeners----------------------------------------
drawBtn.addEventListener('click', function(){
  drawCard(playerHand)
})


// ----------------------------Functions----------------------------------------------

function drawCard(handArr) {
  if (deck.length > 0) {
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    handArr.push(cardPicked)
    console.log(`drew card ${cardPicked.id} deck has cards ${deck.length} left`)
    getHandValue(handArr)
  }
}





function getHandValue(handArr){
  let hasAce = false
  let total = 0 
  for (let i=0;i<handArr.length; i++){
    total += handArr[i].value
    hasAce = handArr[i].value === 1 ? true : hasAce
  } 
  return hasAce && total < 12 ? total + 10 : total 
}

//* tests commented out unless needed

// let playerHand21 = [
//   {id:'sA', value:1}, 
//   {id:'dK', value:10},
// ]

// let playerHand12 = [
//   {id:'sA', value:1},
//   {id:'cA', value:1}, 
//   {id:'dK', value:10},
// ]

// console.log('playerHand 21', getHandValue(playerHand21))
// console.log('playerHand 12', getHandValue(playerHand12))
// console.log('playerHand 25', getHandValue(playerHand25))






//