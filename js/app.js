
// ----------------------------Constants----------------------------------------------

const standardDeck = [
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
// ----------------------------Variables (state)--------------------------------------


let deck, playerHand, dealerHand, turn, winner, isNatural, bankAmount, betAmount
// ----------------------------Cached Element references------------------------------
let headlineEl = document.querySelector('#headline-message')
let messageEl = document.querySelector('#game-message')
let drawBtn = document.querySelector('#hit-btn')
let standBtn = document.querySelector('#stand-btn')
let playerHandDiv = document.querySelector('#player-hand')
let dealerHandDiv = document.querySelector('#dealer-hand')
let freePlayBtn = document.querySelector('#free-play-btn')
let minBetPlayBtn = document.querySelector('#min-bet-play-btn')
let deckCountEl = document.querySelector('#deck-count')
let tenCardCountEl = document.querySelector('#ten-card-count')
let resetGameBtn = document.querySelector('#reset-game-btn')
let bankAmountEl = document.querySelector('#bank-amount')
let betAmountEl = document.querySelector('#bet-amount')
// ----------------------------Event Listeners----------------------------------------
drawBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){handleClickHit(playerHand)}
})

standBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){handleClickStand()}
})

freePlayBtn.addEventListener('click', function(){
  console.log('new free game')
  initHand()
  initialDeal(0)
})
minBetPlayBtn.addEventListener('click', function(){
  if (bankAmount>=100){
    console.log('min bet game')
    initHand()
    initialDeal(100)
  } else {
    initHand()
  }
})

resetGameBtn.addEventListener('click', handleClickReset)

// ----------------------------Functions----------------------------------------------
init()

function init(){
  bankAmount = 2000
  initDeck()
  initHand(0)
}


function initHand (){
  console.log('initHand, deck length', deck.length)
  turn = null
  playerHand = []
  dealerHand = []
  winner = null
  isNatural = null
  if (deck.length < 25) initDeck()
  render()
}
function initDeck (){
  deck = JSON.parse(JSON.stringify(standardDeck)) //? need a deep copy of the standard deck, standard deck should not change ever.
  console.log('initDeck, deck length now:', deck.length)
}

function initialDeal(bet) {
  console.log('initialDeal, bet is', bet)
  turn = 'initial-deal'
  betAmount = bet
  bankAmount -= bet
  drawCard(playerHand, 'player')
  drawCard(playerHand, 'player')
  drawCard(dealerHand, 'dealer')
  drawCard(dealerHand, 'dealer')
  winner = getNaturalWinner() 
  if (winner) {
    isNatural = true
    turn = 'game-over' 
    bankAmount += getPayout()  //!pay player if win
  } else {
    turn = 'player-turn'
  }
  render()
}

function dealerTurn(){
  console.log('dealerTurn')
  if (turn !== 'dealer-turn') return
  while (getHandValue(dealerHand) < 17){
    drawCard(dealerHand)
    render()
  }
  if (getHandValue(dealerHand)>21) {
    winner = 'player' 
  } else {   
    winner = getClosest21()
    console.log(winner)
  }
  turn = 'game-over'
  bankAmount += getPayout()  //! pay player if win
  render()
}

function handleClickReset(){
  console.log('reset game')
  init()
}

function handleClickHit(handArr) {
  console.log('handleClickHit')
  drawCard(handArr)
  console.log('hit', playerHand[playerHand.length-1])
  let total = getHandValue(playerHand)
  if (total > 21){
    winner = 'dealer' 
    turn = 'game-over'  
  }
  render()
}

function handleClickStand(){
  console.log('handleClickStand')
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
  renderStats()
}

function renderStats() {
  deckCountEl.textContent = deck.length
  tenCardCountEl.textContent = getTenCardCount()
  bankAmountEl.textContent = bankAmount
  betAmountEl.textContent = betAmount
}

function renderMessage(){
  let message, headline
  let player = getHandValue(playerHand)
  //let dealer = getHandValue(dealerHand) //commented until needed in this function

  if (turn === null){
    headline = 'Play Blackjack'
    message = 'To Start, select a Play option'
  } else if (turn === 'dealer-turn') {
    headline = 'Dealer Turn'
    message = `Your have: ${player} | Dealer hits on 16 or lower`
  } else if (turn === 'player-turn') {
    headline = 'Your Turn'
    message = `You have: ${player} | Dealer Up Card: ${dealerHand[0].value}`  
  } else if (turn === 'game-over') {
    headline = winner === 'player' ? 'You Won' : 'Dealer Won'
    headline = winner === 'T' ? 'Tie Game' : headline
    message = getWinnerMessages()
  }

  messageEl.textContent = message  
  headlineEl.textContent = headline
  
  headlineEl.removeAttribute('class')
  headlineEl.classList.add(`${winner}`)
}

function getWinnerMessages(){
  let player = getHandValue(playerHand)
  let dealer = getHandValue(dealerHand)
  if (player > 21 ) return `You busted with ${player}`
  if (dealer > 21 ) return `Dealer busted with ${dealer}`
  // if (isNatural && winner) return `Natural Blackjack`
  if (isNatural && winner === 'player') return `You drew a Blackjack - Double Payout!!`
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
  let closest
  let player = getHandValue(playerHand)
  let dealer = getHandValue(dealerHand)
  if (player > dealer){
    closest = 'player'
  } else if (player < dealer) {
    closest = 'dealer'
  } else {
    closest = 'T'
  }
  return closest
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

//returns the amount of cards in the deck that have a game value of 10, since this changes player's odds
function getTenCardCount(){
  return deck.reduce(function(acc, el){
    if (el.value === 10) acc += 1
    return acc
  },0)
}

//! not done here
function getPayout(){
  let payout = 0
  if (winner === 'T') {
    payout = betAmount
  } else if (winner === 'player' && isNatural) {
    payout = betAmount * 3
  } else if (winner === 'player') {
    payout = betAmount * 2
  } else {
    payout = 0
  }
  console.log(payout, 'payout')
  return payout
}


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