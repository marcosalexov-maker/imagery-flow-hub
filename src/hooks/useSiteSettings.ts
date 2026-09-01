import { siteSettings } from "@/data/content";

export const useSiteSettings = () => {
  return {
    data: Object.entries(siteSettings).map(([setting_key, setting_value]) => ({
      id: setting_key,
      setting_key,
      setting_value,
      description: null as string | null,
    })),
    isLoading: false,
    error: null,
  };
};

export const useSiteSetting = (key: string, defaultValue: string = "") => {
  const value = siteSettings[key] ?? defaultValue;
  return { value, isLoading: false, error: null };
};

// Specific hook for Cal.com URL
export const useCalComUrl = () => {
  return useSiteSetting("cal_com_url", "demo");
};
