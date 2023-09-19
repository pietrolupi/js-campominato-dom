
let bombs = [];

let counterScore = 0;

let extractedNumbers = [];

let bombsToExplode = []

const container = document.querySelector('.container-custom')

const diffSelector = document.querySelector('.diff-selector')
let difficulty;
const startBtn = document.querySelector('.start-btn');


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
  }else{
    square.innerHTML = '<i class="fa-solid fa-flag"></i>'
  }

  square.addEventListener('click', respondClick); //gli aggiungo il click con tutti gli eventi(compreso il rimuovere il click)


  //inserisco il quadrato in pagina
  container.append(square);
}



function startMessage(){
  document.querySelector('.mask2').innerHTML += `<h1 id="start-playing">SELEZIONA UNA DIFFICOLTA E COMINCIA A GIOCARE!</h1>`
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
  
  if(bombs.includes(this._squareID)){

    const squaresToExplode = document.getElementsByClassName('bomb');
    //creo un array con tutte le bombe
    
    for(let i = 0; i < 16; i++){//ciclo l'array e ad ogni bomba aggiungo la classe "explode" (su CSS .bomb.explode si attiva)
    
      const squareX = squaresToExplode[i]; 
  
      squareX.classList.add('explode')
      squareX.innerHTML = '<i class="fa-solid fa-bomb"></i>'
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


