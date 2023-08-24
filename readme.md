# Description

>

## Design

1. A product belongs to many shops and A shop stocks many products

    ```
    Many To Many
    ```

3. A product belongs to One category but a category has many products

    ```
    One To Many
    ```

## Process for relations

Define reference key in schema and add it to the QueryProperties and DataSchema as you would any other field

## Process for populating foreign object

If you defined a Type.Ref on one end of the relationshipno need to define it on the oposite side

Define the resolvers on both side. E.g:

```
//products.schema.js
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
```


```
//shops.schema.js
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
```

```
//categoryies.schema.js
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
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
# dove-relations
