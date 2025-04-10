export interface IngredientMeasurement {
  ingredient: string
  measure: string
}

/**
 * Type for API response
 */
export interface MealDBResponse<T> {
  meals: T[] | null
}

/**
 * Type for the search result and favorites
 */
export interface RecipeSummary {
  id: string
  name: string
  thumbnail: string
}

/**
 * Type for detailed
 */
export interface RecipeDetail extends RecipeSummary {
  category: string
  origin: string
  instructions: string
  tags?: string[]
  ytUrl: string
  ingredients: IngredientMeasurement[]
}

/**
 * Type for
 */
export interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory?: string
  strArea?: string
  strInstructions?: string
  strTags?: string
  strYoutube?: string
  [key: string]: string | undefined // For dynamic ingredient and measure fields
}
