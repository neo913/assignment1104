import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './api.service';

export interface Card {
  imgPath   : string,    
  id        : string,
  userId    : string,    
  role      : string,  
  firstName : string,      
  lastName  : string,      
  desc      : string  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'starlight';

  users = [];
  cards: Card[];
  searchString: string = "";
  
  constructor(public dialog: MatDialog, private api: ApiService) {
    this.cards = new Array<Card>();
    this.searchString = '';
  }

  ngOnInit() {
    this.cardsInit()
    // this.getAllCards();
  } 

  cardsInit() {
    this.cards = new Array<Card>();
  }

  getAllCards() {
    this.cardsInit();
    this.api.getAPI().subscribe(
      (data) => {
      this.users = JSON.parse(JSON.stringify(data.body));
      this.cardsInit();
      this.users.map(user => {
        this.cards.push(user);
      });
      this.cards.map(card => {
        card.imgPath = "../assets/"+ card.firstName + card.lastName + '.jpg'
      });
    },
    (error) => { console.log("Error: ", error) })  
  }

  getCards() {
    this.cardsInit();
    if(this.searchString === '') {
      this.getAllCards();
    } else {
      this.getAllCards();
      this.cards = this.cards.filter(card => 
        card.id.search(this.searchString) > -1 || 
        card.firstName.toLowerCase().search(this.searchString.toLowerCase()) > -1 || 
        card.lastName.toLowerCase().search(this.searchString.toLowerCase()) > -1
      )
      console.log(this.cards);
    }
  }

  getCardDetail(obj: any) {
    const dialogRef = this.dialog.open(UserDialog, {
      data: obj
    });
  }

}

@Component({
  selector: 'userDetailDialog',
  template: `
  <h1 mat-dialog-title>Information of {{data.firstName}} {{data.lastName}}</h1>
  <div mat-dialog-content>
    <div class="_photo">
      <img src="{{data.imgPath}}" />
    </div>
    <h3>Name: {{data.firstName}} {{data.lastName}}</h3>
    <h3>Role: {{data.role}}</h3>
    <p>{{data.desc}}</p>
  </div>
  
  `,
  styleUrls: ['./app.component.scss']
})
export class UserDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

// Assignment UI Developer:
// Create an angular application
// Features:
// 1. Dashboard loading multiple cards
// a. UserInfo card
// b. All the existing users list (clickable)
// 2. On click of the existing user in the (1.b. All the users) load the selected user info data in the 1.a.
// UserInfo card
// 3. Multiple Login
// a. Admin (All cards visible)
// b. DemoUser (Only UserInfo card visible)
// 4. Create a fake server and make httpget and httppost calls to load data in the cards.

// Note:
// 1. Create a new repo in any of the public git repos and please share the url.