// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve, virtual} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import {ObjectIdSchema} from '@feathersjs/typebox'
import {dataValidator, queryValidator} from '../../validators.js'
// import {productsSchema} from "../products/products.schema.js";

// Main data model schema
export const categoriesSchema = Type.Object(
    {
        _id: ObjectIdSchema(),
        name: Type.String(),
        productIds: Type.Optional(Type.Array(Type.String())),
        // products: Type.Array(Type.Ref(productsSchema))
    },
    {$id: 'Categories', additionalProperties: false}
)
export const categoriesValidator = getValidator(categoriesSchema, dataValidator)
export const categoriesResolver = resolve({
    products: virtual(async (category, context) => {
        const {data} = await context.app.service('products').find({
            query:  {
                _id: {
                    $in: category.productIds || []
                }
            },
        })
        return data;
    })
})

export const categoriesExternalResolver = resolve({})

// Schema for creating new entries
export const categoriesDataSchema = Type.Pick(categoriesSchema, ['name', 'productIds'], {
    $id: 'CategoriesData'
})
export const categoriesDataValidator = getValidator(categoriesDataSchema, dataValidator)
export const categoriesDataResolver = resolve({})

// Schema for updating existing entries
export const categoriesPatchSchema = Type.Partial(categoriesSchema, {
    $id: 'CategoriesPatch'
})
export const categoriesPatchValidator = getValidator(categoriesPatchSchema, dataValidator)
export const categoriesPatchResolver = resolve({})

// Schema for allowed query properties
export const categoriesQueryProperties = Type.Pick(categoriesSchema, ['_id', 'name', 'productIds'])
export const categoriesQuerySchema = Type.Intersect(
    [
        querySyntax(categoriesQueryProperties),
        Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export const categoriesQueryValidator = getValidator(categoriesQuerySchema, queryValidator)
export const categoriesQueryResolver = resolve({})
