import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ProductsService } from './services/products.service';
import { IProduct } from './interfaces/product.interface';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: IProduct[]
  constructor(private productSvc: ProductsService, private shoppingCartSvc: ShoppingCartService) {}


  ngOnInit(): void {
    this.productSvc.getProducts()
    .pipe(
      tap( (products: IProduct[] ) => this.products = products)
    )
    .subscribe();
  }

  addToCart(product: IProduct): void {
    console.log('Add to cart', product);
    this.shoppingCartSvc.updateCart(product);
  }

}
