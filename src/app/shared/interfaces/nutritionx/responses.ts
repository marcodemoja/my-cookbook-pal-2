export interface NaturalNutrientsResponse {
  foods: Array<Food>
}

export interface Food {
  food_name: String,
  brand_name?: String,
  serving_qty?: Number,
  serving_unit: String,
  serving_weight_grams?: Number,
  nf_calories?: Number,
  nf_total_fat?: Number,
  nf_saturated_fat?: Number,
  nf_cholesterol?: Number,
  nf_sodium?: Number,
  nf_total_carbohydrate?: Number,
  nf_dietary_fiber?: Number,
  nf_sugars?: Number,
  nf_protein?: Number,
  nf_potassium?: Number,
  nf_p?: Number,
  full_nutrients?: [
    {
      attr_id: Number,
      value: Number
    }
  ],
  nix_brand_name?: String | null,
  nix_brand_id?: Number | null,
  nix_item_name?: String | null,
  nix_item_id?: Number | null,
  upc?: String | Number | null,
  consumed_at?: String,
  metadata?: {
    is_raw_food?: Boolean
  },
  source?: Number,
  ndb_no?: Number,
  tags?: Tags,
  alt_measures?: AltMeasure[],
  lat?: String | null,
  lng?: String | null,
  meal_type?: Number,
  photo?: Photo,
  sub_recipe?: String | Number | null,
  class_code?: String | Number | null,
  brick_code?: String | Number | null,
  tag_id?: String | Number | null
}

export interface Photo {
  thumb: String,
  highres: String,
  is_user_uploaded: Boolean
}

export interface Tags {
  item: String,
  measure: String | null,
  quantity: String,
  food_group: Number,
  tag_id: Number
}

export interface AltMeasure {
  serving_weight: Number,
  measure: String,
  seq: Number,
  qty: Number
}

export type InstantSearchResponse = {
  common: InstantSearchItemResponse[]
}

export type InstantSearchItemResponse = {
  food_name: string;
}
