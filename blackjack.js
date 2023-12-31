const getDeck = () => {
    const deck = []
    const suits = ['hearts', 'spades', 'clubs', 'diamonds']
  
    for (let index = 0; index < suits.length; index++) {
      // create an array of 13 objects
      for (let j = 1; j <= 13; j++) {
        // for each loop, push a card object to the deck
        // special cases for when j > 10
        const card = {
            val: j,
            displayVal: '',
            suit: suits[index],
          }
      
        let displayVal;
        // Note: Had to revise "Switch" to "true" from "J" to Get this to work. 
      // Reference: https://stackoverflow.com/questions/51846300/how-to-use-switch-statement-inside-for-loop
        
      switch (true) {
          case j === 1:
            card.displayVal = 'Ace'
            card.val = 11;
            break;
          case j > 1 && j <= 10:
            card.displayVal = j.toString();
            break;
          case j === 11:
            card.displayVal = 'Jack'
            card.val = 10;
            break;
          case j === 12:
            card.displayVal = 'Queen'
            card.val = 10;
            break;
          case j === 13:
            card.displayVal = 'King'
            card.val = 10;
            break;
        }
  

  
        //if (displayVal === 'Ace') {
        //  card.val = 11;
        //}
  
        deck.push(card)
      }
    }
    return deck;
  }


function shuffleDeck(deckArray) {
    // Create a Deck to Shuffle parts to
    let shuffledDeck = []
    // Fill the Shuffled Deck
    for (let i=0; i < 52; i++){
        shuffledDeck.push(0);
    }
    
    let counter = 0;
    while (counter < 52){
        // Generate a Random index 
        let index = Math.floor(Math.random()*shuffledDeck.length);
        if (shuffledDeck[index] === 0){
            let temp = deckArray.pop()
            shuffledDeck[index] = temp;
            counter += 1
        }
        }
        return shuffledDeck
}
// Create the Blackjack Deck
const blackjackDeck = shuffleDeck(getDeck());

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    constructor(name) {
        this.name = name;
        this.hand = []
    }
    // This is where I will Create the Function
    drawCard(){
        // Pop a Card From the Deck and append it to "thishand"
        this.hand.push(blackjackDeck.pop());
    }

}; 

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Dealer');
const player = new CardPlayer('Player');

// --Testing Values
dealer.drawCard();
dealer.drawCard();

// /**
//  * Calculates the score of a Blackjack hand
//  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
//  * @returns {Object} blackJackScore
//  * @returns {number} blackJackScore.total
//  * @returns {boolean} blackJackScore.isSoft
//  */
const calcPoints = (hand) => {
    console.log("Calculating Points...");
    // Create a card Object
    const blackJackScore = {total: 0, isSoft: false};
	// Determine How Many Aces are in the hand
	let aceCount = 0;
	for (let i = 0; i < hand.length; i ++){
		if (hand[i].displayVal === 'Ace'){
			aceCount += 1
		}
	}
	// If there are No Aces, I Don't Have to do Anything Special with the Score.
	if (aceCount === 0){
		for (let j = 0; j < hand.length; j++){
			blackJackScore.total += hand[j].val;
		}
		blackJackScore.isSoft = false;
	}
	
	else {
		// Add the Score of Cars that are NOT Aces firstChild
		for (let k = 0; k < hand.length; k++){
			if (hand[k].displayVal != 'Ace'){
				blackJackScore.total += hand[k].val;
			}
		console.log(blackJackScore.total, "total before aces")
		console.log("num aces", aceCount);
		}
		
		// If the Score >= 11, All Aces Must Be Counted As one
		if (blackJackScore.total >= 11){
			blackJackScore.total += aceCount;
			blackJackScore.isSoft = false;
		}
		// If the Score <= 10 AND there is only One Ace, Count the Ace As 11
		else if (blackJackScore.total <= 10 && aceCount == 1){
			blackJackScore.total += 11;
			blackJackScore.isSoft = true;
		}
		
		// If the Score <= 10 And there are more than One Ace, Calculate if you treat as 11
		else if (blackJackScore.total + (11*(aceCount-1)) <= 21){
			blackJackScore.total += 11;
			blackJackScore.total += (aceCount -1);
			blackJackScore.isSoft = true;
		}
		else{
			blackJackScore.total += aceCount;
			blackJackScore.isSoft = false;
		}
		
	}
    return blackJackScore;
}


// /**
//  * Determines whether the dealer should draw another card.
//  * 
//  * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
//  * @returns {boolean} whether dealer should draw another card
//  */
const dealerShouldDraw = (dealerHand) => {
    // Utilize the calcPoints to Determine the Dealer's Score
    let scoreObject = calcPoints(dealerHand);
    // If the dealer's hand is 16 points or less, the dealer must draw another card
    if (scoreObject.total <= 16){
        return true;
    }
    // If the dealer's hand is exactly 17 points, and the dealer has an Ace valued at 11, the dealer must draw another card
    else if (scoreObject.total === 17 && dealerHand.isSoft === true){
        return true;
    }
    // If the dealer's hand is 17 points or more, the dealer will end her turn
    else{
        return false;
    }

}

//console.log("Dealer should draw", dealerShouldDraw(dealer.hand))
// /**
//  * Determines the winner if both player and dealer stand
//  * @param {number} playerScore 
//  * @param {number} dealerScore 
//  * @returns {string} Shows the player's score, the dealer's score, and who wins
//  */
const determineWinner = (playerScore, dealerScore) => {
    // Define the Winner Variable
    let winner;
    // If the Player Score < 21 and Dealer Score > 21 -> Player Win
    if (playerScore <= 21 && dealerScore > 21) {
        //console.log('case 1');
        winner = 'Player';
    }

    // If the Dealer Score > 21 and Player Score > 21 -> Player Wins
    else if (dealerScore <= 21 && playerScore > 21){
        //console.log('case 2');
        winner = "Dealer";
    }

    // If Player == Dealer -> House Wins
    else if (playerScore === dealerScore){
        //console.log('case 3');
        winner = 'Dealer';
    }
    
    // If Player and Dealer < 21 and Dealer > Player -> Dealer Wins
    else if (playerScore < dealerScore){
        //console.log('case 4');
        winner = 'Dealer';
    }

    // If Player and Dealer < 21 and Player > Dealer -> Player Wins
    else{
        //console.log('case 5');
        winner = 'Player';
    }

    return `Player Score: ${playerScore} | Dealer Score: ${dealerScore} | Winner: ${winner}`;

}


// /**
//  * Creates user prompt to ask if they'd like to draw a card
//  * @param {number} count 
//  * @param {string} dealerCard 
//  */
const getMessage = (count, dealerCard) => {
   return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
 }

// /**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
const showHand = (player) => {
   const displayHand = player.hand.map((card) => card.displayVal);
   console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
 }

// /**
//  * Runs Blackjack Game
//  */

 const startGame = function() {
   player.drawCard();
   dealer.drawCard();
   player.drawCard();
   dealer.drawCard();

   let playerScore = calcPoints(player.hand).total;
   showHand(player);
   while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
     player.drawCard();
     playerScore = calcPoints(player.hand).total;
     showHand(player);
   }
   if (playerScore > 21) {
     return 'You went over 21 - you lose!';
   }
   console.log(`Player stands at ${playerScore}`);

   let dealerScore = calcPoints(dealer.hand).total;
   while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
     dealer.drawCard();
     dealerScore = calcPoints(dealer.hand).total;
     showHand(dealer);
   }
   if (dealerScore > 21) {
     return 'Dealer went over 21 - you win!';
   }
   console.log(`Dealer stands at ${dealerScore}`);

   return determineWinner(playerScore, dealerScore);
 }
console.log(startGame());
