
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

let playerHand, dealerHand, turn, winner, message, isNatural
// ----------------------------Cached Element references------------------------------
let messageEl = document.querySelector('#game-message')
let drawBtn = document.querySelector('#draw-btn')
// ----------------------------Event Listeners----------------------------------------
drawBtn.addEventListener('click', function(){
  handleClickHit(playerHand, 'player')
})


// ----------------------------Functions----------------------------------------------
initialDeal()

function initialDeal() {
  playerHand = []
  dealerHand = []
  winner = null
  isNatural = null
  turn = 'deal'
  cardDraw(playerHand, 'player')
  cardDraw(playerHand, 'player')
  cardDraw(dealerHand, 'dealer')
  cardDraw(dealerHand, 'dealer')
  winner = checkNaturalWinner()
  console.log('winner', winner)
  isNatural = winner ? true : null
  render()
}


function checkNaturalWinner(){
  if (turn !== 'deal') return null
  let dealerNatural = getHandValue(dealerHand) === 21 ? true : false
  let playerNatural = getHandValue(playerHand) === 21 ? true : false
  if (!playerNatural && !dealerNatural){
    return null
  } else if (playerNatural && dealerNatural) {
    return 'T'
  } else if (playerNatural) {
    return 'player'
  } else {
    return 'dealer'
  }
}


function handleClickHit(handArr, seat) {
  const drawCard = cardDraw(handArr, seat)
  message = `Your Cards Total: ${getHandValue(playerHand)}, Dealer has: ${getHandValue(dealerHand)}`//! for testing will need 
  // message = `You drew ${drawCard}`
  render()
}

function cardDraw(handArr, seat) {
  if (deck.length > 0) {
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    handArr.push(cardPicked)
    console.log(`${seat} drew ${cardPicked.id}`)
  }
  // return cardPicked
}

function render() {
  if (winner) {
    message = getWinnerMessages()
  } else {
    message = (`Your Cards Total: ${getHandValue(playerHand)}, Dealer up card: ${dealerHand[0].value}`)  
    console.log(`Your Cards Total: ${getHandValue(playerHand)}, Dealer has: ${getHandValue(dealerHand)}`)  
    turn = 'player'
  }
  messageEl.textContent = message  
}


function getWinnerMessages(){
  if (isNatural && winner === 'player') return `You Won - Natural Blackjack`
  if (isNatural && winner === 'dealer') return `Dealer Won - Natural Blackjack`
  if (winner === 'player') return `You Won`
  if (winner === 'dealer') return `Dealer Won`
  if (winner === 'T') return `Tie Game`
  }





function getHandValue(handArr){
  let hasAce = false
  let baseTotal = 0 
  for (let i=0;i<handArr.length; i++){
    baseTotal += handArr[i].value
    hasAce = handArr[i].value === 1 ? true : hasAce //check if the hand contains an ace
  } 
  total = hasAce && baseTotal < 12 ? baseTotal + 10 : baseTotal 
  // console.log(`hand total is ${total}`)
  return total
}

//? sample hands
// let playerHand21 = [
//   {id:'sA', value:1}, 
//   {id:'dK', value:10},
// ]

// let playerHand12 = [
//   {id:'sA', value:1},
//   {id:'cA', value:1}, 
//   {id:'dK', value:10},
// ]
// let playerHand23 = [
//   {id:'sA', value:1},
//   {id:'cA', value:1}, 
//   {id:'h04', value:4}, 
//   {id:'h07', value:7}, 
//   {id:'d10', value:10},
// ]

//? tests commented out unless needed
// console.log('playerHand 21', getHandValue(playerHand21))
// console.log('playerHand 12', getHandValue(playerHand12))
// console.log('playerHand 23', getHandValue(playerHand23))






//