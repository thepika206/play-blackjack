![Alt text](./images/screen-shots/game-image-1.png?raw=true "image captured from game")

# Background
- I created a Blackjack game as an individual project for a coding camp at General Assembly
- Play it here https://thepika206-play-blackjack.netlify.app/
- A surprise challenge was to slow down the draw for dealer so that each card would render and pause.

  
# Game Summary
- A game for one player based on the classic card game of 21
- The object is to be closer to 21 than the computer dealer without going over 21.
- Two betting options and free play if you run out of money
- Mobile friendly design
### My game differs from common Blackjack rules:
- Bonus payout for natural 21, increased 2 to 1 (typical 3 to 2) to improve the player advantage.
- Special 3 triple down instead of a double down to improve the player advance.  A secret code can increase this further...
- No splitting pairs

# Technologies Used
- JavaScript
- HTML (including the Meter element and Audio)
- CSS
- Bootstrap (buttons)
- Git and GitHub
- Netlify (deployment and hosting)

# Key Logic
## Getting the value of the hand
- First get a basic hand total: Aces are 1, number cards per number, facecards are 10 
- *If the hand contains SOME Aces and the basic value is 11 or less, add 10 bonus to the basic hand total:*  
  - Ace-2 --> (3 + 10 bonus)
  - Ace-2-Ace --> (4 + 10 bonus)
  - Ace-2-Ace-King --> (14 + 0 bonus)
  - Ace-2-Ace-King-Jack --> (24 + 0 bonus) BUSTED!
  
# Extras and Future Features
## Card Counting HI-LO system
- *Beta feature*, definitely not calibrated yet for a 1 deck game.
- Hi-Lo system is a running count of the Hi (Ace and 10 cards) and Lo (2,3,4,5,6)
- In this system the deck favors the dealer if it has more Lo cards and less Hi cards
- https://www.youtube.com/watch?v=G_So72lFNIU
## Not in scope - ICEBOX
- Split hand
- Practice Mode that suggests Hit or Stand moves based on your current total and the dealer up card.
- Multiple Player mode
- Dealer Insurance

# Credits
- Basic rules of Blackjack -Bicycle https://bicyclecards.com/how-to-play/blackjack/
- Card design images and cardstarter.css -Ben Manley   github @ManliestBen
- Favicon -favicon.io
### Sound Credits
  - card dealing click sound https://freesound.org/people/EminYILDIRIM/sounds/536108/
  - cash register opening sound https://freesound.org/people/hgernhardt/sounds/402651/
  - fanfare https://freesound.org/people/plasterbrain/sounds/397354/

# Other Game Images
![Alt text](./images/screen-shots/game-image-2.png?raw=true "image captured from game")
![Alt text](./images/screen-shots/game-flow.png?raw=true "image captured from game")
- See my original design and planning here in Whimsical https://whimsical.com/blackjack-planning-HpVFNvKGdZD6gHu6N8P7yz# 