import { ProductState,singleProductState } from './products/products.reducer'
import {UsersState} from './users/users.reducer'
import {CurrentUserState} from './currentUser/currentuser.reducer'

export interface AppState {
  products: ProductState;
  currentUser: CurrentUserState;
  product_detail: singleProductState
  users: UsersState;
  
}
