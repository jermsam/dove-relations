// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  productsDataValidator,
  productsPatchValidator,
  productsQueryValidator,
  productsResolver,
  productsExternalResolver,
  productsDataResolver,
  productsPatchResolver,
  productsQueryResolver
} from './products.schema.js'
import { ProductsService, getOptions } from './products.class.js'

export const productsPath = 'products'
export const productsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './products.class.js'
export * from './products.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const products = (app) => {
  // Register our service on the Feathers application
  app.use(productsPath, new ProductsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: productsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(productsPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(productsExternalResolver),
        schemaHooks.resolveResult(productsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(productsQueryValidator),
        schemaHooks.resolveQuery(productsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(productsDataValidator),
        schemaHooks.resolveData(productsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(productsPatchValidator),
        schemaHooks.resolveData(productsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
