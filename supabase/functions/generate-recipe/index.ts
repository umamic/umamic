import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RecipeRequest {
  mood: string;
  type: string;
  ingredients: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mood, type, ingredients }: RecipeRequest = await req.json();

    console.log('Generating recipe for:', { mood, type, ingredients });

    // Create a detailed prompt for ChatGPT
    const prompt = `You are a professional chef and culinary expert. Generate a detailed ${type.toLowerCase()} recipe based on the following:

Mood: ${mood}
Type: ${type}
Available ingredients: ${ingredients.join(', ')}
Additional ingredients always available: salt, pepper, water

Requirements:
1. Create 1-3 recipes that match the mood and type using primarily the available ingredients
2. Include EXACT measurements and amounts for all ingredients
3. Provide step-by-step instructions with specific cooking times and temperatures
4. Consider the mood when crafting the recipe (e.g., "Tired" = simple comfort food, "Energetic" = bold flavors)
5. If multiple recipes are possible, provide 2-3 variations
6. Include prep time, cook time, and serving size
7. Add a mood-appropriate note about the dish

Please respond in this EXACT JSON format:
{
  "recipes": [
    {
      "title": "Recipe name that reflects the mood",
      "description": "Brief description connecting to the mood",
      "prepTime": "X minutes",
      "cookTime": "X minutes", 
      "servings": "X people",
      "ingredients": [
        "Exact amount ingredient name (e.g., '2 large chicken breasts (about 8 oz each)')",
        "1 tablespoon olive oil",
        "Salt and pepper to taste"
      ],
      "instructions": [
        "Step 1 with specific details, times, and techniques",
        "Step 2 with exact cooking temperature and duration",
        "Step 3 with precise measurements and timing"
      ],
      "moodNote": "A personal note about how this dish connects to the ${mood.toLowerCase()} mood"
    }
  ]
}

Important guidelines:
- Only use the provided ingredients plus salt, pepper, and water
- If the combination doesn't work well (e.g., only chicken for a drink), explain why in a single recipe with title "Not Recommended"
- Be specific with measurements (cups, tablespoons, ounces, etc.)
- Include cooking temperatures in Fahrenheit
- Consider dietary restrictions and safety (proper cooking temperatures for proteins)
- Make instructions clear enough for a beginner to follow`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional chef who creates detailed, mood-based recipes. Always respond with valid JSON in the exact format requested.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Generated content:', generatedContent);

    // Parse the JSON response
    let recipes;
    try {
      recipes = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw response:', generatedContent);
      
      // Fallback: create a simple response
      recipes = {
        recipes: [{
          title: "Recipe Generation Error",
          description: "Unable to generate recipe at this time",
          prepTime: "0 minutes",
          cookTime: "0 minutes",
          servings: "0 people",
          ingredients: ingredients,
          instructions: ["Please try again with different ingredients or mood"],
          moodNote: "We're having trouble generating your recipe right now."
        }]
      };
    }

    return new Response(JSON.stringify(recipes), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-recipe function:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate recipe',
      details: error.message,
      recipes: [{
        title: "Service Unavailable",
        description: "Recipe generation service is currently unavailable",
        prepTime: "0 minutes",
        cookTime: "0 minutes", 
        servings: "0 people",
        ingredients: ["Please try again later"],
        instructions: ["The recipe generation service is temporarily unavailable"],
        moodNote: "We apologize for the inconvenience."
      }]
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});