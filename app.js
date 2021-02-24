/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, score, roundScore, previousDice, gamePlaying;

// START GAME
    init();

    function init(){
        // Bring all values to 0
        activePlayer = 0;
        score = [0,0];
        roundScore = [0,0];
        previousDice = 0;
        gamePlaying = true;

        document.getElementById('current-0').textContent =  '0';
        document.getElementById('current-1').textContent =  '0';
        document.getElementById('score-0').textContent =  '0';
        document.getElementById('score-1').textContent =  '0';
        document.getElementById('maxScore').value = 0;

        // Hide dice
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'none';
        var diceDOM1 = document.querySelector('.dice1');
        diceDOM1.style.display = 'none';

        // Change aesthetics back to init
        document.querySelector('#name-0').textContent = 'Player 1';
        document.querySelector('#name-1').textContent = 'Player 2';

        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');

        document.querySelector('#name-' +  activePlayer ).classList.add('active');
    }

//  ROLL BUTTON:

    document.querySelector('.btn-roll').addEventListener('click', function(){
        if(gamePlaying & document.getElementById('maxScore').value>0){
                        // 1. Roll the dice
                        var dice = Math.floor(Math.random()*6+1);
                        var dice1 = Math.floor(Math.random()*6+1);

                        var diceDOM = document.querySelector('#dice');
                        diceDOM.style.display = 'block';
                        diceDOM.src =  'dice-' + dice + '.png'

                        var diceDOM1 = document.querySelector('#dice1');
                        diceDOM1.style.display = 'block';
                        diceDOM1.src =  'dice-' + dice1 + '.png'

                        // If dice = 1 scores go down to zero, else sum
                        // If dice = 6 and also previous dice, than 0

                        if(dice === 1 || dice1 === 1 || (previousDice ===6 && dice ===6) ||x (previousDice ===6 && dice1 ===6)){
                            score[activePlayer] = 0;
                            roundScore[activePlayer]= 0;
                            document.getElementById('score-' +  activePlayer).textContent =  score[activePlayer];
                            document.getElementById('current-' +  activePlayer).textContent = roundScore[activePlayer];
                                        
                            // Move the active panel and activeplayer to the other
                            nextPlayer();
                        } else{
                            // 2. Add current score
                            score[activePlayer] += dice+dice1;
                            roundScore[activePlayer] += dice+dice1;
                            dice === 6? previousDice = dice: previousDice = dice1;
                            document.getElementById('score-' +  activePlayer).textContent = score[activePlayer];
                        }
    }})

// HOLD BUTTON:

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
                    score[activePlayer] = 0;
                    document.getElementById('score-' +  activePlayer).textContent =  score[activePlayer];
                    document.getElementById('current-' +  activePlayer).textContent = roundScore[activePlayer];
                    var maxScore =  document.getElementById('maxScore').value;
                    if(roundScore[activePlayer] >= maxScore){
                        winner();
                    }else{
                        nextPlayer();
                    }
    }
})

function nextPlayer(){
                    document.querySelector('.player-0-panel').classList.toggle('active');
                    document.querySelector('.player-1-panel').classList.toggle('active');
                    activePlayer === 0? activePlayer = 1 : activePlayer = 0;   
}

function winner(){
    document.querySelector('#name-' +  activePlayer).textContent = 'WINNER!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#name-' +  activePlayer).classList.remove('active');
    document.querySelector('.player-' +  activePlayer + '-panel').classList.add('winner');
    gamePlaying = false;

}

document.querySelector('.btn-new').addEventListener('click', init);

