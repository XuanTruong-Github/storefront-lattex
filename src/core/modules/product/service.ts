import type { Collection } from '@/core/modules/collection/type';
import api from '@/core/lib/axios';

const service = {
  searchProduct(keyword: string, page: number, size: number) {
    const from = (page - 1) * size;
    const request = JSON.stringify({
      query: {
        bool: {
          filter: {
            bool: {
              must: [
                { terms: { visibility: [3, 4] } },
                { terms: { status: [0, 1] } },
              ],
            },
          },
          must: {
            function_score: {
              functions: [
                {
                  filter: { match: { attribute_code: 'attribute_value' } },
                  weight: 1,
                },
              ],
              score_mode: 'multiply',
              boost_mode: 'multiply',
              max_boost: 100,
              min_score: 1,
              query: {
                bool: {
                  should: [
                    {
                      multi_match: {
                        fields: ['name^4', 'sku^2', 'category.name^1'],
                        query: keyword,
                        operator: 'or',
                        fuzziness: 2,
                        cutoff_frequency: 0.01,
                        max_expansions: 3,
                        prefix_length: 2,
                        minimum_should_match: '75%25',
                        tie_breaker: '1',
                      },
                    },
                    {
                      bool: {
                        should: [
                          {
                            terms: {
                              'configurable_children.sku': [keyword],
                            },
                          },
                          {
                            match_phrase: {
                              sku: { query: keyword, boost: 1 },
                            },
                          },
                          {
                            match_phrase: {
                              'configurable_children.sku': {
                                query: keyword,
                                boost: 1,
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      min_score: 0.02,
    });
    const _source_include = [
      'id',
      'image',
      'name',
      'price',
      'final_price',
      'original_price',
      'special_price',
      'original_final_price',
      'type_id',
      'slug',
      '*image',
      '*small_image',
      'firstVariant',
    ].join(',');
    const url = '/api/vue/catalog/vue_storefront_catalog/product/_search';
    return api.get(url, {
      params: {
        from,
        size,
        request,
        _source_include,
      },
    });
  },
  getProductsByCollection(
    collection: Collection,
    page: number,
    size: number,
    sort = ''
  ) {
    const from = (page - 1) * size;
    const collectionID = collection._id;
    const rules = JSON.stringify({
      _id: collection?._id,
      disjunctive: collection?.disjunctive,
      collectionType: collection?.collectionType,
      rules: collection?.rules,
    });
    const request = JSON.stringify({
      query: {
        bool: {
          filter: {
            bool: {
              must: [
                { terms: { visibility: [2, 3, 4] } },
                { terms: { status: [0, 1] } },
                {
                  terms: {
                    rules,
                  },
                },
                { terms: { category_ids: [collectionID] } },
              ],
            },
          },
        },
      },
    });
    const _source_include = [
      'id',
      'image',
      'name',
      'price',
      'final_price',
      'original_price',
      'special_price',
      'original_final_price',
      'type_id',
      'slug',
      '*image',
      '*small_image',
      'firstVariant',
    ].join(',');
    const url = `/api/vue/catalog/vue_storefront_catalog/product/_search`;
    return api.get(url, {
      params: {
        from,
        size,
        request,
        _source_include,
        sort,
      },
    });
  },
  getProduct(sku: string) {
    const from = 0;
    const size = 1;
    const request = JSON.stringify({
      query: {
        bool: {
          filter: { terms: { sku: [sku] } },
        },
      },
    });

    const _source_exclude = [
      'attribute_set_id',
      'created_at',
      'has_options',
      'msrp_display_actual_price_type',
      '*.msrp_display_actual_price_type',
      'options_container',
      'required_options',
      'small_image',
      'stock.enable_qty_increments',
      'stock.is_decimal_divided',
      'stock.manage_stock',
      'stock.notify_stock_qty',
      'stock.qty_increments',
      'stock.show_default_notification_message',
      'stock.stock_id',
      'stock.stock_status_changed_auto',
      'stock.use_config_qty_increments',
      'stock.use_config_min_qty',
      'stock.use_config_notify_stock_qty',
      'stock.use_config_backorders',
      'stock.use_config_enable_qty_inc',
      'stock.use_config_manage_stock',
      'stock.use_config_min_sale_qty',
      'stock.use_config_max_sale_qty',
      'sgn',
      '*.sgn',
      'updated_at',
      'books',
    ].join(',');
    const url = '/api/vue/catalog/vue_storefront_catalog/product/_search';
    return api.get(url, {
      params: {
        from,
        size,
        request,
        _source_exclude,
      },
    });
  },
  getReviews(productID: string, page = 1, limit = 8) {
    const params = {
      type: 'product',
      product_id: productID,
      page,
      limit,
    };
    return api.get('/api/reviews/public', { params });
  },
};
export default service;
