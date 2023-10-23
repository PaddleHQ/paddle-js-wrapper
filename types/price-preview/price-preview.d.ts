export interface PricePreviewItem {
  price_id: string
  quantity: number
}

export interface PricePreviewParams {
  items: PricePreviewItem[]
  customer_id?: string
  address_id?: string
  business_id?: string
  currency_code?: string
  discount_id?: string
  address?: {
    country_code: string
    postal_code?: string
  }
  customer_ip_address?: string
}

interface UnitPrice {
  amount: string
  currency_code: string
}

interface BillingCycle {
  interval: 'day' | 'week' | 'month' | 'year'
  frequency: number
}

interface TrialPeriod {
  interval: 'day' | 'week' | 'month' | 'year'
  frequency: number
}

interface UnitPriceOverride {
  country_codes: string[]
  unit_price: UnitPrice
}

interface PriceEntity {
  id: string
  product_id: string
  description: string
  billing_cycle: BillingCycle | null
  trial_period: TrialPeriod | null
  tax_mode: 'account_setting' | 'external' | 'internal'
  unit_price: UnitPrice
  unit_price_overrides: UnitPriceOverride[]
  quantity: {
    minimum: number
    maximum: number
  }
  status: 'active' | 'archived'
  custom_data: Record<any, any> | null
}

interface Discount {
  id: string
  status: 'active' | 'archived' | 'expired' | 'used'
  description: string
  enabled_for_checkout: boolean
  code: string | null
  type: 'flat' | 'flat_per_seat' | 'percentage'
  amount: string
  currency_code: string | null
  recur: boolean
  maximum_recurring_intervals: number | null
  usage_limit: number | null
  restrict_to: string[] | null
  expires_at: string | null
  times_used: number
  created_at: string
  updated_at: string
}

interface LineItem {
  price: PriceEntity
  quantity: number
  tax_rate: string
  unit_totals: {
    subtotal: string
    discount: string
    tax: string
    total: string
  }
  formatted_unit_totals: {
    subtotal: string
    discount: string
    tax: string
    total: string
  }
  totals: {
    subtotal: string
    discount: string
    tax: string
    total: string
  }
  formatted_totals: {
    subtotal: string
    discount: string
    tax: string
    total: string
  }
  product: {
    id: string
    name: string
    description: string
    tax_category: string
    image_url: string | null
    custom_data: Record<any, any> | null
    status: 'active' | 'archived'
    created_at: string
  }
  discounts: {
    discount: Discount
    total: string
    formatted_total: string
  }[]
}

export interface PricePreviewResponse {
  data: {
    customer_id: string | null
    address_id: string | null
    business_id: string | null
    currency_code: string
    address: {
      country_code: string
      postal_code: string | null
    } | null
    customer_ip_address: string | null
    discount_id: string | null
    details: {
      line_items: LineItem[]
    }
  }
  meta: {
    request_id: string
  }
}
