// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve, virtual} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import {ObjectIdSchema} from '@feathersjs/typebox'
import {dataValidator, queryValidator} from '../../validators.js'
import {categoriesSchema} from "../categories/categories.schema.js";

// Main data model schema
export const productsSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        name: Type.String(),
        price: Type.Number(),
        categoryId: Type.String(),
        category: Type.Ref(categoriesSchema),
        shopIds: Type.Optional(Type.Array(Type.String())),
    },
    {$id: 'Products', additionalProperties: false}
)
export const productsValidator = getValidator(productsSchema, dataValidator)
export const productsResolver = resolve({
    category: virtual(async (product, context) => {
        return context.app.service('categories').get(product.categoryId);
    }),
    shops: virtual(async (product, context) => {
        const {data} = await context.app.service('shops').find({
            query: {
                _id: {
                    $in: product.shopIds || []
                }
            },
        })
        return data;
    })
})

export const productsExternalResolver = resolve({})

// Schema for creating new entries
export const productsDataSchema = Type.Pick(productsSchema, ['name', 'price', 'categoryId', 'shopIds'], {
    $id: 'ProductsData'
})
export const productsDataValidator = getValidator(productsDataSchema, dataValidator)
export const productsDataResolver = resolve({})

// Schema for updating existing entries
export const productsPatchSchema = Type.Partial(productsSchema, {
    $id: 'ProductsPatch'
})
export const productsPatchValidator = getValidator(productsPatchSchema, dataValidator)
export const productsPatchResolver = resolve({})

// Schema for allowed query properties
export const productsQueryProperties = Type.Pick(productsSchema, ['_id', 'name', 'price', 'categoryId', 'shopIds'])
export const productsQuerySchema = Type.Intersect(
    [
        querySyntax(productsQueryProperties),
        // Add additional query properties here
        Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export const productsQueryValidator = getValidator(productsQuerySchema, queryValidator)
export const productsQueryResolver = resolve({})
