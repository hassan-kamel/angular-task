import { Component, Input } from '@angular/core';
import { ICourse } from '../models';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../services/cart-wishlist..service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [ChipModule, ButtonModule],
  template: `
    <div
      class="relative  p-4 overflow-hidden bg-white shadow-lg rounded-2xl my-5 "
    >
      <div class="mt-4 flex flex-wrap gap-1">
        @for(tag of course.tags; track tag){
        <p-chip [label]="tag"></p-chip>
        }
      </div>
      <div class="w-full">
        <p class="mb-2 text-lg font-medium text-gray-800">
          {{ course?.courseName }}
        </p>
        <p class="text-xs text-gray-400">
          Detail is not an obsession, it is the very essence of perfection.
        </p>
        <div class="flex justify-between items-center">
          <div class="text-xl font-medium ">
            <span class="text-lg font-medium text-red-500 line-through ">{{
              '$' + course?.actualPrice
            }}</span
            ><span class="ms-3 text-lg font-medium text-green-500 ">{{
              '$' + course?.actualPrice! * (course?.discountPercentage! / 100)
            }}</span>
          </div>

          <p-button
            icon="pi pi-arrow-right"
            [rounded]="true"
            severity="info"
          ></p-button>
        </div>

        <div class="flex justify-end items-center mt-3 gap-2">
          <p-button
            severity="danger"
            [rounded]="true"
            [outlined]="true"
            icon="pi pi-heart"
            (click)="addToWishlist(course)"
          ></p-button>
          <p-button
            label="Add To Cart"
            severity="success"
            icon="pi pi-cart-plus"
            (click)="addToCart(course)"
          ></p-button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CourseCardComponent {
  @Input() course!: ICourse;

  constructor(private _cartService: CartService) {}

  addToWishlist(course: ICourse): void {
    this._cartService.addToWishlist(course);
  }

  addToCart(course: ICourse): void {
    this._cartService.addToCart(course);
  }
}
