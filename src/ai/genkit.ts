// Lazy-initialize genkit and its Google plugin to avoid importing
// them at module-evaluation time (which can fail in some SSR environments).
export async function getAI() {
  const { genkit } = await import('genkit');
  const mod = await import('@genkit-ai/google-genai');
  const googleAI = (mod && (mod.googleAI || mod.default)) as any;

  return genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });
}
