import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {
  expanded: number;
  cards = [];
  isLoading = true;
  active_query = {
      'attack': undefined,
      'health': undefined,
      'cost': undefined,
      'type': [],
      'playerClass': [],
      'rarity': []
  }

  constructor(private cardsService: CardsService,
              private formBuilder: FormBuilder,
              public modal: ModalComponent) { }

  ngOnInit() {
    // const query = {'attack': 4, 'type': ['Weapon'], 'playerClass': ['Shaman', 'Warrior']}
    this.getCards();
  }

  getCards() {
    console.log(this.active_query);
    this.cardsService.getCards(this.active_query).subscribe(
      data => this.cards = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  setAttack(atk: number){
    console.log(atk);
    this.active_query.attack = atk;
    this.getCards();
  }

  setHealth(hp: number) {
    this.active_query.health = hp;
    this.getCards();
  }

  setMana(mana: number) {
    this.active_query.cost = mana;
    this.getCards();
  }

  toggleArray(arr: any, item: any) {
    let tmp = arr;
    if (tmp.includes(item)) {
      tmp = tmp.filter(card => card != item);
    }
    else {
      tmp.push(item);
    }
    return tmp;
  }

  toggleClass(heroClass: string) {
    let arr = this.toggleArray(this.active_query.playerClass, heroClass);
    this.active_query.playerClass = arr;
    this.getCards();
  }

  toggleType(cardType: string) {
    let arr = this.toggleArray(this.active_query.type, cardType);
    this.active_query.type = arr;
    this.getCards();
  }

  toggleRarity(rarity: string) {
    let arr = this.toggleArray(this.active_query.rarity, rarity);
    this.active_query.rarity = arr;
    this.getCards();
  }


  resetQuery() {
    this.active_query = {
      'attack': undefined,
      'health': undefined,
      'cost': undefined,
      'type': [],
      'playerClass': [],
      'rarity': []
    }
    this.getCards();
  }


  expand(index: number, card: Card) {
    // If already expanded: Collapse
    if (this.expanded === index) {
        this.expanded = -1;
    // Else: expand
    } else {
        this.expanded = index;
        this.modal.setMessage(card, card.rarity);
    }
  }
}

interface Card {
  attack: number,
  cardSet: string,
  cost: number,
  faction: string,
  health: number,
  img: string,
  imgGold: string,
  name: string,
  playerClass: string,
  race: string,
  rarity: string,
  type: string,
  flavor: string,
  mechanics: object,
  artist: string,
  collectible: boolean,
}