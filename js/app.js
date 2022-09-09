
// ----------------------------Constants----------------------------------------------
// ----------------------------Variables (state)--------------------------------------
// ----------------------------Cached Element references------------------------------
// ----------------------------Event Listeners----------------------------------------
// ----------------------------Functions----------------------------------------------


//* examples of player hands for testing getHandValue
let playerHand21 = [
  {suit:'spade', rank:1, value:1}, 
  {suit:'spade', rank:13, value:10},
]
let playerHand12 = [
  {suit:'spade', rank:1, value:1}, 
  {suit:'spade', rank:1, value:1}, 
  {suit:'spade', rank:13, value:10},
]
let playerHand25 = [
  {suit:'spade', rank:3, value:3}, 
  {suit:'diamond', rank:2, value:2}, 
  {suit:'club', rank:10, value:10},
  {suit:'heart', rank:11, value:10},
]


function getHandValue(handArr){
  let hasAce = false
  let total = 0 
  for (let i=0;i<handArr.length; i++){
    total += handArr[i].value
    hasAce = handArr[i].value === 1 ? true : hasAce
  } 
  return hasAce && total < 12 ? total + 10 : total //if the hand has an ace and the hard total is under 12, then the bonus 10 value is applicable to the total
}
console.log('playerHand 21', getHandValue(playerHand21))
console.log('playerHand 12', getHandValue(playerHand12))
console.log('playerHand 25', getHandValue(playerHand25))








//