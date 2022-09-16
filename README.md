![the game main view](./images/screen-shots/game-image-1.png?raw=true "a image captured from the game")

# Game Summary
Here's a link to play my <a href="https://thepika206-play-blackjack.netlify.app/" target="_blank">Blackjack</a> game
- The game is based on the classic card game. See [classic rules referenced from Bicycle.com](https://bicyclecards.com/how-to-play/blackjack/)
- [Includes mobile layout](#mobile-game)
- Single deck of cards
- Two betting options
- Bonus natural Blackjack payout (2 to 1 which is higher than typical)
- 3 triple down option instead of a double down
- Sound effects
- Running card count (Hi Lo system)

# Background
- This was an individual project at General Assembly
- I used CSS grid to manage a desktop and mobile view and learned a lot about state management.

  
# Technologies Used
- JavaScript
- HTML (including the Meter element and Audio)
- CSS (including grid and flex)
- external Card styling CSS template, see Credits section
- external Bootstrap CSS framework
- GitHub
- Netlify (deployment and hosting)


# Key Logic
## Representing the game value of cards and rendering them on screen
Below is a sample of how the deck is modeled, a player's hand or the dealer's hand is very similar.  Notice that Aces have a value of 1.  -see [Getting value of the hand](#getting-the-value-of-the-hand).
> let deck = [{id:'dA', value:1},
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
  {id:'d02', value:2},...]
## Getting the value of the hand
The core function to return the appropriate value of a hand works like this:
- The value property gives aces a basic value of 1, numbers are numbers, facecards are 10.
- While reading the hand array to total the basic value, set flag for *hasAce* if the hand contains any Aces.
- If the basic value is 11 or less && hasAce, add 10 bonus to total:
  - Ace-2 --> (3 + 10 bonus)
  - Ace-2-Ace --> (4 + 10 bonus)
  - Ace-2-Ace-King --> (14 + 0 bonus)
  - Ace-2-Ace-King-Jack --> (24 + 0 bonus) BUSTED!

# Extras and Future Features
## Card Counting HI-LO system
- *Beta feature*, needs more testing
- Hi-Lo system is a running count of the Hi (Ace and 10 cards) and Lo (2,3,4,5,6)
- In this system the deck favors the dealer if it has more Lo cards and less Hi cards
## Not in scope - ICEBOX
- Split hand
- Practice Mode that suggests Hit or Stand moves based on your current total and the dealer up card.
- Multiple Player mode
- Dealer Insurance

# Credits
- Card design images and cardstarter.css -Ben Manley   github @ManliestBen
- Favicon -favicon.io
- Hi Lo Counting [Blackjack Expert Explains How Card Counting Works | WIRED](https://www.youtube.com/watch?v=G_So72lFNIU)
### Sound Credits
  - [card dealing click sound from freesound.org](https://freesound.org/people/EminYILDIRIM/sounds/536108/)
  - [cash register opening sound from freesound.org](https://freesound.org/people/hgernhardt/sounds/402651/)
  - [fanfare sound from freesound.org](https://freesound.org/people/plasterbrain/sounds/397354/)

# Mobile Game
![the game main view on a mobile](./images/screen-shots/game-image-2.png?raw=true "image captured from game")
# Planning
![screenshot of a logic flowchart](./images/screen-shots/game-flow.png?raw=true "flow chart from planning")
- See my [original design and planning here in Whimsical](https://whimsical.com/blackjack-planning-HpVFNvKGdZD6gHu6N8P7yz#)