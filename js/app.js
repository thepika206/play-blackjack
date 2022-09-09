
// ----------------------------Constants----------------------------------------------
// ----------------------------Variables (state)--------------------------------------
// ----------------------------Cached Element references------------------------------
let messageEl = document.querySelector('#game-message')
let drawBtn = document.querySelector('#draw-btn')
// ----------------------------Event Listeners----------------------------------------
drawBtn.addEventListener('click', function(){
  console.log('click draw')
})


// ----------------------------Functions----------------------------------------------


//* examples of player hands for testing getHandValue

let playerHand21 = [
  {id:'sA', value:1}, 
  {id:'dK', value:10},
]

let playerHand12 = [
  {id:'sA', value:1},
  {id:'cA', value:1}, 
  {id:'dK', value:10},
]



function getHandValue(handArr){
  let hasAce = false
  let total = 0 
  for (let i=0;i<handArr.length; i++){
    total += handArr[i].value
    hasAce = handArr[i].value === 1 ? true : hasAce
  } 
  return hasAce && total < 12 ? total + 10 : total 
}
console.log('playerHand 21', getHandValue(playerHand21))
console.log('playerHand 12', getHandValue(playerHand12))
// console.log('playerHand 25', getHandValue(playerHand25))








//