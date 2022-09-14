// copy into the app.js file below this line *************
const konami = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba'; 
let keyPressLog = '';
window.addEventListener("keydown", function(evt) {handleKeyPress(evt)})
function handleKeyPress(evt){
  keyPressLog = keyPressLog + evt.key
  if (keyPressLog === konami){
    alert('konami code detected: nes mode activated')
    //what happens next...
    bankAmount === 30000
    render()
  }
}
// to this line here ******************

//! working on a strategy guide 

//  function to return a string that is either  'hit', 'stand', 'double'
// arg dealerUp:(value of dealer's up), playerTotal :(player base total), hasAce

const recommendedMove17 = [
  {dealer: 2, player: 5, ace: false, move: 'hit'},
  {dealer: 3, player: 5, ace: false, move: 'hit'},
  {dealer: 4, player: 5, ace: false, move: 'hit'},
  {dealer: 5, player: 5, ace: false, move: 'hit'},
  {dealer: 6, player: 5, ace: false, move: 'hit'},
  {dealer: 7, player: 5, ace: false, move: 'hit'},
  {dealer: 8, player: 5, ace: false, move: 'hit'},
  {dealer: 9, player: 5, ace: false, move: 'hit'},
  {dealer: 10, player: 5, ace: false, move: 'hit'},
  {dealer: 1, player: 5, ace: false, move: 'hit'},
  {dealer: 2, player: 6, ace: false, move: 'hit'},
  {dealer: 3, player: 6, ace: false, move: 'hit'},
  {dealer: 4, player: 6, ace: false, move: 'hit'},
  {dealer: 5, player: 6, ace: false, move: 'hit'},
  {dealer: 6, player: 6, ace: false, move: 'hit'},
  {dealer: 7, player: 6, ace: false, move: 'hit'},
  {dealer: 8, player: 6, ace: false, move: 'hit'},
  {dealer: 9, player: 6, ace: false, move: 'hit'},
  {dealer: 10, player: 6, ace: false, move: 'hit'},
  {dealer: 1, player: 6, ace: false, move: 'hit'},
  {dealer: 2, player: 7, ace: false, move: 'hit'},
  {dealer: 3, player: 7, ace: false, move: 'hit'},
  {dealer: 4, player: 7, ace: false, move: 'hit'},
  {dealer: 5, player: 7, ace: false, move: 'hit'},
  {dealer: 6, player: 7, ace: false, move: 'hit'},
  {dealer: 7, player: 7, ace: false, move: 'hit'},
  {dealer: 8, player: 7, ace: false, move: 'hit'},
  {dealer: 9, player: 7, ace: false, move: 'hit'},
  {dealer: 10, player: 7, ace: false, move: 'hit'},
  {dealer: 1, player: 7, ace: false, move: 'hit'},
  {dealer: 2, player: 8, ace: false, move: 'hit'},
  {dealer: 3, player: 8, ace: false, move: 'hit'},
  {dealer: 4, player: 8, ace: false, move: 'hit'},
  {dealer: 5, player: 8, ace: false, move: 'hit'},
  {dealer: 6, player: 8, ace: false, move: 'hit'},
  {dealer: 7, player: 8, ace: false, move: 'hit'},
  {dealer: 8, player: 8, ace: false, move: 'hit'},
  {dealer: 9, player: 8, ace: false, move: 'hit'},
  {dealer: 10, player: 8, ace: false, move: 'hit'},
  {dealer: 1, player: 8, ace: false, move: 'hit'},
  {dealer: 2, player: 9, ace: false, move: 'hit'},
  {dealer: 3, player: 9, ace: false, move: 'double'},
  {dealer: 4, player: 9, ace: false, move: 'double'},
  {dealer: 5, player: 9, ace: false, move: 'double'},
  {dealer: 6, player: 9, ace: false, move: 'double'},
  {dealer: 7, player: 9, ace: false, move: 'hit'},
  {dealer: 8, player: 9, ace: false, move: 'hit'},
  {dealer: 9, player: 9, ace: false, move: 'hit'},
  {dealer: 10, player: 9, ace: false, move: 'hit'},
  {dealer: 1, player: 9, ace: false, move: 'hit'},
  {dealer: 2, player: 10, ace: false, move: 'double'},
  {dealer: 3, player: 10, ace: false, move: 'double'},
  {dealer: 4, player: 10, ace: false, move: 'double'},
  {dealer: 5, player: 10, ace: false, move: 'double'},
  {dealer: 6, player: 10, ace: false, move: 'double'},
  {dealer: 7, player: 10, ace: false, move: 'double'},
  {dealer: 8, player: 10, ace: false, move: 'double'},
  {dealer: 9, player: 10, ace: false, move: 'double'},
  {dealer: 10, player: 10, ace: false, move: 'hit'},
  {dealer: 1, player: 10, ace: false, move: 'hit'},
  {dealer: 2, player: 11, ace: false, move: 'double'},
  {dealer: 3, player: 11, ace: false, move: 'double'},
  {dealer: 4, player: 11, ace: false, move: 'double'},
  {dealer: 5, player: 11, ace: false, move: 'double'},
  {dealer: 6, player: 11, ace: false, move: 'double'},
  {dealer: 7, player: 11, ace: false, move: 'double'},
  {dealer: 8, player: 11, ace: false, move: 'double'},
  {dealer: 9, player: 11, ace: false, move: 'double'},
  {dealer: 10, player: 11, ace: false, move: 'double'},
  {dealer: 1, player: 11, ace: false, move: 'hit'},
  {dealer: 2, player: 12, ace: false, move: 'hit'},
  {dealer: 3, player: 12, ace: false, move: 'hit'},
  {dealer: 4, player: 12, ace: false, move: 'stand'},
  {dealer: 5, player: 12, ace: false, move: 'stand'},
  {dealer: 6, player: 12, ace: false, move: 'stand'},
  {dealer: 7, player: 12, ace: false, move: 'hit'},
  {dealer: 8, player: 12, ace: false, move: 'hit'},
  {dealer: 9, player: 12, ace: false, move: 'hit'},
  {dealer: 10, player: 12, ace: false, move: 'hit'},
  {dealer: 1, player: 12, ace: false, move: 'hit'},
  {dealer: 2, player: 13, ace: false, move: 'stand'},
  {dealer: 3, player: 13, ace: false, move: 'stand'},
  {dealer: 4, player: 13, ace: false, move: 'stand'},
  {dealer: 5, player: 13, ace: false, move: 'stand'},
  {dealer: 6, player: 13, ace: false, move: 'stand'},
  {dealer: 7, player: 13, ace: false, move: 'hit'},
  {dealer: 8, player: 13, ace: false, move: 'hit'},
  {dealer: 9, player: 13, ace: false, move: 'hit'},
  {dealer: 10, player: 13, ace: false, move: 'hit'},
  {dealer: 1, player: 13, ace: false, move: 'hit'},
]


