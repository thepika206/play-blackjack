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