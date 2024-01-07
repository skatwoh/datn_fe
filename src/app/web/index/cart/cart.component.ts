import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services";
import {UserModel} from "../../../auth/models/user.model";

@Component({
  selector: 'cons-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  user: UserModel | undefined;

  constructor(private authService: AuthService ) {
  }

  private cartStorageKey = 'cartItems';
  cartItems: any[] = [];

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.loadCartItems(this.user?.id);
    this.subtotal();
  }

  private loadCartItems(userId: any): void {
    const userCartStorageKey = `${this.cartStorageKey}_${userId}`;

    const storedCartItems = localStorage.getItem(userCartStorageKey);

    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }


  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem(`${this.cartStorageKey}_${this.user?.id}`, JSON.stringify(this.cartItems));
  }

  subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.amount, 0);
  }

}
