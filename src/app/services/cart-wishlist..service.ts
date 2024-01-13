import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICourse } from '../models';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: ICourse[] = [];
  private wishlistItems: ICourse[] = [];

  // Observable for cart items
  private cartItemsSubject = new BehaviorSubject<ICourse[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Observable for wishlist items
  private wishlistItemsSubject = new BehaviorSubject<ICourse[]>([]);
  wishlistItems$ = this.wishlistItemsSubject.asObservable();

  constructor(private _messageService: MessageService) {
    this.loadCartFromLocalStorage();
    this.loadWishlistFromLocalStorage();
  }

  // Add item to cart
  addToCart(course: ICourse): void {
    const isCourseInCart = this.cartItems.some((c) => c.id === course.id);

    if (!isCourseInCart) {
      this.cartItems.push(course);
      this.cartItemsSubject.next([...this.cartItems]);
      this.saveCartToLocalStorage();
      this._messageService.add({
        severity: 'success',
        summary: 'succeed',
        detail: 'Course Added To Cart Successfully ',
      });
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Failed To Add To Cart',
        detail: 'Course already exists',
      });
    }
  }

  // Add item to wishlist with validation
  addToWishlist(course: ICourse): void {
    const isCourseInWishlist = this.wishlistItems.some(
      (c) => c.id === course.id
    );

    if (!isCourseInWishlist) {
      this.wishlistItems.push(course);
      this.wishlistItemsSubject.next([...this.wishlistItems]);
      this.saveWishlistToLocalStorage();
      this._messageService.add({
        severity: 'success',
        summary: 'succeed',
        detail: 'Course Added To Wishlist Successfully ',
      });
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Failed To Add To Wishlist',
        detail: 'Course already exists',
      });
    }
  }

  // Get all items in the cart
  getCartItems(): ICourse[] {
    return this.cartItems;
  }

  // Remove item from cart
  removeFromCart(course: ICourse): void {
    const index = this.cartItems.findIndex((c) => c.id === course.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next([...this.cartItems]);
      this.saveCartToLocalStorage();
      this._messageService.add({
        severity: 'success',
        summary: 'succeed',
        detail: 'Course removed from Cart Successfully ',
      });
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Failed To re,ove from Wishlist',
        detail: "Course doesn't exists",
      });
    }
  }

  // Remove item from wishlist
  removeFromWishlist(course: ICourse): void {
    const index = this.wishlistItems.findIndex((c) => c.id === course.id);
    if (index !== -1) {
      this.wishlistItems.splice(index, 1);
      this.wishlistItemsSubject.next([...this.wishlistItems]);
      this.saveWishlistToLocalStorage();
      this._messageService.add({
        severity: 'success',
        summary: 'Succeed',
        detail: 'Course removed from Wishlist Successfully ',
      });
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Failed To Remove from Wishlist',
        detail: "Course doesn't exist in the Wishlist",
      });
    }
  }

  // Move item to wishlist
  moveToWishlist(course: ICourse): void {
    this.removeFromCart(course);
    this.addToWishlist(course);
  }

  // Get all items in the wishlist
  getWishlistItems(): ICourse[] {
    return this.wishlistItems;
  }

  // Private method to save cart to local storage
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Private method to save wishlist to local storage
  private saveWishlistToLocalStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
  }

  // Load cart from local storage
  loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  // Load wishlist from local storage
  loadWishlistFromLocalStorage(): void {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlistItems = JSON.parse(storedWishlist);
      this.wishlistItemsSubject.next([...this.wishlistItems]);
    }
  }
}
