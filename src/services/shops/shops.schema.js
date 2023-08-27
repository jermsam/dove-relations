// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve, virtual} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import {ObjectIdSchema} from '@feathersjs/typebox'
import {dataValidator, queryValidator} from '../../validators.js'
import {productsSchema} from "../products/products.schema.js";

// Main data model schema
export const shopsSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        name: Type.String(),
        productIds: Type.Optional(Type.Array(ObjectIdSchema())),
        products: Type.Array(Type.Ref(productsSchema))
    },
    {$id: 'Shops', additionalProperties: false}
)
export const shopsValidator = getValidator(shopsSchema, dataValidator)
export const shopsResolver = resolve({
    products: virtual(async (shop, context) => {
        const {data} = await context.app.service('products').find({
            query: {
                _id: {$in: shop.productIds || []}
            }
        })
        return data;
    })
})

export const shopsExternalResolver = resolve({})

// Schema for creating new entries
export const shopsDataSchema = Type.Pick(shopsSchema, ['name', 'productIds'], {
    $id: 'ShopsData'
})
export const shopsDataValidator = getValidator(shopsDataSchema, dataValidator)
export const shopsDataResolver = resolve({})

// Schema for updating existing entries
export const shopsPatchSchema = Type.Partial(shopsSchema, {
    $id: 'ShopsPatch'
})
export const shopsPatchValidator = getValidator(shopsPatchSchema, dataValidator)
export const shopsPatchResolver = resolve({})

// Schema for allowed query properties
export const shopsQueryProperties = Type.Pick(shopsSchema, ['_id', 'name', 'productIds'])
export const shopsQuerySchema = Type.Intersect(
    [
        querySyntax(shopsQueryProperties),
        // Add additional query properties here
        Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export const shopsQueryValidator = getValidator(shopsQuerySchema, queryValidator)
export const shopsQueryResolver = resolve({})
