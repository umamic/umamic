
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

    // Prompt with exact and suggested buckets
    const prompt = `You are a professional chef and culinary expert. Generate ${type.toLowerCase()} items based on the following:

Mood: ${mood}
Type: ${type}
Available ingredients: ${ingredients.join(', ')}

Rules:
- Partition results into two arrays: "recipes" (must ONLY use available ingredients + staples) and "suggested" (may use at most 1 additional common ingredient beyond the provided list; list it in "missingIngredients").
- Staples allowed for all: water, salt, neutral oil (olive or vegetable), butter. For desserts you may also use sugar, flour, baking powder, baking soda, and vanilla extract. Do NOT use black pepper or savory spices in desserts.
- If ingredients are too limited to make the requested type, return an empty list for "recipes". Do NOT invent absurd combinations.
- Number of total items across both arrays: between 1 and 6 depending on variety. If limited, return fewer. If impossible, return 0.
- Each instruction must be atomic: one action per step. Do not combine multiple actions in a single instruction.
- Provide exact, realistic measurements and times. Prefer cups/tbsp/tsp/oz/°F.
- Ensure every item clearly matches the requested type.

Respond in EXACT JSON, no extra text:
{
  "recipes": [
    {
      "title": "Name",
      "description": "Brief mood-aware description",
      "prepTime": "X minutes",
      "cookTime": "X minutes",
      "servings": "X people",
      "ingredients": ["Exact measured ingredient"],
      "instructions": ["Atomic step 1", "Atomic step 2"],
      "moodNote": "How this fits the ${mood.toLowerCase()} mood"
    }
  ],
  "suggested": [
    {
      "title": "Name",
      "description": "Brief description",
      "prepTime": "X minutes",
      "cookTime": "X minutes",
      "servings": "X people",
      "ingredients": ["..."],
      "instructions": ["..."],
      "moodNote": "...",
      "missingIngredients": ["single missing ingredient"]
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
        temperature: 0.6,
        max_tokens: 2200
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content ?? '';

    console.log('Generated content:', generatedContent);

    // Parse and post-process
    let payload: any;
    try {
      payload = JSON.parse(generatedContent);

      const splitSteps = (steps: string[]) => {
        const out: string[] = [];
        for (const s of steps || []) {
          const parts = s
            .replace(/\s*;\s*/g, '. ')
            .split(/\.(?=\s|$)/g)
            .map(p => p.trim())
            .filter(Boolean);
          for (let i = 0; i < parts.length; i++) {
            const text = parts[i].endsWith('.') ? parts[i] : parts[i] + (i < parts.length - 1 ? '.' : '');
            if (text) out.push(text);
          }
        }
        return out;
      };

      if (Array.isArray(payload?.recipes)) {
        payload.recipes = payload.recipes.slice(0, 6).map((r: any) => ({
          ...r,
          instructions: Array.isArray(r.instructions) ? splitSteps(r.instructions) : [],
        }));
      } else {
        payload.recipes = [];
      }

      if (Array.isArray(payload?.suggested)) {
        payload.suggested = payload.suggested.slice(0, 6).map((r: any) => ({
          ...r,
          missingIngredients: Array.isArray(r.missingIngredients) ? r.missingIngredients : [],
          instructions: Array.isArray(r.instructions) ? splitSteps(r.instructions) : [],
        }));
      } else {
        payload.suggested = [];
      }
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw response:', generatedContent);
      payload = { recipes: [], suggested: [] };
    }

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in generate-recipe function:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate recipe',
      details: error?.message ?? 'Unknown error',
      recipes: [],
      suggested: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
