import { users } from './users/users.js'

import { accounts } from './accounts/accounts.js'

import { orders } from './orders/orders.js'

import { shops } from './shops/shops.js'

import { products } from './products/products.js'

import { categories } from './categories/categories.js'

export const services = (app) => {
  app.configure(users)

  app.configure(accounts)

  app.configure(orders)

  app.configure(shops)

  app.configure(products)

  app.configure(categories)

  // All services will be registered here
}
