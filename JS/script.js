/* 
*1. creo un arrayBombe vuoto 

*2 creo un counter punteggio = 0;

*3 al click inserisco nell'array 16 numeri UNIVOCI generati randomicamente nel range di numeri della difficoltà (1-100), (1-81), (1-49);

*4 VADO A MODIFICARE la funzione stampSquare creata in precendeza: IF numero del quadrato corrisponde a un numero presente nell'array bombe : il quadrato è una bomba.

* aggiungo ai quadrati bomba identificati sopra la classe: BOMB.

* metto una condizione IF : al click, se il counter punteggio è uguale ai quadrati totali meno il num di bombe: faccio partire FUNCTION ENDGAME.

* al click di un quadrato IF il quadrato è bomb succede una cosa, altrimenti comportamento clicked standard (e counter punteggio ++)

* al click di un quadrato bomb invece la cella diventa rossa e faccio partire una FUNCTION ENDGAME.


* FUNCION ENDGAME: offusco tutto il quadrante rendendo visibile un layer nero trasparente che di base avrebbe d-none. Poi attivo tutte le bombe. Tolgo il cursor pointer. Rimuovo la possibilità di cliccare sulle celle (removeEventListener);

*faccio comparire il MESSAGGIO FINALE: hai fatto (counter punteggio) punti, su (totale quadrati meno numero bombe) */


//1.
let bombs = [];
//2.
let counterScore = 0;

let extractedNumbers = [];

let bombsToExplode = []

const container = document.querySelector('.container-custom')

const diffSelector = document.querySelector('.diff-selector')
let difficulty;
const startBtn = document.querySelector('.start-btn');

reset(container);
startMessage();

startBtn.addEventListener('click',function(){
  
  //al click seleziono la difficoltà e la leggo
  difficulty = diffSelector.value;

  //creo vari percorsi per ogni difficoltà (ogni IF prima di tutto resetta, poi fa partire un ciclo che ripete stampSquare tot volte)

  if(difficulty === 'Select difficulty mode:'){
    reset()
    alert('SELEZIONA UNA DIFFICOLTA PER PROCEDERE!')
    startMessage();

  }else if(difficulty == 100){
    
    reset(); //adesso reset totale, svuota container, arrays e counter punteggio

    //carico lista con 16 bombe
    for(let i = 0; i < 16; i++){ 
      let bomb = getUniqueRandomNumber(1, 100);
      bombs.push(bomb);
    }
  
    for(let i = 1; i <= 100; i++){
      stampSquare(i);
    }


  }else if(difficulty == 81){

    reset();
    
    for(let i = 0; i < 16; i++){
      
      let bomb = getUniqueRandomNumber(1, 81);
      bombs.push(bomb);
    }
    
    for(let i = 1; i <= 81; i++){
   
      stampSquare(i);
    }
  }else{

    reset();
    
    for(let i = 0; i < 16; i++){
      let bomb = getUniqueRandomNumber(1, 49);
      bombs.push(bomb);
    }

    for(let i = 1; i <= 49; i++){
      stampSquare(i);
    }   
  }
  
})

//FUNZIONI //////////////////////////////////////////////////

//funzioncina per resettare il container e gli array allo stato di partenza
function reset(){
  container.innerHTML = '';
  bombs = [];
  extractedNumbers = [];
  counterScore = 0;
}

//funzione per stampare i quadrati
/**
 * @param {number} squareNumber  //Numero che appare come testo all'interno del quadrato(nel ciclo FOR sarà la let utilizzata es: 'i')
 */
function stampSquare(squareNumber){
  let square = document.createElement('div');
  square.classList.add('square')
  
  square._squareID = squareNumber; //lo richiamerò con this._squareID all'interno della function respondClick!!!!!!
  
  if(difficulty == 100){
    square.classList.add('easy')
  }else if(difficulty == 81){
    square.classList.add('medium')
  }else{
    square.classList.add('hard')
  }

  //qui controllo se il quadrato è una bomba e nel caso lo sia gli aggiungo la classe "bomb"
  if( bombs.includes(squareNumber)){
    square.classList.add('bomb')
  }

  square.addEventListener('click', respondClick); //gli aggiungo il click con tutti gli eventi(compreso il rimuovere il click)


  //inserisco il quadrato in pagina
  container.append(square);
}



function startMessage(){
  container.innerHTML += `<h1 id="start-playing">SELEZIONA UNA DIFFICOLTA E COMINCIA A GIOCARE!</h1>`
}

/**
 * funzione per ottenere numero random
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * funzione per ottenere un numero random UNIVOCO
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
function getUniqueRandomNumber(min, max ){
  
  let randomNumber;
  let isValidNumber = false;

  while(!isValidNumber){
    randomNumber = getRandomNumber(min, max);
    //se la lista dei numeri estratti NON include il numero random
    //lo aggiungo alla lista e creo la condizione di fine ciclo
    if(!extractedNumbers.includes(randomNumber)){ 
      extractedNumbers.push(randomNumber);
      //per interrompere il ciclo
      isValidNumber = true;
    }
  }
  return randomNumber;
}



function endgame(){

  const mask = document.createElement('div');
  const possibleScore = difficulty - 16;
  mask.classList.add('mask');
  container.prepend(mask);
  if(counterScore === difficulty - 17){
    mask.innerHTML += `<h1>BRAVISSIMO! HAI VINTOOOO! Il tuo score è di: ${counterScore + 1} Su un massimo di:${possibleScore} </h1>`
  }else{
    mask.innerHTML += `<h1>HAI PERSO! Il tuo score è di: ${counterScore} Su un massimo di:${possibleScore} </h1>`
  }
  
}

function respondClick(){
  /* const number = parseInt(this.textContent) */
  
  if(bombs.includes(this._squareID)){

    const squaresToExplode = document.getElementsByClassName('square');
    
    for(let i = 0; i < difficulty; i++){
      const square = squaresToExplode[i]; 
      
      square.classList.add('explode')
    }
    
    endgame();
   
  }else if(counterScore === difficulty - 17){
    
    this.classList.toggle('activeSquare') 

    endgame();

  }else{
    counterScore++;

    this.classList.add('activeSquare') 
   
    this.removeEventListener('click', respondClick)
  }
  
}

function explode(){
  for(let i = 0; i < difficulty; i++){
    document.getElementById('49').classList.add('provabomb')
    if(bombs.includes(this._squareID)){
      console.log(this._squareID)
    }
    
  }
}
