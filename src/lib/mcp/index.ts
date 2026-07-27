import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listFarmDiaryTool from "./tools/list-farm-diary";
import createFarmDiaryEntryTool from "./tools/create-farm-diary-entry";
import getProfileTool from "./tools/get-profile";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "agriai-mcp",
  title: "AgriAI MCP",
  version: "0.1.0",
  instructions:
    "Tools for AgriAI: read and manage the signed-in farmer's farm diary entries and profile. Use list_farm_diary_entries to inspect activity/expense logs, create_farm_diary_entry to add new ones, and get_my_profile for account info.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listFarmDiaryTool, createFarmDiaryEntryTool, getProfileTool],
});
