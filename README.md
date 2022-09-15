![the game main view](./images/screen-shots/game-image-1.png?raw=true "a image captured from the game")

# Background
- I created a Blackjack game as an individual project for a coding camp at General Assembly
- [Play Blackjack](https://thepika206-play-blackjack.netlify.app/)
- A surprise challenge was to slow down the draw for dealer so that each card would render and pause.
<br>
<br>
  
# Game Summary
- A game for one player with modififications of the [classic rules referenced from Bicycle.com](https://bicyclecards.com/how-to-play/blackjack/)
- Two betting options and free play if you run out of money
- Fun 2 to 1 payout for natural 21 (typical is 3 to 2).
- Fun 3 triple down button instead of a double down
- No splitting pairs (out of scope)
- Mobile friendly design
<br>
<br>

# Technologies Used
- JavaScript
- HTML (including the Meter element and Audio)
- CSS (including grid and flex)
- external Card styling CSS template, see Credits section
- external Bootstrap CSS framework
- GitHub
- Netlify (deployment and hosting)
<br>
<br>

# Key Logic
## Getting the value of the hand
- First get a basic hand total: Aces are 1, number cards per number, facecards are 10 
- *If the hand contains SOME Aces and the basic value is 11 or less, add 10 bonus to the basic hand total:*  
  - Ace-2 --> (3 + 10 bonus)
  - Ace-2-Ace --> (4 + 10 bonus)
  - Ace-2-Ace-King --> (14 + 0 bonus)
  - Ace-2-Ace-King-Jack --> (24 + 0 bonus) BUSTED!
<br>
<br>

# Extras and Future Features
## Card Counting HI-LO system
- *Beta feature*, definitely not calibrated yet for a 1 deck game.
- Hi-Lo system is a running count of the Hi (Ace and 10 cards) and Lo (2,3,4,5,6)
- In this system the deck favors the dealer if it has more Lo cards and less Hi cards
## Not in scope - ICEBOX
- Split hand
- Practice Mode that suggests Hit or Stand moves based on your current total and the dealer up card.
- Multiple Player mode
- Dealer Insurance
<br>
<br>

# Credits
- Card design images and cardstarter.css -Ben Manley   github @ManliestBen
- Favicon -favicon.io
- Hi Lo Counting [Blackjack Expert Explains How Card Counting Works | WIRED](https://www.youtube.com/watch?v=G_So72lFNIU)
### Sound Credits
  - [card dealing click sound from freesound.org](https://freesound.org/people/EminYILDIRIM/sounds/536108/)
  - [cash register opening sound from freesound.org](https://freesound.org/people/hgernhardt/sounds/402651/)
  - [fanfare sound from freesound.org](https://freesound.org/people/plasterbrain/sounds/397354/)
<br>
<br>

# Other Game Images
![the game main view on a mobile](./images/screen-shots/game-image-2.png?raw=true "image captured from game")
![screenshot of a logic flowchart](./images/screen-shots/game-flow.png?raw=true "flow chart from planning")
- See my [original design and planning here in Whimsical](https://whimsical.com/blackjack-planning-HpVFNvKGdZD6gHu6N8P7yz#)