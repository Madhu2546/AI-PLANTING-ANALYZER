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
  name: "create_farm_diary_entry",
  title: "Create farm diary entry",
  description: "Create a new farm diary entry for the signed-in user.",
  inputSchema: {
    title: z.string().trim().min(1).describe("Short title of the activity."),
    crop: z.string().trim().min(1).describe("Crop name this entry relates to."),
    category: z.string().trim().min(1).describe("Category (e.g. planting, irrigation, harvest, expense)."),
    date: z.string().describe("Date in YYYY-MM-DD format."),
    amount: z.number().optional().describe("Optional monetary amount (expense/income)."),
    notes: z.string().optional().describe("Optional free-form notes."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("farm_diary_entries")
      .insert({ ...input, user_id: ctx.getUserId() })
      .select()
      .single();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: `Created entry ${data.id}` }],
      structuredContent: { entry: data },
    };
  },
});
