import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

  @Input() product!: IProduct;
  @Output() addToCartClick = new EventEmitter<IProduct>();


  onClick(): void {
    console.log('Click', this.product)
    this.addToCartClick.emit(this.product)
  }


}
