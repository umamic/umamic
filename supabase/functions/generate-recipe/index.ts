
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
  console.log('Function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Environment variables available:', Object.keys(Deno.env.toObject()));
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    console.log('OpenAI API Key status:', openAIApiKey ? 'Found' : 'Not found');
    
    if (!openAIApiKey) {
      console.error('OpenAI API key not found in environment');
      console.error('Available env vars:', Object.keys(Deno.env.toObject()));
      throw new Error('OpenAI API key not configured');
    }
    const { mood, type, ingredients }: RecipeRequest = await req.json();

    console.log('Generating recipe for:', { mood, type, ingredients });

    // Create a detailed prompt for ChatGPT
    const prompt = `You are a professional chef and culinary expert. Generate ${type.toLowerCase()} recipes based on the following:

Mood: ${mood}
Type: ${type}
Available ingredients: ${ingredients.join(', ')}

Rules:
- Only use the available ingredients plus basic staples: water, salt, neutral oil (olive or vegetable), and butter. For desserts you may use sugar, flour, baking powder, baking soda, and vanilla extract. Do NOT use black pepper or savory spices in desserts.
- If the ingredients are too limited to make the requested type, return an empty list ("recipes": []). Do NOT invent absurd combinations.
- Number of recipes: return between 1 and 6 recipes depending on variety of ingredients. If limited, return 1. If impossible, return 0.
- Each instruction step must be atomic: one action per step. Do not combine multiple actions in one instruction.
- Provide exact, realistic measurements and times. Prefer cups/tbsp/tsp/oz/°F.
- Ensure the recipe clearly matches the requested type.

Respond in EXACT JSON, no extra text:
{
  "recipes": [
    {
      "title": "Name",
      "description": "Brief mood-aware description",
      "prepTime": "X minutes",
      "cookTime": "X minutes",
      "servings": "X people",
      "ingredients": [
        "Exact measured ingredient",
        "Another measured ingredient"
      ],
      "instructions": [
        "Atomic step 1",
        "Atomic step 2",
        "Atomic step 3"
      ],
      "moodNote": "How this fits the ${mood.toLowerCase()} mood"
    }
  ]
}`;

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

    // Parse the JSON response and post-process
    let recipes;
    try {
      recipes = JSON.parse(generatedContent);
      if (Array.isArray(recipes?.recipes)) {
        const splitSteps = (steps: string[]) => {
          const out: string[] = [];
          for (const s of steps) {
            // split on sentence boundaries; keep meaningful chunks
            const parts = s
              .split(/\.(?=\s[A-Z0-9])/g)
              .map(p => p.trim())
              .filter(Boolean);
            if (parts.length > 1) {
              parts.forEach((p, idx, arr) => {
                const text = idx < arr.length - 1 ? p + '.' : p;
                if (text) out.push(text);
              });
            } else {
              out.push(s.trim());
            }
          }
          return out;
        };

        recipes.recipes = recipes.recipes
          .slice(0, 6)
          .map((r: any) => ({
            ...r,
            instructions: Array.isArray(r.instructions) ? splitSteps(r.instructions) : [],
          }));
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw response:', generatedContent);
      // Fallback: create a simple response
      recipes = {
        recipes: []
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
