
export interface Recipe {
  id?: string;
  name: string;
  description: string;
  preparation: string;
  ingredients?: Ingredient[]
}

export interface Ingredient {
  food_id: string,
  food_name: string,
  quantity: string,
  serving_unit: string,
}
