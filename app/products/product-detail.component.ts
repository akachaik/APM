import { Component } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { StarComponent } from './../shared/star.component';

@Component({
    templateUrl: 'app/products/product-detail.component.html',
    directives: [StarComponent]
})
export class ProductDetail {
    pageTitle: string = "Product Details";
    product: IProduct;
    productId: number;
    errorMessage: string;
    
    constructor(private _routeParams: RouteParams, 
                private _router: Router,
                private _productService: ProductService) {
        this.productId = +this._routeParams.get('id');
        this.pageTitle += ` : ${this.productId}`;
    }
    
    ngOnInit(): void {
        this._productService.getProduct(this.productId).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }
    
    onBack(): void {
        this._router.navigate(['Products']);
    }
}