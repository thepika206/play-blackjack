
// ----------------------------Constants----------------------------------------------

const standardCards = [
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
const sfxFanFareF = new Audio('../audio/fanfare-f.flac')
const minDeck = 25
const lowDeck = 40

// ----------------------------Variables (state)--------------------------------------


let deck, playerHand, dealerHand, turn, winner, isNatural, bankAmount, betAmount, payout, hiLoCount, isSpecialDown, isMute
let specialDownFactor = 3  //? this is the multiplier for the special Hit (doubledown)  feature.
// ----------------------------Cached Element references------------------------------
let headlineEl = document.querySelector('#headline-message')
let messageEl = document.querySelector('#game-message')
let specialHitBtn = document.querySelector('#special-hit-btn')
let hitBtn = document.querySelector('#hit-btn')
let standBtn = document.querySelector('#stand-btn')
let playerHandDiv = document.querySelector('#player-hand')
let dealerHandDiv = document.querySelector('#dealer-hand')
let freePlayBtn = document.querySelector('#free-play-btn')
let minBetPlayBtn = document.querySelector('#min-bet-play-btn')
let maxBetPlayBtn = document.querySelector('#max-bet-play-btn')
let deckCountEl = document.querySelector('#deck-count')
let deckCountMeter = document.querySelector('#deck-count-meter')
let hiLoCountEl = document.querySelector('#hi-lo-count')
let hiLoCountMeter = document.querySelector('#hi-lo-count-meter')
let resetGameBtn = document.querySelector('#reset-game-btn')
let bankAmountEl = document.querySelector('#bank-amount')
let betAmountEl = document.querySelector('#bet-amount')
let playerTotalEl = document.querySelector('#player-text')
let muteBtn = document.querySelector('#mute-sound-btn')
// ----------------------------Event Listeners----------------------------------------

specialHitBtn.addEventListener('click', function(){
  if (specialHitAllowed() === true){
    handleClickSpecialHit(playerHand)
  }
})

hitBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){
    handleClickHit(playerHand)
  }
})

standBtn.addEventListener('click', function(){
  if (turn === 'player-turn'){handleClickStand()}
})

freePlayBtn.addEventListener('click', function(){
  if (bankAmount>=0 && (turn === null || turn === 'game-over-turn')) handleClickAnyPlay(0)
  render()
})

minBetPlayBtn.addEventListener('click', function(){
  if (bankAmount>=minBet && (turn === null || turn === 'game-over-turn'))handleClickAnyPlay(minBet)
  render()
})

maxBetPlayBtn.addEventListener('click', function(){
  if (bankAmount>=maxBet && (turn === null || turn === 'game-over-turn'))handleClickAnyPlay(maxBet)
  render()
})

muteBtn.addEventListener('click', function(){
  handleClickMute()
})

resetGameBtn.addEventListener('click', function(){
  handleClickReset()
})


// ----------------------------Functions----------------------------------------------
init()

function init(){
  isMute = true
  bankAmount = 2000
  turn = null
  initStatMeters()
  initDeck()
  initHand()
  render()
}

function initStatMeters() {
  deckCountMeter.setAttribute('low', 40) //? deck reshuffles at 25
  hiLoCountMeter.setAttribute('optimal', 2) //?beta, low count indicates player disadvantage
  hiLoCountMeter.setAttribute('low', -1)
  // hiLoCountMeter.setAttribute('high', 1)
  hiLoCountMeter.setAttribute('min', -7)
  hiLoCountMeter.setAttribute('max', 7)
}

function initHand (){
  playerHand = []
  dealerHand = []
  isSpecialDown = null
  winner = null
  isNatural = null
  betAmount = 0
  payout = 0
  if (deck.length < minDeck) initDeck()
}
function initDeck (){
  deck = JSON.parse(JSON.stringify(standardCards)) //? deck is deep copy of the standard deck constant
  hiLoCount = 0
}

//* click handling functions =================================//

function handleClickReset(){
  init()
}

function handleClickAnyPlay(betBtnAmount){
  turn = 'setup-turn'
  initHand()
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
    turn = 'game-over-turn'  
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
    turn = 'game-over-turn'  
  }
  render()
}

function handleClickStand(){
  turn = 'dealer-turn'
  render()
  dealerTurn()
}

function handleClickMute(){
  if (!isMute) {
    isMute = true
  } else {
    isMute = false
    console.log('unmute')
  }
  playSound('deal')
  render()
}

//* main game flow functions =================================//

function drawCard(handArr) {
  if (deck.length > 0) {
    playSound('deal')
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    handArr.push(cardPicked)
    setHiLoCount(cardPicked.value)
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
        turn = 'initial-deal-turn'
        handleNaturalWin()
      }
    }, 1000)
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

function handleNaturalWin(){
  winner = getNaturalWinner() 
  if (winner) {
    isNatural = true
    turn = 'game-over-turn' 
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
        turn = 'game-over-turn'
        bankAmount += getPayout()
      }
      render()
    }, 800)
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
  renderMuteBtn()
}

function renderStartPlayButtons(){
  let startScreen = (turn === null || turn === 'game-over-turn')
  let affordMin = bankAmount >= minBet
  let affordMax = bankAmount >= maxBet
  startScreen ? freePlayBtn.classList.remove('hidden') : freePlayBtn.classList.add('hidden')
  startScreen && affordMin ? minBetPlayBtn.classList.remove('hidden') : minBetPlayBtn.classList.add('hidden')
  startScreen && affordMax ? maxBetPlayBtn.classList.remove('hidden') : maxBetPlayBtn.classList.add('hidden')
}

function renderInGameButtons(){
  turn === 'player-turn' ? standBtn.classList.remove('hidden') : standBtn.classList.add('hidden')
  turn === 'player-turn' ? hitBtn.classList.remove('hidden') : hitBtn.classList.add('hidden')
  specialHitAllowed() ? specialHitBtn.classList.remove('hidden') : specialHitBtn.classList.add('hidden')
}

function renderStats() {
  bankAmountEl.textContent = bankAmount
  betAmountEl.textContent = betAmount
  hiLoCountEl.textContent = hiLoCount
  hiLoCountMeter.value = hiLoCount
  deckCountEl.textContent = deck.length
  deckCountMeter.value = deck.length
}

function renderMuteBtn() {
  muteBtn.textContent = !isMute ? 'Mute Sound' : 'Unmute'
}

function renderMessage(){
  let message, headline
  let playerTotal = getHandValue(playerHand)
  if (turn === null){
    headline = 'Play Blackjack'
    message = 'select a play option'
  } else if (turn === 'setup-turn'){
    headline = 'New Game Starting'
    message = 'please wait'
  } else if (turn === 'dealer-turn') {
    headline = 'Dealer Turn'
    message = `Your have: ${playerTotal} | Dealer stands on 17 and above`
  } else if (turn === 'player-turn') {
    headline = 'Your Turn'
    message = `You have: ${playerTotal} | Dealer up card: ${dealerHand[0].value}`  
  } else if (turn === 'game-over-turn') {
    headline = winner === 'player' ? `You Won!! Bet was ${betAmount}` : 'Dealer Won'
    headline = winner === 'T' ? 'Tie Game - bet returned' : headline
    message = getWinnerMessages()
  }
  messageEl.textContent = message  
  headlineEl.textContent = headline
  playerTotalEl.textContent = `Player Hand: ${playerTotal}`
  headlineEl.removeAttribute('class')
  headlineEl.classList.add(`${winner}`)
}

function renderDealerHand(){
  dealerHandDiv.innerHTML = ''
  if(dealerHand.length === 0) {
    dealerHandDiv.innerHTML = ''
    let card = document.createElement('div')
    card.classList.add('card', 'medium', `outline`)
    dealerHandDiv.appendChild(card)
  } else if (turn === 'player-turn' && dealerHand.length === 2){
    let card = document.createElement('div')
    card.classList.add('card', 'medium', `${dealerHand[0].id}`)
    dealerHandDiv.appendChild(card)
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
  playerHandDiv.innerHTML = ''
  if(playerHand.length === 0) {
    playerHandDiv.innerHTML = ''
    let card = document.createElement('div')
    card.classList.add('card', 'medium', `outline`)
    playerHandDiv.appendChild(card)
  } else {
    for (let i=0; i<playerHand.length;i++){
      let card = document.createElement('div')
      card.classList.add('card', 'medium', `${playerHand[i].id}`)
      playerHandDiv.appendChild(card)
    }
  }
}


//* utility functions =================================//



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
  if (turn !== 'initial-deal-turn') return null
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
    playSound('natural')
  } else if (winner === 'player') {
    payout = betAmount * 2
    playSound('normal-win')
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
  if (isNatural && winner === 'player') return `You drew a Blackjack - Double Payout!!`
  if (isNatural && winner === 'dealer') return `Dealer drew a Blackjack`
  if (isNatural && winner === 'T') return 'You and the Dealer drew a Blackjack'
  if (winner === 'player') return `Your ${player} beat Dealer's ${dealer}`
  if (winner === 'dealer') return `Your ${player} lost to Dealer's ${dealer}`
  if (winner === 'T') return `Your ${player} equals Dealer's ${dealer}`
}


function setHiLoCount (cardVal){
  if (cardVal > 1 && cardVal < 7) hiLoCount += 1
  if (cardVal === 1 || cardVal === 10) hiLoCount -= 1
  //? ignore 7,8,9 cards which have a neutral effect hiLoCount strategy
}

function specialHitAllowed() {
  return (turn === 'player-turn' && playerHand.length === 2 && (bankAmount >= betAmount * specialDownFactor))
}

function playSound(sound){
  if (isMute === true ) return
  if (sound === 'deal') {
    sfxDeal.volume = .30
    sfxDeal.play()
  } else if (sound === 'natural') {
    sfxFanFareF.volume = .05
    sfxFanFareF.play()
  } else if (sound === 'normal-win') {
    sfxChChing.volume = .10
    sfxChChing.play()
  }
}


const konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba'; 
let keyPressLog = '';
window.addEventListener("keydown", function(evt) {handleKeyPress(evt)})
function handleKeyPress(evt){
  keyPressLog = keyPressLog + evt.key
  if (keyPressLog === konami){
    //what happens next...
    if (bankAmount>=maxBet && (turn === null || turn === 'game-over-turn')){
      alert('konami code detected: 30,000 credits, special down is X6 ')
      specialDownFactor = 6
      bankAmount = 30000
      specialHitBtn.textContent = 'Special'
      handleClickAnyPlay(maxBet)
    }
  }
}