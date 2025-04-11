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
    instructions: parseStepsFromText(mealData.strInstructions) || '',
    tags: mealData.strTags?.split(',').map((tag: string) => tag.trim()) || [],
    ytUrl: mealData.strYoutube || '',
    ingredients: mapMealDBResponseToIngredients(mealData),
  }
}

export async function searchRecipesByName(query: string): Promise<RecipeSummary[]> {
  console.log(`[RecipeService] Buscando recetas por nombre: ${query}`)
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
    // En un caso real, podríamos querer manejar el error de forma más específica
    // o lanzar un error personalizado para que la UI lo capture.
    return [] // Retornar vacío en caso de error por ahora
  }
}

export async function getRecipeDetailsById(id: string): Promise<RecipeDetail | null> {
  console.log(`[RecipeService] Obteniendo detalles para receta ID: ${id}`)
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
    return null // Retornar null en caso de error
  }
}

function parseStepsFromText(text: string | undefined): { step: string; content: string }[] {
  if (!text) {
    return []
  }
  const lines = text.split('\r\n').filter((l) => l.trim() != '')
  const steps: { step: string; content: string }[] = []
  let currentStep: string | null = null
  let currentContent: string[] = []

  for (const line of lines) {
    const stepMatch = line.match(/^STEP (\d+)/)
    if (stepMatch) {
      // Add previous step,content if a new step is found
      if (currentStep && currentStep !== stepMatch[0]) {
        steps.push({ step: currentStep, content: currentContent.join('\r\n').trim() })
      }
      currentStep = stepMatch[0] // "STEP N"
      currentContent = []
    } else if (line.trim() !== '') {
      currentContent.push(line.trim())
    }
  }

  // Add the last step if exists
  if (currentStep) {
    steps.push({ step: currentStep, content: currentContent.join(' ').trim() })
  }

  return steps
}
