![Alt text](./images/screen-shots/game-image-1.png?raw=true "image captured from game")

## Background
- I created a Blackjack game as an individual project for a coding camp at General Assembly
- Play it here https://thepika206-play-blackjack.netlify.app/
- See my original design and planning here in Whimsical https://whimsical.com/blackjack-planning-HpVFNvKGdZD6gHu6N8P7yz# Blackjack
- My favorite part of this project was designing the logic for the dual value of Aces

  
## Game Summary
- A game for one player based on the classic card game of 21
- The object is to be closer to 21 than the dealer (controlled by the CPU) without going over
- Ace logic for 1 or 11
- deck stats for card counting using Hi-Lo running count
- Two betting options
- Mobile layout (deck stats hidden)
- Game differs from typical rules:
  - Includes a bonus payout for drawing natural 21, 2 to 1 (higher than the typical 3 to 2)
  - Special 3 triple down instead of a double down
  - No splitting pairs

### Ace Logic
- Give Ace a basic value of 1, determine the basic value of the hand by adding all the cards
- Only use the basic value of the hand is used for determining if over 21 (bust).
- To get the hand total, if the hand contains SOME Ace and the basic value is 11 or less, add a one time 10 to the hand total.  
  - prevents adding bonus except when it is advantageous to do so
  - prevents adding bonus more than once (counting two aces each as 11's would bust the hand)

### Card Counting HI-LO system (in Beta)
- Hi-Lo system is a running count of the Hi (Ace and 10 cards) and Lo (2,3,4,5,6)
- In this system the deck favors the dealer if it has more Lo cards and less Hi cards
- https://www.youtube.com/watch?v=G_So72lFNIU

### Not in scope - ICEBOX
- Split hand
- Practice Mode that suggests Hit or Stand moves based on your current total and the dealer up card.
- Multiple Player mode
- Dealer Insurance

## Technologies
- JavaScript
- HTML
- CSS
- Bootstrap
- Git and GitHub
- Netlify (deployment and hosting)

## Credits
- Credit to Ben Manley for card design images and cardstarter.css.   github @ManliestBen
- Favicon created with favicon.io
- Friends and family that helped with play testing
### Sound Credits
  - card dealing click sound https://freesound.org/people/EminYILDIRIM/sounds/536108/
  - cash register opening sound https://freesound.org/people/hgernhardt/sounds/402651/
  - fanfare https://freesound.org/people/plasterbrain/sounds/397354/

## Other images
![Alt text](./images/screen-shots/game-image-2.png?raw=true "image captured from game")
![Alt text](./images/screen-shots/game-flow.png?raw=true "image captured from game")