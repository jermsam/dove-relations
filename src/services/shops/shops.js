// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  shopsDataValidator,
  shopsPatchValidator,
  shopsQueryValidator,
  shopsResolver,
  shopsExternalResolver,
  shopsDataResolver,
  shopsPatchResolver,
  shopsQueryResolver
} from './shops.schema.js'
import { ShopsService, getOptions } from './shops.class.js'

export const shopsPath = 'shops'
export const shopsMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './shops.class.js'
export * from './shops.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const shops = (app) => {
  // Register our service on the Feathers application
  app.use(shopsPath, new ShopsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: shopsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(shopsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(shopsExternalResolver), schemaHooks.resolveResult(shopsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(shopsQueryValidator), schemaHooks.resolveQuery(shopsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(shopsDataValidator), schemaHooks.resolveData(shopsDataResolver)],
      patch: [schemaHooks.validateData(shopsPatchValidator), schemaHooks.resolveData(shopsPatchResolver)],
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
