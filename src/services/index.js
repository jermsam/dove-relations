import { accounts } from './accounts/accounts.js'

import { user } from './users/users.js'

import { shops } from './shops/shops.js'

import { products } from './products/products.js'

import { categories } from './categories/categories.js'

export const services = (app) => {
  app.configure(accounts)

  app.configure(user)

  app.configure(shops)

  app.configure(products)

  app.configure(categories)

  // All services will be registered here
}
