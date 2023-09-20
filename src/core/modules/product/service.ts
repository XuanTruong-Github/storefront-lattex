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
    const _source_exclude =
      'attribute_set_id,configurable_options,description,sgn,*.sgn,msrp_display_actual_price_type,*.msrp_display_actual_price_type,required_options,media_gallery,stock.use_config_min_qty,stock.use_config_notify_stock_qty,stock.stock_id,stock.use_config_backorders,stock.use_config_enable_qty_inc,stock.enable_qty_increments,stock.use_config_manage_stock,stock.use_config_min_sale_qty,stock.notify_stock_qty,stock.use_config_max_sale_qty,stock.use_config_max_sale_qty,stock.qty_increments,stock.stock_status_changed_auto,stock.show_default_notification_message,stock.use_config_qty_increments,stock.is_decimal_divided';
    const _source_include =
      'googleProductId,activity,configurable_children.attributes,configurable_children.id,configurable_children.final_price,configurable_children.color,configurable_children.original_price,configurable_children.original_price_incl_tax,configurable_children.price,configurable_children.price_incl_tax,configurable_children.size,configurable_children.sku,configurable_children.special_price,configurable_children.special_price_incl_tax,configurable_children.tier_prices,final_price,id,image,name,new,original_price_incl_tax,original_price,price,price_incl_tax,product_links,sale,special_price,special_to_date,special_from_date,special_price_incl_tax,status,tax_class_id,tier_prices,type_id,url_path,url_key,*image,*sku,*small_image';
    const url = '/api/vue/catalog/vue_storefront_catalog/product/_search';
    return api.get(url, {
      params: {
        from,
        size,
        request,
        _source_include,
        _source_exclude,
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
    const _source_exclude =
      'attribute_set_id,configurable_options,description,sgn,*.sgn,msrp_display_actual_price_type,*.msrp_display_actual_price_type,required_options,media_gallery,stock.use_config_min_qty,stock.use_config_notify_stock_qty,stock.stock_id,stock.use_config_backorders,stock.use_config_enable_qty_inc,stock.enable_qty_increments,stock.use_config_manage_stock,stock.use_config_min_sale_qty,stock.notify_stock_qty,stock.use_config_max_sale_qty,stock.use_config_max_sale_qty,stock.qty_increments,stock.stock_status_changed_auto,stock.show_default_notification_message,stock.use_config_qty_increments,stock.is_decimal_divided';
    const _source_include =
      'googleProductId,activity,configurable_children.attributes,configurable_children.id,configurable_children.final_price,configurable_children.color,configurable_children.original_price,configurable_children.original_price_incl_tax,configurable_children.price,configurable_children.price_incl_tax,configurable_children.size,configurable_children.sku,configurable_children.special_price,configurable_children.special_price_incl_tax,configurable_children.tier_prices,final_price,id,image,name,new,original_price_incl_tax,original_price,price,price_incl_tax,product_links,sale,special_price,special_to_date,special_from_date,special_price_incl_tax,status,tax_class_id,tier_prices,type_id,url_path,url_key,*image,*sku,*small_image';
    const url = `/api/vue/catalog/vue_storefront_catalog/product/_search`;
    return api.get(url, {
      params: {
        from,
        size,
        request,
        _source_include,
        _source_exclude,
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

    const _source_exclude =
      'attribute_set_id,created_at,has_options,msrp_display_actual_price_type,*.msrp_display_actual_price_type,options_container,required_options,small_image,stock.enable_qty_increments,stock.is_decimal_divided,stock.manage_stock,stock.notify_stock_qty,stock.qty_increments,stock.show_default_notification_message,stock.stock_id,stock.stock_status_changed_auto,stock.use_config_qty_increments,stock.use_config_min_qty,stock.use_config_notify_stock_qty,stock.use_config_backorders,stock.use_config_enable_qty_inc,stock.use_config_manage_stock,stock.use_config_min_sale_qty,stock.use_config_max_sale_qty,sgn,*.sgn,updated_at';
    const _source_include =
      'googleProductId,activity,configurable_children.attributes,configurable_children.id,configurable_children.final_price,configurable_children.color,configurable_children.original_price,configurable_children.original_price_incl_tax,configurable_children.price,configurable_children.price_incl_tax,configurable_children.size,configurable_children.sku,configurable_children.special_price,configurable_children.special_price_incl_tax,configurable_children.tier_prices,final_price,id,image,name,new,original_price_incl_tax,original_price,price,price_incl_tax,product_links,sale,special_price,special_to_date,special_from_date,special_price_incl_tax,status,tax_class_id,tier_prices,type_id,url_path,url_key,*image,*sku,*small_image';
    const url = '/api/vue/catalog/vue_storefront_catalog/product/_search';
    return api.get(url, {
      params: {
        from,
        size,
        request,
        _source_exclude,
        _source_include,
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
