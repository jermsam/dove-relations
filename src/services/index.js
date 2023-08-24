import { shops } from './shops/shops.js'

import { products } from './products/products.js'

import { categories } from './categories/categories.js'

export const services = (app) => {
  app.configure(shops)

  app.configure(products)

  app.configure(categories)

  // All services will be registered here
}
