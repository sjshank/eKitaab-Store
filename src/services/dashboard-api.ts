import { callApiEndpoint } from "@/lib/api";

export const populateDashboardData = async () => {
  const data = await callApiEndpoint("catalog");
  return data;
};
