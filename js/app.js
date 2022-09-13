
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
const minBet = 100
const maxBet = 500
const sfxDeal = new Audio('../audio/dealing-card2.wav')
const sfxChChing = new Audio('../audio/ch-ching.wav')
const specialDownFactor = 3

// ----------------------------Variables (state)--------------------------------------


let deck, playerHand, dealerHand, turn, winner, isNatural, bankAmount, betAmount, payout, hiLoCount, isSpecialDown
// ----------------------------Cached Element references------------------------------
let headlineEl = document.querySelector('#headline-message')
let messageEl = document.querySelector('#game-message')
let specialHitBtn = document.querySelector('#special-hit-btn')
let drawBtn = document.querySelector('#hit-btn') //!rename this later to hitBtn
let standBtn = document.querySelector('#stand-btn')
let playerHandDiv = document.querySelector('#player-hand')
let dealerHandDiv = document.querySelector('#dealer-hand')
let freePlayBtn = document.querySelector('#free-play-btn')
let minBetPlayBtn = document.querySelector('#min-bet-play-btn')
let maxBetPlayBtn = document.querySelector('#max-bet-play-btn')
let deckCountEl = document.querySelector('#deck-count')
let deckCountPBar = document.querySelector('#deck-count--progress')
let hiLoCountEl = document.querySelector('#hi-lo-count')
let resetGameBtn = document.querySelector('#reset-game-btn')
let bankAmountEl = document.querySelector('#bank-amount')
let betAmountEl = document.querySelector('#bet-amount')
let playerTotalEl = document.querySelector('#player-text')
// ----------------------------Event Listeners----------------------------------------

specialHitBtn.addEventListener('click', function(){
  if (specialHitAllowed){
    handleClickSpecialHit(playerHand)
  }
})

drawBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){
    handleClickHit(playerHand)
  }
})

standBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){handleClickStand()}
})

freePlayBtn.addEventListener('click', function(){
  if (bankAmount>=0 && (turn === null || turn === 'game-over')){
    initHand()
    handleClickAnyPlay(0)
  } 
})
minBetPlayBtn.addEventListener('click', function(){
  if (bankAmount>=minBet && (turn === null || turn === 'game-over')){
    initHand()
    handleClickAnyPlay(minBet)
  } 
})
maxBetPlayBtn.addEventListener('click', function(){
  if (bankAmount>=maxBet && (turn === null || turn === 'game-over')){
    initHand()
    handleClickAnyPlay(maxBet)
  } 
})

resetGameBtn.addEventListener('click', function(){
  handleClickReset()
})

// ----------------------------Functions----------------------------------------------
init()

function init(){
  bankAmount = 2000
  initDeck()
  initHand(0)
}

function initHand (){
  turn = null
  playerHand = []
  dealerHand = []
  isSpecialDown = null
  winner = null
  isNatural = null
  betAmount = 0
  payout = 0
  if (deck.length < 25) initDeck()
  render()
}
function initDeck (){
  deck = JSON.parse(JSON.stringify(standardDeck)) //? deck is deep copy of the standard deck constant
  hiLoCount = 0
}

//* click handling functions =================================//

function handleClickReset(){
  init()
}

function handleClickAnyPlay(betBtnAmount){
  turn = 'setup'
  betAmount = betBtnAmount
  bankAmount -= betBtnAmount
  render()
  initialDeal(4)
}


function handleClickSpecialHit(handArr) {
  isSpecialDown = true
  drawCard(handArr)
  betAmount *= specialDownFactor
  bankAmount -= betAmount
  let total = getHandValue(playerHand)
  if (total > 21){
    winner = 'dealer' 
    turn = 'game-over'  
    render()
  } else {
    handleClickStand()
  }
}
function handleClickHit(handArr) {
  drawCard(handArr)
  let total = getHandValue(playerHand)
  if (total > 21){
    winner = 'dealer' 
    turn = 'game-over'  
  }
  render()
}

function handleClickStand(){
  turn = 'dealer-turn'
  render()
  dealerTurn()
}

//* main game flow functions =================================//

function drawCard(handArr) {
  if (deck.length > 0) {
    sfxDeal.volume = .50
    sfxDeal.play()
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    handArr.push(cardPicked)
    incrHiLoCount(cardPicked.value)
  }
}
function initialDeal(cardCount) {
  let seat = 1
  let i=0
  loop()
  function loop(){
    setTimeout(()=>{
      i += 1
      drawCard(seat === 1 ? playerHand : dealerHand, )
      seat *= -1
      render()
      if (i < cardCount) {
        loop()
      } else {
        turn = 'initial-deal'
        handleNaturalWin()
      }
    }, 500)
  }
}

function handleNaturalWin(){
  winner = getNaturalWinner() 
  if (winner) {
    isNatural = true
    turn = 'game-over' 
    bankAmount += getPayout()  
  } else {
    turn = 'player-turn'
  }
  render()
}


function dealerTurn(){
  if (turn !== 'dealer-turn') return
  hitDealer()
  function hitDealer() {
    setTimeout(function (){
      if (getHandValue(dealerHand) < 17) {
        drawCard(dealerHand)
        hitDealer()
      } else{
        if (getHandValue(dealerHand) > 21) {
          winner = 'player' 
        } else {   
          winner = getClosest21()
        }
        turn = 'game-over'
        bankAmount += getPayout()
      }
      render()
    }, 1000)
  }
}  

//* rendering functions =================================//
function render() {
  renderMessage()
  renderDealerHand()
  renderPlayerHand()
  renderStats()
  renderInGameButtons()
  renderStartPlayButtons()
}

function renderStartPlayButtons(){
  if (turn === null || turn === 'game-over') {
    freePlayBtn.classList.remove('hidden')
    minBetPlayBtn.classList.remove('hidden')
    maxBetPlayBtn.classList.remove('hidden')
  } else {
    freePlayBtn.classList.add('hidden')
    minBetPlayBtn.classList.add('hidden')
    maxBetPlayBtn.classList.add('hidden')
  }
}

function renderInGameButtons(){
  if (turn === 'player-turn'){
    standBtn.classList.remove('hidden')
    drawBtn.classList.remove('hidden')
  } else {
    standBtn.classList.add('hidden')
    drawBtn.classList.add('hidden')
  }
  if (specialHitAllowed()) {
    specialHitBtn.classList.remove('hidden')
  } else {
    specialHitBtn.classList.add('hidden')
  }  
}

function renderStats() {
  deckCountEl.textContent = deck.length
  if (deck.length < 25) {
    deckCountEl.classList.add('value-warning')
  } else {
    deckCountEl.classList.remove('value-warning')
  }
  hiLoCountEl.textContent = hiLoCount
  bankAmountEl.textContent = bankAmount
  betAmountEl.textContent = betAmount
  deckCountPBar.value = deck.length
}

function renderMessage(){
  let message, headline
  let player = getHandValue(playerHand)
  if (turn === null){
    headline = 'Play Blackjack'
    if (bankAmount >= maxBet){
      message = 'To Start, select a Play option'
    } else if (bankAmount >= minBet) {
      message = 'Select Bet 100 Play or Free Play'
    } else {
      message = 'Select Free Play only'
    }
  } else if (turn === 'setup'){
    headline = 'New Game Starting'
    message = 'please wait'
  } else if (turn === 'dealer-turn') {
    headline = 'Dealer Turn'
    message = `Your have: ${player} | Dealer stands on 17 and above`
  } else if (turn === 'player-turn') {
    headline = 'Your Turn'
    message = `You have: ${player} | Dealer Up Card: ${dealerHand[0].value}`  
  } else if (turn === 'game-over') {
    headline = winner === 'player' ? `You Won!! Bet was ${betAmount}` : 'Dealer Won'
    headline = winner === 'T' ? 'Tie Game - bet returned' : headline
    message = getWinnerMessages()
  }
  messageEl.textContent = message  
  headlineEl.textContent = headline
  playerTotalEl.textContent = `Player Hand: ${getHandValue(playerHand)}`
  headlineEl.removeAttribute('class')
  headlineEl.classList.add(`${winner}`)
}

function renderDealerHand(){
  dealerHandDiv.innerHTML = ''
  if (turn === 'player-turn' && dealerHand.length === 2){
    let card = document.createElement('div')
    card.classList.add('card', 'medium', `${dealerHand[0].id}`)
    dealerHandDiv.appendChild(card)
    let downCard = document.createElement('div')
    downCard.classList.add('card', 'medium', 'back-red') //? the dealer down card
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
  playerHandDiv.innerHTML = ''
  for (let i=0; i<playerHand.length;i++){
    let card = document.createElement('div')
    card.classList.add('card', 'medium', `${playerHand[i].id}`)
    playerHandDiv.appendChild(card)
  }
}

//* utility functions =================================//

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

function getPayout(){
  if (winner === 'T') {
    payout = betAmount
  } else if (winner === 'player' && isNatural) {
    payout = betAmount * 3
  } else if (winner === 'player') {
    payout = betAmount * 2
    sfxChChing.volume = .20
    sfxChChing.play()
  } else {
    payout = 0
  }
  // console.log(payout, 'payout') //?leave this commented for troubleshooting payout issues
  return payout
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


function incrHiLoCount (cardVal){
  if (cardVal > 1 && cardVal < 7) hiLoCount += 1
  if (cardVal === 1 || cardVal === 10) hiLoCount -= 1
}

function specialHitAllowed() {
  return (turn === 'player-turn' && playerHand.length === 2 && (bankAmount >= betAmount * specialDownFactor))
}