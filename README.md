Campo Minato
===

## Consegna
Aggiungiamo la logica del gioco:
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle. La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba, fare visulaizzare tutte le bombe in gliglia e congelare la griglia.
#### Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


## Mio Svoglimento

* creo un arrayBombe vuoto 

* creo un counter punteggio = 0;

* inserisco nell'array 16 numeri UNIVOCI generati randomicamente nel range di numeri della difficoltà (1-100), (1-81), (1-49);

* IF numero del quadrato corrisponde a un numero presente nell'array bombe : il quadrato è una bomba.

* aggiungo ai quadrati bomba identificati sopra la classe: BOMB.

* metto una condizione IF : al click, se il counter punteggio è uguale ai quadrati totali meno il num di bombe: faccio partire FUNCTION ENDGAME.

* al click di un quadrato IF il quadrato è bomb succede una cosa, altrimenti comportamento clicked standard (e counter punteggio ++)

* al click di un quadrato bomb invece la cella diventa rossa e faccio partire una FUNCTION ENDGAME.


* FUNCION ENDGAME: offusco tutto il quadrante rendendo visibile un layer nero trasparente che di base avrebbe d-none. Poi attivo tutte le bombe. Tolgo il cursor pointer. Rimuovo la possibilità di cliccare sulle celle (removeEventListener);

*faccio comparire il MESSAGGIO FINALE: hai fatto (counter punteggio) punti, su (totale quadrati meno numero bombe)
 

