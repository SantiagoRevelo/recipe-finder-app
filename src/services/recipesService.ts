import type {
  IngredientMeasurement,
  MealDBResponse,
  RecipeSummary,
  RecipeDetail,
  Meal,
  RecipeCategory,
  CategoriesDBResponse,
} from '../models/recipe'

const THE_MEAL_DB = 'TheMealDB'
const RECIPES_PROVIDER = {
  [THE_MEAL_DB]: {
    url: 'https://www.themealdb.com/api/json/v1/1/',
    maxIngredients: 20,
  },
}

const currentProvider = RECIPES_PROVIDER[THE_MEAL_DB]

function mapMealDBResponseToIngredients(mealData: Meal): IngredientMeasurement[] {
  const ingredients: IngredientMeasurement[] = []
  for (let i = 1; i <= currentProvider.maxIngredients; i++) {
    const ingredient = mealData[`strIngredient${i}`]
    const measure = mealData[`strMeasure${i}`]

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measure: measure || '',
      })
    } else {
      break
    }
  }
  return ingredients
}

function mapMealToRecipeSummary(mealData: Meal, category: string = ''): RecipeSummary {
  return {
    id: mealData.idMeal,
    name: mealData.strMeal,
    thumbnail: mealData.strMealThumb,
    category: mealData.strCategory || category || '',
  }
}

function mapMealToRecipeDetail(mealData: Meal): RecipeDetail {
  return {
    id: mealData.idMeal,
    name: mealData.strMeal,
    thumbnail: mealData.strMealThumb,
    category: mealData.strCategory || '',
    origin: mealData.strArea || '',
    instructions: mealData.strInstructions || '',
    tags: mealData.strTags?.split(',').map((tag: string) => tag.trim()) || [],
    ytUrl: mealData.strYoutube || '',
    ingredients: mapMealDBResponseToIngredients(mealData),
  }
}

export async function searchRecipesByName(query: string): Promise<RecipeSummary[]> {
  try {
    const response = await fetch(`${currentProvider.url}search.php?s=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
    }
    const data: MealDBResponse<Meal> = await response.json()

    if (!data.meals) {
      return []
    }

    return data.meals.map((meal) => mapMealToRecipeSummary(meal))
  } catch (error) {
    console.debug('[RecipeService] Error buscando recetas:', error)
    throw new Error(
      `Recipe server is not responding. Either it's down or your internet connection isn't working. Try again later.`,
    )
  }
}

export async function getRecipeDetailsById(id: string): Promise<RecipeDetail | null> {
  try {
    const query = `${currentProvider.url}lookup.php?i=${id}`
    console.debug(`[RecipeService] Query: ${query}`)
    const response = await fetch(query)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
    }
    const data: MealDBResponse<Meal> = await response.json()

    if (data.meals && data.meals.length > 0) {
      return mapMealToRecipeDetail(data.meals[0])
    } else {
      return null
    }
  } catch (error) {
    console.debug(`[RecipeService] Error obteniendo detalles para ID ${id}:`, error)
    throw new Error(
      `Can't get recipe details. Either recipe server it's down or your internet connection isn't working. Try again later.`,
    )
  }
}

export async function getRecipeCategories(): Promise<RecipeCategory[]> {
  try {
    const response = await fetch(`${currentProvider.url}categories.php`)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
    }

    const data: CategoriesDBResponse = await response.json()

    return data.categories || []
  } catch (error) {
    console.debug('[RecipeService] Error obteniendo categorías:', error)
    throw new Error(
      `Recipe server is not responding. Either it's down or your internet connection isn't working. Try again later.`,
    )
  }
}

export async function filterRecipesByCategory(categoryName: string): Promise<RecipeSummary[]> {
  try {
    const response = await fetch(
      `${currentProvider.url}filter.php?c=${encodeURIComponent(categoryName)}`,
    )
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
    }
    const data: MealDBResponse<Meal> = await response.json()

    if (!data.meals) {
      return []
    }

    return data.meals.map((meal) => mapMealToRecipeSummary(meal, categoryName))
  } catch (error) {
    console.debug(`[RecipeService] Error filtering by category ${categoryName}: `, error)
    throw new Error(
      `Recipe server is not responding. Either it's down or your internet connection isn't working. Try again later.`,
    )
  }
}
