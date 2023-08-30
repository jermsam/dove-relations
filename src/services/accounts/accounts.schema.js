// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual} from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const accountsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    age: Type.Number(),
    gender: Type.String(),
    userIds: Type.Optional(Type.Array(ObjectIdSchema()))
  },
  { $id: 'Accounts', additionalProperties: false }
)
export const accountsValidator = getValidator(accountsSchema, dataValidator)
export const accountsResolver = resolve({
  users: virtual(async (account, context) => {
    const {data} = await context.app.service('users').find({
      query: {
        _id: {
          $in: account.userIds || []
        }
      },
    })
    return data;
  })
})

export const accountsExternalResolver = resolve({})

// Schema for creating new entries
export const accountsDataSchema = Type.Pick(accountsSchema, ['name', 'age', 'gender', 'userIds'], {
  $id: 'AccountsData'
})
export const accountsDataValidator = getValidator(accountsDataSchema, dataValidator)
export const accountsDataResolver = resolve({})

// Schema for updating existing entries
export const accountsPatchSchema = Type.Partial(accountsSchema, {
  $id: 'AccountsPatch'
})
export const accountsPatchValidator = getValidator(accountsPatchSchema, dataValidator)
export const accountsPatchResolver = resolve({})

// Schema for allowed query properties
export const accountsQueryProperties = Type.Pick(accountsSchema, ['_id', 'name', 'age', 'gender', 'userIds'])
export const accountsQuerySchema = Type.Intersect(
  [
    querySyntax(accountsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const accountsQueryValidator = getValidator(accountsQuerySchema, queryValidator)
export const accountsQueryResolver = resolve({})
