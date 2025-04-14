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
  category: string
}

/**
 * Type for the categories API response
 */
export interface CategoriesDBResponse {
  categories: RecipeCategory[]
}

/**
 * Type for the categories
 */
export interface RecipeCategory {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
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
 * Type for the Meal object
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
