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
    reset(container)
    alert('SELEZIONA UNA DIFFICOLTA PER PROCEDERE!')
    startMessage();
  }else if(difficulty == 1){
    reset(container);
    for(let i = 1; i <= 100; i++){
      stampSquare('easy', i);
    }

  }else if(difficulty == 2){
    reset(container);
    for(let i = 1; i <= 81; i++){
   
      stampSquare('medium', i);
    }
  }else{
    reset(container);
    for(let i = 1; i <= 49; i++){
      stampSquare('hard', i);
    }   
  }
})

//FUNZIONI //////////////////////////////////////////////////

//funzioncina per resettare l'innerhtml di un elemento
function reset(whatToReset){
  whatToReset.innerHTML = '';
}


//funzione per stampare i quadrati
/**
 * 
 * @param {string} difficultyLevel // 'easy','medium' o 'hard' come stringhe; Determina la GRANDEZZA del quadrato stampato
 * @param {number} squareVisualizedNumber  //Numero che appare come testo all'interno del quadrato(nel ciclo FOR sarà la let utilizzata es: 'i')
 */
function stampSquare(difficultyLevel, squareVisualizedNumber){
  let square = document.createElement('div');
  square.classList.add('square')
  
  if(difficultyLevel === 'easy'){
    square.classList.add('easy')
  }else if(difficultyLevel === 'medium'){
    square.classList.add('medium')
  }else{
    square.classList.add('hard')
  }

  square.addEventListener('click', function(){
    this.classList.toggle('activeSquare') 
  }) //NOTA BENE: qui ci dovrai mettere poi dentro una funzione che faccia altre cose tipo calcolare se è una bombaaa, se è una bomba accendere tutte le altre bombe ecc ecc (il numero della cella sarà assegnato comunque alla creazione del quadrato)

  square.innerHTML += `<span> ${squareVisualizedNumber}</span>
  `
  container.append(square);
}

function startMessage(){
  container.innerHTML += `<h1 id="start-playing">SELEZIONA UNA DIFFICOLTA E COMINCIA A GIOCARE!</h1>`
}