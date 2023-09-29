export type Product = {
  attributes_metadata?: AttributesMetadata[];
  bundle_options?: BundleOption[];
  category: Record<string, any>[];
  category_ids: string[] | number[];
  color?: string;
  color_options?: number[] | string[];
  configurable_children?: Record<string, any>[];
  configurable_options?: ProductOption[];
  custom_attributes?: any;
  custom_options?: CustomOption[];
  description: string;
  errors?: Record<string, any>;
  final_price?: number;
  finalPrice?: number;
  gift_message_available?: string;
  has_options?: string;
  id: string;
  image: string;
  info?: Record<string, any>;
  is_configured?: true;
  material?: string;
  max_price?: number;
  max_regular_price?: number;
  media_gallery: Record<string, any>[];
  minimal_price: number;
  minimal_regular_price: number;
  name: string;
  new?: string;
  options?: Record<string, any>[];
  parentSku?: string;
  pattern?: string;
  price: number;
  price_incl_tax?: number;
  priceInclTax?: number;
  price_tax?: number;
  priceTax?: number;
  product_links?: ProductLink[];
  product_option?: ProductOptions;
  regular_price: number;
  required_options?: string;
  sale?: string;
  sgn?: string;
  size?: string;
  size_options?: number[] | string[];
  sku: string;
  slug?: string;
  small_image?: string;
  special_price_incl_tax?: any;
  special_price_tax?: any;
  special_price?: number;
  specialPriceInclTax?: any;
  specialPriceTax?: any;
  specialPrice?: number;
  status: number;
  stock: Record<string, any>;
  style_general?: string;
  tax_class_id?: string;
  thumbnail?: string;
  tsk?: number;
  type_id: string;
  url_key: string;
  url_path?: string;
  visibility: number;
  _score?: number;
  qty?: number;
  tier_prices?: any[];
  links?: any;
  parentId?: number | string;
  firstVariant?: any;
  original_final_price: number;
};

export type ProductLink = {
  sku: string;
  link_type: string;
  linked_product_sku: string;
  linked_product_type: string;
  position: number;
  extension_attributes: {
    qty: number;
  };
  product?: Product;
};

export type ProductOptions = {
  extension_attributes: {
    custom_options: any[];
    configurable_item_options: ConfigurableItemOption[];
    bundle_options: SelectedBundleOption[];
  };
};
export type ProductOption = {
  attribute_code?: string;
  id: number | string;
  label: string;
  values?: any[];
};

export type ProductConfiguration = {
  color: ProductOption;
  size: ProductOption;
};
export type PagedProductList = {
  start: number;
  perPage: number;
  total: number;
  items: Product[];
};

export type ProductState = {
  current: any;
  current_options: any;
  current_configuration: any;
  parent: any;
  list: PagedProductList;
  original: any;
  related: { [key: string]: Product[] };
  offlineImage: any;
  current_custom_options: any;
  current_bundle_options: any;
  custom_options_validators: any;
  productLoadStart: number;
  productLoadPromise: Promise<any> | null;
  productGallery: any;
};
