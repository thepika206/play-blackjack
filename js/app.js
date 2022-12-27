
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
const deckBoot = 6 //the number of standard decks to draw from
const minBet = 100
const maxBet = 500
const sfxDeal = new Audio('../audio/dealing-card2.wav')
const sfxChChing = new Audio('../audio/ch-ching.wav')
const sfxFanFareF = new Audio('../audio/fanfare-f.flac')
// const sfxOnFireTrack = new Audio('../audio/melody-loop-110-bpm.mp3') //? may want this music track later
const minDeck = 52
const lowDeck = 104

// ----------------------------Variables (state)--------------------------------------


let deck = []
let playerHand, dealerHand, turn, winner, isNatural, bankAmount, betAmount, payout, hiLoCount, isSpecialDown, playAgainTimeoutID
let isMute = false
let specialDownFactor = 2  //? this is the multiplier for the special Hit (doubledown) feature and can change with special code
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
let strategyHintEl = document.querySelector('#strategy-hint')
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
  init()
})


// ----------------------------Functions----------------------------------------------
init()

function init(){
  bankAmount = 2000
  turn = null
  initStatMeters()
  initDeck()
  initHand()
  render()
}

function initStatMeters(){
  deckCountMeter.setAttribute('low', lowDeck) //? deck reshuffles at 25
  hiLoCountMeter.setAttribute('optimal', 2) //?beta, low count indicates player disadvantage
  hiLoCountMeter.setAttribute('low', -1)
  hiLoCountMeter.setAttribute('min', -7)
  hiLoCountMeter.setAttribute('max', 7)
}

function initHand(){
  playerHand = []
  dealerHand = []
  isSpecialDown = null
  winner = null
  isNatural = null
  betAmount = 0
  payout = 0
  if (deck.length < minDeck) initDeck()
  strategyHintEl.innerText = 'Hint:'
}
function initDeck(){
  for (let i=0; i<deckBoot; i++){//create a "boot" containing deckBoot number of decks
    // console.log('add deck')
    newDeck = structuredClone(standardCards) //? deck is deep copy of the standard deck constant using structured clone
    deck = [...deck, ...newDeck]
  }
  // console.log(deck)
  hiLoCount = 0
}

//* click handling functions =================================//


function handleClickAnyPlay(betBtnAmount){
  clearTimeout(playAgainTimeoutID)
  turn = 'setup-turn'
  initHand()
  betAmount = betBtnAmount
  bankAmount -= betBtnAmount
  render()
  initialDeal(4)
}


function handleClickSpecialHit(handArr){
  isSpecialDown = true
  betAmount *= specialDownFactor
  bankAmount -= betAmount
  render()
  setTimeout(() => {
    drawCard(handArr)
    let total = getHandValue(playerHand)
    if (total > 21){
      winner = 'dealer' 
      turn = 'game-over-turn'  
      render()
    } else {
      handleClickStand()
    }
  }, 2000);
}
function handleClickHit(handArr){
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
  setTimeout(() => {
    dealerTurn()
  }, 1000);
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

function drawCard(handArr){
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
function render(){
  renderMessage()
  renderDealerHand()
  renderPlayerHand()
  renderStats()
  renderInGameButtons()
  renderStartPlayButtons()
  renderMuteBtn()
  renderRecommendedMove()
}

function renderStartPlayButtons(){
  let startScreen = (turn === null || turn === 'game-over-turn')
  let affordMin = bankAmount >= minBet
  let affordMax = bankAmount >= maxBet
  freePlayBtn.style.visibility = startScreen ? 'visible' : 'hidden'
  minBetPlayBtn.style.visibility = startScreen && affordMin ? 'visible' : 'hidden'
  maxBetPlayBtn.style.visibility = startScreen && affordMax ? 'visible' : 'hidden'
}

function renderInGameButtons(){
  standBtn.style.visibility = turn === 'player-turn' ? 'visible' : 'hidden'
  hitBtn.style.visibility = turn === 'player-turn' ? 'visible' : 'hidden'
  specialHitBtn.style.visibility = specialHitAllowed() ? 'visible' : 'hidden'
}

function renderStats() {
  bankAmountEl.textContent = bankAmount
  betAmountEl.textContent = betAmount
  hiLoCountEl.textContent = hiLoCount
  hiLoCountMeter.value = hiLoCount
  deckCountEl.textContent = deck.length
  deckCountMeter.value = deck.length
}

function renderMuteBtn(){
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
  } else if (turn === 'player-turn' && !isSpecialDown) {
    headline = 'Your Turn'
    message = `You have: ${playerTotal} | Dealer up card: ${dealerHand[0].value}`  
  } else if (turn === 'player-turn' && isSpecialDown) {
    headline = `${specialDownFactor} X Down, Draw One Card...`
    message = `You have: ${playerTotal} | Dealer up card: ${dealerHand[0].value}`  
  } else if (turn === 'game-over-turn') {
    headline = winner === 'player' ? `You Won ${payout}!` : 'Dealer Won'
    headline = winner === 'T' ? 'Tie Game - bet returned' : headline
    message = getWinnerMessages()
  }
  messageEl.textContent = message  
  headlineEl.textContent = headline
  playerTotalEl.textContent = `Player Hand: ${playerTotal}`
  headlineEl.removeAttribute('class')
  headlineEl.classList.add(`${winner}`)
  if (turn === 'game-over-turn'){
    playAgainTimeoutID = setTimeout(() => {
      headlineEl.removeAttribute('class')
      headlineEl.textContent = 'Play again?'
      messageEl.textContent = 'select a play option'
    }, 7000);
  }
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
    payout = betAmount * 2.5
    playSound('major-win')
  } else if (winner === 'player' && isSpecialDown) {
    payout = betAmount * 2
    playSound('major-win')
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
  if (dealer > 21 && !isSpecialDown ) return `Dealer busted with ${dealer}`
  if (isNatural && winner === 'player') return `You drew a Natural Blackjack`
  if (isNatural && winner === 'dealer') return `Dealer drew a Natural Blackjack`
  if (isNatural && winner === 'T') return 'You and the Dealer drew a Natural Blackjack'
  if (winner === 'player' && isSpecialDown) return `Congratulations on the ${specialDownFactor} X win`
  if (winner === 'player') return `Your ${player} beat Dealer's ${dealer}`
  if (winner === 'dealer') return `Your ${player} lost to Dealer's ${dealer}`
  if (winner === 'T') return `Your ${player} equals Dealer's ${dealer}`
}


function setHiLoCount(cardVal){
  if (cardVal > 1 && cardVal < 7) hiLoCount += 1
  if (cardVal === 1 || cardVal === 10) hiLoCount -= 1
  //? ignore 7,8,9 cards which have a neutral effect hiLoCount strategy
}

function specialHitAllowed(){
  return (turn === 'player-turn' && playerHand.length === 2 && (bankAmount >= betAmount * specialDownFactor) && !isSpecialDown)
}

function playSound(sound){
  if (isMute === true ) return
  if (sound === 'deal') {
    sfxDeal.volume = .30
    sfxDeal.play()
  } else if (sound === 'major-win') {
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

function handHasAce(handArr){
  let solution = false
  handArr.forEach(card => {
    solution = card.value === 1 ? true : solution
  })
  return solution
} 

function renderRecommendedMove(){
  if (turn !== 'player-turn'){
    strategyHintEl.innerText = `Hint: `
    return
  } else {
    let hint
    let dealerCardValue = dealerHand[0].value
    let hasAce = handHasAce(playerHand)
    let playerTotal = getHandValue(playerHand)
    let dealerCardStr = dealerCardValue === 1 ? 'A' : `${dealerCardValue}`
    // console.log(strategy[`${playerTotal}-${hasAce}-${dealerCardStr}`])
    hint = strategy[`${playerTotal}-${hasAce}-${dealerCardStr}`]
    strategyHintEl.innerText = `Hint: ${hint}`
    return
  }
  
  
}

// Strategy guide according to https://www.blackjackclassroom.com/blackjack-basic-strategy-charts without split hand options 
//'playerTotal'-'hasAceBoolean'-'dealerCard'
const strategy = {
  '21-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '21-false-3' : 'stand',
  '21-false-4' : 'stand',
  '21-false-5' : 'stand',
  '21-false-6' : 'stand',
  '21-false-7' : 'stand',
  '21-false-8' : 'stand',
  '21-false-9' : 'stand',
  '21-false-10': 'stand',
  '21-false-A' : 'stand',
  '20-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '20-false-3' : 'stand',
  '20-false-4' : 'stand',
  '20-false-5' : 'stand',
  '20-false-6' : 'stand',
  '20-false-7' : 'stand',
  '20-false-8' : 'stand',
  '20-false-9' : 'stand',
  '20-false-10': 'stand',
  '20-false-A' : 'stand',
  '19-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '19-false-3' : 'stand',
  '19-false-4' : 'stand',
  '19-false-5' : 'stand',
  '19-false-6' : 'stand',
  '19-false-7' : 'stand',
  '19-false-8' : 'stand',
  '19-false-9' : 'stand',
  '19-false-10': 'stand',
  '19-false-A' : 'stand',
  '18-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '18-false-3' : 'stand',
  '18-false-4' : 'stand',
  '18-false-5' : 'stand',
  '18-false-6' : 'stand',
  '18-false-7' : 'stand',
  '18-false-8' : 'stand',
  '18-false-9' : 'stand',
  '18-false-10': 'stand',
  '18-false-A' : 'stand',
  '17-false-2' : 'stand',//playerTotal (21-17) strategy is the same
  '17-false-3' : 'stand',
  '17-false-4' : 'stand',
  '17-false-5' : 'stand',
  '17-false-6' : 'stand',
  '17-false-7' : 'stand',
  '17-false-8' : 'stand',
  '17-false-9' : 'stand',
  '17-false-10': 'stand',
  '17-false-A' : 'stand',
  '16-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '16-false-3' : 'stand',
  '16-false-4' : 'stand',
  '16-false-5' : 'stand',
  '16-false-6' : 'stand',
  '16-false-7' : 'hit',
  '16-false-8' : 'hit',
  '16-false-9' : 'hit',
  '16-false-10': 'hit',
  '16-false-A' : 'hit',
  '15-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '15-false-3' : 'stand',
  '15-false-4' : 'stand',
  '15-false-5' : 'stand',
  '15-false-6' : 'stand',
  '15-false-7' : 'hit',
  '15-false-8' : 'hit',
  '15-false-9' : 'hit',
  '15-false-10': 'hit',
  '15-false-A' : 'hit',
  '14-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '14-false-3' : 'stand',
  '14-false-4' : 'stand',
  '14-false-5' : 'stand',
  '14-false-6' : 'stand',
  '14-false-7' : 'hit',
  '14-false-8' : 'hit',
  '14-false-9' : 'hit',
  '14-false-10': 'hit',
  '14-false-A' : 'hit',
  '13-false-2' : 'stand',//playerTotal (13-16) strategy is the same
  '13-false-3' : 'stand',
  '13-false-4' : 'stand',
  '13-false-5' : 'stand',
  '13-false-6' : 'stand',
  '13-false-7' : 'hit',
  '13-false-8' : 'hit',
  '13-false-9' : 'hit',
  '13-false-10': 'hit',
  '13-false-A' : 'hit',
  '12-false-2' : 'hit',
  '12-false-3' : 'hit',
  '12-false-4' : 'stand',
  '12-false-5' : 'stand',
  '12-false-6' : 'stand',
  '12-false-7' : 'hit',
  '12-false-8' : 'hit',
  '12-false-9' : 'hit',
  '12-false-10': 'hit',
  '12-false-A' : 'hit',
  '11-false-2' : 'double',
  '11-false-3' : 'double',
  '11-false-4' : 'double',
  '11-false-5' : 'double',
  '11-false-6' : 'double',
  '11-false-7' : 'double',
  '11-false-8' : 'double',
  '11-false-9' : 'double',
  '11-false-10': 'double',
  '11-false-A' : 'hit',
  '10-false-2' : 'double',
  '10-false-3' : 'double',
  '10-false-4' : 'double',
  '10-false-5' : 'double',
  '10-false-6' : 'double',
  '10-false-7' : 'double',
  '10-false-8' : 'double',
  '10-false-9' : 'double',
  '10-false-10': 'hit',
  '10-false-A' : 'hit',
  '9-false-2'  : 'hit',
  '9-false-3'  : 'double',
  '9-false-4'  : 'double',
  '9-false-5'  : 'double',
  '9-false-6'  : 'double',
  '9-false-7'  : 'hit',
  '9-false-8'  : 'hit',
  '9-false-9'  : 'hit',
  '9-false-10' : 'hit',
  '9-false-A'  : 'hit',
  '8-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '8-false-3'  : 'hit',
  '8-false-4'  : 'hit',
  '8-false-5'  : 'hit',
  '8-false-6'  : 'hit',
  '8-false-7'  : 'hit',
  '8-false-8'  : 'hit',
  '8-false-9'  : 'hit',
  '8-false-10' : 'hit',
  '8-false-A'  : 'hit',
  '7-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '7-false-3'  : 'hit',
  '7-false-4'  : 'hit',
  '7-false-5'  : 'hit',
  '7-false-6'  : 'hit',
  '7-false-7'  : 'hit',
  '7-false-8'  : 'hit',
  '7-false-9'  : 'hit',
  '7-false-10' : 'hit',
  '7-false-A'  : 'hit',
  '6-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '6-false-3'  : 'hit',
  '6-false-4'  : 'hit',
  '6-false-5'  : 'hit',
  '6-false-6'  : 'hit',
  '6-false-7'  : 'hit',
  '6-false-8'  : 'hit',
  '6-false-9'  : 'hit',
  '6-false-10' : 'hit',
  '6-false-A'  : 'hit',
  '5-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '5-false-3'  : 'hit',
  '5-false-4'  : 'hit',
  '5-false-5'  : 'hit',
  '5-false-6'  : 'hit',
  '5-false-7'  : 'hit',
  '5-false-8'  : 'hit',
  '5-false-9'  : 'hit',
  '5-false-10' : 'hit',
  '5-false-A'  : 'hit',
  '4-false-2'  : 'hit',//playerTotal (4-8)strategy is the same
  '4-false-3'  : 'hit',
  '4-false-4'  : 'hit',
  '4-false-5'  : 'hit',
  '4-false-6'  : 'hit',
  '4-false-7'  : 'hit',
  '4-false-8'  : 'hit',
  '4-false-9'  : 'hit',
  '4-false-10' : 'hit',
  '4-false-A'  : 'hit',
  '21-true-2' : 'stand',
  '21-true-3' : 'stand',
  '21-true-4' : 'stand',
  '21-true-5' : 'stand',
  '21-true-6' : 'stand',
  '21-true-7' : 'stand',
  '21-true-8' : 'stand',
  '21-true-9' : 'stand',
  '21-true-10': 'stand',
  '21-true-A' : 'stand',
  '20-true-2' : 'stand',
  '20-true-3' : 'stand',
  '20-true-4' : 'stand',
  '20-true-5' : 'stand',
  '20-true-6' : 'stand',
  '20-true-7' : 'stand',
  '20-true-8' : 'stand',
  '20-true-9' : 'stand',
  '20-true-10': 'stand',
  '20-true-A' : 'stand',
  '19-true-2' : 'stand',//A-8
  '19-true-3' : 'stand',
  '19-true-4' : 'stand',
  '19-true-5' : 'stand',
  '19-true-6' : 'stand',
  '19-true-7' : 'stand',
  '19-true-8' : 'stand',
  '19-true-9' : 'stand',
  '19-true-10': 'stand',
  '19-true-A' : 'stand',
  '18-true-2' : 'stand',//A-7
  '18-true-3' : 'double',
  '18-true-4' : 'double',
  '18-true-5' : 'double',
  '18-true-6' : 'double',
  '18-true-7' : 'stand',
  '18-true-8' : 'stand',
  '18-true-9' : 'hit',
  '18-true-10': 'hit',
  '18-true-A' : 'hit',
  '17-true-2' : 'hit',//A-6
  '17-true-3' : 'double',
  '17-true-4' : 'double',
  '17-true-5' : 'double',
  '17-true-6' : 'double',
  '17-true-7' : 'hit',
  '17-true-8' : 'hit',
  '17-true-9' : 'hit',
  '17-true-10': 'hit',
  '17-true-A' : 'hit',
  '16-true-2' : 'hit',//A-5
  '16-true-3' : 'hit',
  '16-true-4' : 'double',
  '16-true-5' : 'double',
  '16-true-6' : 'double',
  '16-true-7' : 'hit',
  '16-true-8' : 'hit',
  '16-true-9' : 'hit',
  '16-true-10': 'hit',
  '16-true-A' : 'hit',
  '15-true-2' : 'hit',//A-4
  '15-true-3' : 'hit',
  '15-true-4' : 'double',
  '15-true-5' : 'double',
  '15-true-6' : 'double',
  '15-true-7' : 'hit',
  '15-true-8' : 'hit',
  '15-true-9' : 'hit',
  '15-true-10': 'hit',
  '15-true-A' : 'hit',
  '14-true-2' : 'hit',//A-3
  '14-true-3' : 'hit',
  '14-true-4' : 'hit',
  '14-true-5' : 'double',
  '14-true-6' : 'double',
  '14-true-7' : 'hit',
  '14-true-8' : 'hit',
  '14-true-9' : 'hit',
  '14-true-10': 'hit',
  '14-true-A' : 'hit',
  '13-true-2' : 'hit',//A-2
  '13-true-3' : 'hit',
  '13-true-4' : 'hit',
  '13-true-5' : 'double',
  '13-true-6' : 'double',
  '13-true-7' : 'hit',
  '13-true-8' : 'hit',
  '13-true-9' : 'hit',
  '13-true-10': 'hit',
  '13-true-A' : 'hit',
  '12-true-2' : 'hit',//A-A
  '12-true-3' : 'hit',
  '12-true-4' : 'hit',
  '12-true-5' : 'double',
  '12-true-6' : 'double',
  '12-true-7' : 'hit',
  '12-true-8' : 'hit',
  '12-true-9' : 'hit',
  '12-true-10': 'hit',
  '12-true-A' : 'hit',
}

let examplehand =
[
  {id:'dA', value:1},
  {id:'d04', value:4},
]