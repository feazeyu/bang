let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
var socket = io();
//const card_definitions = JSON.parse(card_definitions);
class Card{
    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.x = 100;
        this.y = 100;
    }

    render(){
        c.beginPath();
        c.arc(this.x, this.y, 25, 0, Math.PI*2, false);
        c.fill();
        c.closePath();
    }
}

class Hand {
    constructor(cards) {
        this.cards = cards;
    }

    renderHand(){
        for(let x = 0; x < this.cards.length; x++){
            this.cards[x].render();
        }
    }
}
class Player {
    constructor(){
        this.hp = 4;
        this.role = "Bandit";
        this.hand = new Hand([]);
        this.state = "waiting";
    }


}
class Pile {
    constructor(){
        this.contents = newPile();
    }


}
var Deck = [];
function newPile(){
    for(let x = 0; x < 25; x++){
        Deck.push(new Card())
    }
}
/*
25 BANG!
12 Mancato! (Missed!)
3 Duello (Duel)
1 Wells Fargo
2 Diligenza (Stagecoach)
1 Dinamite (Dynamite)
1 Appaloosa
2 Cavallo (Horse)
1 Saloon
2 Volcanic [Weapon]
3 Schofield [Weapon]
1 Remington [Weapon]
1 Rev. Carabine [Weapon]
1 Winchester [Weapon]
3 Prigione (Jail)
1 Gatling
2 Barile (Barrel)
2 Indiani! (Injuns!)
4 Maestrina (Mistress)
4 Panico! (Panic!)
6 Birra (Beer)
2 Emporio (General Store)
 */
var testCard = new Card("Hand", "Bang!");