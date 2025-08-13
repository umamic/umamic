
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

    // Strict ingredient validation prompt
    const prompt = `You are a professional chef creating ${type.toLowerCase()} recipes. You MUST be extremely strict about ingredients.

AVAILABLE INGREDIENTS: ${ingredients.join(', ')}
ALLOWED BASIC STAPLES ONLY: water, salt, cooking oil (olive/vegetable), butter
FOR DESSERTS ONLY: also sugar, all-purpose flour, baking powder, baking soda, vanilla extract

CRITICAL RULES:
1. ONLY use ingredients from the available list above + allowed staples
2. NEVER add ingredients not listed (no herbs, spices, seasonings, etc. unless specifically provided)
3. If ingredients are insufficient for a proper ${type.toLowerCase()}, return empty recipes array
4. No absurd combinations - recipes must be logical and appetizing
5. Each recipe ingredient MUST be from the available list or allowed staples
6. Maximum 3 recipes, minimum 0 if impossible
7. ${mood === 'tired' ? 'Keep recipes simple with minimal steps (max 5 steps)' : mood === 'motivated' ? 'Can include more complex techniques but still use only available ingredients' : 'Balanced complexity with available ingredients'}

VALIDATION CHECK: Before finalizing each recipe, verify EVERY ingredient is either:
- In the available ingredients list: ${ingredients.join(', ')}
- An allowed basic staple: water, salt, cooking oil, butter${type.toLowerCase().includes('dessert') ? ', sugar, flour, baking powder, baking soda, vanilla' : ''}

Return EXACT JSON format:
{
  "recipes": [
    {
      "title": "Recipe Name",
      "description": "Brief description for ${mood} mood",
      "prepTime": "X minutes",
      "cookTime": "X minutes", 
      "servings": "X people",
      "ingredients": ["Only ingredients from available list + allowed staples"],
      "instructions": ["Clear step 1", "Clear step 2"],
      "moodNote": "How this matches ${mood} mood"
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

      // No suggested section in MVP
      payload.suggested = undefined;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw response:', generatedContent);
      payload = { recipes: [] };
    }

    return new Response(JSON.stringify({ recipes: payload.recipes ?? [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in generate-recipe function:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate recipe',
      details: error?.message ?? 'Unknown error',
      recipes: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
