import type {
  IngredientMeasurement,
  MealDBResponse,
  RecipeSummary,
  RecipeDetail,
  Meal,
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

function mapMealToRecipeSummary(mealData: Meal): RecipeSummary {
  return {
    id: mealData.idMeal,
    name: mealData.strMeal,
    thumbnail: mealData.strMealThumb,
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
  //console.log(`[RecipeService] Buscando recetas por nombre: ${query}`)
  try {
    const response = await fetch(`${currentProvider.url}search.php?s=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    const data: MealDBResponse<Meal> = await response.json()

    // Si data.meals es null o undefined, retornar array vacío
    if (!data.meals) {
      return []
    }
    // Mapear cada "meal" a nuestro tipo RecipeSummary
    return data.meals.map(mapMealToRecipeSummary)
  } catch (error) {
    console.error('[RecipeService] Error buscando recetas:', error)
    throw new Error(
      `Recipe server is not responding. Either it's down or your internet connection isn't working. Try again later.`,
    )
  }
}

export async function getRecipeDetailsById(id: string): Promise<RecipeDetail | null> {
  // console.log(`[RecipeService] Obteniendo detalles para receta ID: ${id}`)
  try {
    const query = `${currentProvider.url}lookup.php?i=${id}`
    console.debug(`[RecipeService] Query: ${query}`)
    const response = await fetch(query)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    const data: MealDBResponse<Meal> = await response.json()

    // lookup.php devuelve un array (aunque solo esperamos 1 resultado por ID)
    if (data.meals && data.meals.length > 0) {
      // Mapear el primer "meal" a nuestro tipo RecipeDetail
      return mapMealToRecipeDetail(data.meals[0])
    } else {
      return null // No se encontró la receta con ese ID
    }
  } catch (error) {
    console.error(`[RecipeService] Error obteniendo detalles para ID ${id}:`, error)
    throw new Error(
      `Can't get recipe details. Either recipe server it's down or your internet connection isn't working. Try again later.`,
    )
  }
}
