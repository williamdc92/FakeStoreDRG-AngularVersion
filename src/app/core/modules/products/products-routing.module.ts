import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { ProducerComponent } from './pages/producer/producer.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [{ 
  path: '', 
  component: ProductsComponent 
},

{
  path:'producer/:producer',
  component: ProducerComponent
},

{
  path: 'category/:category',
  component: CategoryComponent
},

{
  path:'product/:id',
  component : ProductDetailComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
