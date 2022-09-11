
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

let playerHand, dealerHand, turn, winner, isNatural
// ----------------------------Cached Element references------------------------------
let headlineEl = document.querySelector('#headline-message')
let messageEl = document.querySelector('#game-message')
let drawBtn = document.querySelector('#hit-btn')
let standBtn = document.querySelector('#stand-btn')
let playerHandDiv = document.querySelector('#player-hand')
let dealerHandDiv = document.querySelector('#dealer-hand')
let freePlayBtn = document.querySelector('#free-play-btn')
// ----------------------------Event Listeners----------------------------------------
drawBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){handleClickHit(playerHand)}
})

standBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){handleClickStand()}
})

freePlayBtn.addEventListener('click', function(){
  console.log('new free game')
  initialDeal()
})

// ----------------------------Functions----------------------------------------------
initialDeal()

function initialDeal() {
  turn = null
  playerHand = []
  dealerHand = []
  winner = null
  isNatural = null
  turn = 'initial-deal'
  drawCard(playerHand, 'player')
  drawCard(playerHand, 'player')
  drawCard(dealerHand, 'dealer')
  drawCard(dealerHand, 'dealer')
  winner = getNaturalWinner()
  // console.log('winner', winner)
  isNatural = winner ? true : null
  if (!winner) turn = 'player-turn'
  render()
}

function dealerTurn(){
  if (turn !== 'dealer-turn') return
  while (getHandValue(dealerHand) < 17){
    drawCard(dealerHand)
    render()
  }
  if (getHandValue(dealerHand)>21) {
    winner = 'player' //dealer bust
  } else {   
    winner = getClosest21()
    console.log(winner)
  }
  render()
}


function handleClickHit(handArr) {
  drawCard(handArr)
  console.log('hit', playerHand[playerHand.length-1])
  let total = getHandValue(playerHand)
  if (total > 21){
    winner = 'dealer'
    turn = 'dealer-turn'
  }
  render()
}

function handleClickStand(){
  turn = 'dealer-turn'
  render()
  setTimeout(() => {
    console.log("Delayed for 1 second.");
    dealerTurn()
  }, 2000)
}

//this function is used dealing cards to the player and dealer
function drawCard(handArr) {
  if (deck.length > 0) {
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    handArr.push(cardPicked)
  }
  // return cardPicked
}

function render() {
  renderMessage()
  renderDealerHand()
  renderPlayerHand()
}

function renderMessage(){
  let message, headline
  let player = getHandValue(playerHand)
  //let dealer = getHandValue(dealerHand) //commented until needed in this function
  if (winner) {
    headline = winner === 'player' ? 'You Won' : 'Dealer Won'
    headline = winner === 'T' ? 'Tie Game' : headline
    message = getWinnerMessages()
  } else if (turn === 'dealer-turn') {
    headline = 'Dealer Turn'
    message = `Your have: ${player} | Dealer hits on 16 or lower`
  } else {
    headline = 'Your Turn'
    message = `You have: ${player} | Dealer Up Card: ${dealerHand[0].value}`  
  }
  messageEl.textContent = message  
  headlineEl.textContent = headline
}

function getWinnerMessages(){
  let player = getHandValue(playerHand)
  let dealer = getHandValue(dealerHand)
  if (player > 21 ) return `You busted with ${player}`
  if (dealer > 21 ) return `Dealer busted with ${dealer}`
  // if (isNatural && winner) return `Natural Blackjack`
  if (isNatural && winner === 'player') return `You drew a Blackjack - Bonus Payout!!`
  if (isNatural && winner === 'dealer') return `Dealer drew a Blackjack`
  if (isNatural && winner === 'T') return 'You and the Dealer drew a Blackjack'
  if (winner === 'player') return `Your ${player} beat Dealer's ${dealer}`
  if (winner === 'dealer') return `Your ${player} lost to Dealer's ${dealer}`
  if (winner === 'T') return `Your ${player} equals Dealer's ${dealer}`
}
function renderDealerHand(){
  dealerHandDiv.innerHTML = ''
  if (turn === 'player-turn'){
    //dealer's up card during player turn
    let card = document.createElement('div')
    card.classList.add('card', 'medium', `${dealerHand[0].id}`)
    dealerHandDiv.appendChild(card)
    //dealer's second card is face down during player turn
    let downCard = document.createElement('div')
    downCard.classList.add('card', 'medium', 'back-red')
    dealerHandDiv.appendChild(downCard)
  } else {
    for (let i=0; i<dealerHand.length;i++){
      let card = document.createElement('div')
      card.classList.add('card', 'medium', `${dealerHand[i].id}`)
      dealerHandDiv.appendChild(card)
    }
  }
}

function renderPlayerHand(){
  //for each card in the playerHandArr, create dynamic html structure and append into the player hand el
  //classList.add the card.id value
  playerHandDiv.innerHTML = ''
  for (let i=0; i<playerHand.length;i++){
    let card = document.createElement('div')
    card.classList.add('card', 'medium', `${playerHand[i].id}`)
    playerHandDiv.appendChild(card)
  }
}




/* hand containing any Aces with a basic value of less than 12 should count an extra 10 to the total.  Otherwise only use the basic value */  
function getHandValue(handArr){
  let hasAce = false
  let baseTotal = 0 
  for (let i=0;i<handArr.length; i++){
    baseTotal += handArr[i].value
    hasAce = handArr[i].value === 1 ? true : hasAce
  } 
  total = hasAce && baseTotal < 12 ? baseTotal + 10 : baseTotal 
  return total
}


function getClosest21(){
  let player = getHandValue(playerHand)
  let dealer = getHandValue(dealerHand)
  if (player > dealer) return 'player'
  if (player < dealer) return 'dealer'
  return 'T'
}

function getNaturalWinner(){
  if (turn !== 'initial-deal') return null
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

//! call this test in console to test a larger hand
function testFillPlayerHand(){
initialDeal()
playerHand = [
    {id:'d06', value:6},
    {id:'d05', value:5},
    {id:'d04', value:4},
    {id:'d03', value:3},
    {id:'d02', value:2},
    {id:'hA', value:1},
  ]
render()
console.log('end of testFillPlayerHand')
}    