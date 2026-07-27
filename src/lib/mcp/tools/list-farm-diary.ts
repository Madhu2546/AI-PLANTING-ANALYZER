import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_farm_diary_entries",
  title: "List farm diary entries",
  description: "List the signed-in user's farm diary entries, most recent first.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).optional().describe("Max entries to return (default 20)."),
    crop: z.string().optional().describe("Optional filter by crop name."),
    category: z.string().optional().describe("Optional filter by category (e.g. planting, harvest, expense)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, crop, category }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let query = supabaseForUser(ctx)
      .from("farm_diary_entries")
      .select("id, date, title, crop, category, amount, notes, created_at")
      .order("date", { ascending: false })
      .limit(limit ?? 20);
    if (crop) query = query.eq("crop", crop);
    if (category) query = query.eq("category", category);
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { entries: data ?? [] },
    };
  },
});
