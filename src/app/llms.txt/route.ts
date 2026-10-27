import { buildLlmsTxt, textHeaders } from '@/lib/llms';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsTxt(), { headers: textHeaders });
}
