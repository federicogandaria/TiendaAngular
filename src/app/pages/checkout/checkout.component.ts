import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { IDetails, IOrder } from 'src/app/shared/interfaces/order.interface';
import { IStore } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { IProduct } from '../products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']

})
export class CheckoutComponent implements OnInit {

  constructor(private dataSvc: DataService, private shoppingCartSvc: ShoppingCartService, private router:Router,
    private productsSvc: ProductsService) {
      this.checkIfCartIsEmpty()
     }

  stores: IStore[] = []

  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };

  isDelivery = true;
  cart: IProduct[] = [];



  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails()
  }


  onPickUpOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    const data: IOrder = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data).pipe(
      tap(res => console.log('Order =>', res)),
      switchMap(({id:orderId}) => {
        const details = this.prepareDetails();
        return this.dataSvc.saveDetailsOrder({ details, orderId });
      }),
      tap(() => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap( () => this.shoppingCartSvc.resetCart() )
    )
      .subscribe()

  }

  private getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: IStore[]) => this.stores = stores))
      .subscribe()
  }


  private getCurrentDay(): string {
    return new Date().toLocaleDateString()
  }

  private prepareDetails(): IDetails[] {
    const details: IDetails[] = [];
    this.cart.forEach((product: IProduct) => {
      const { id: productId, name: productName, qty: quantity, stock } = product;
      const updateStock = (stock - quantity);
      this.productsSvc.updateStock(productId,updateStock)
      .pipe(
        tap(() => details.push({ productId, productName, quantity }))
      )
      .subscribe()



    })
    return details

  }

  private getDataCart(): void {

    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: IProduct[]) => this.cart = products)
      )
      .subscribe()
  }

  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap( (products: IProduct[])=>{
        if(Array.isArray(products) && !products.length){
          this.router.navigate(['/products']);
        }
      }
      )
    )
    .subscribe()
  }
}
