import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cons-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor() {
  }

  private cartStorageKey = 'cartItems';
  cartItems: any[] = [];

  ngOnInit(): void {
    this.loadCartItems();
    this.subtotal();
  }

  private loadCartItems(): void {
    const storedCartItems = localStorage.getItem(this.cartStorageKey);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  removeFromCart(index: number): void {
    // Remove the item at the specified index
    this.cartItems.splice(index, 1);

    // Save the updated cartItems array to localStorage
    localStorage.setItem(this.cartStorageKey, JSON.stringify(this.cartItems));
  }

  subtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.amount, 0);
  }

}
