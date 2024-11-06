// utils/groupByZone.ts
import { initHfcForm } from "@/components/UILayouts/HouseFellowshipForm";

export const groupedByZone = (data: typeof initHfcForm[]) => {
  return data.reduce((acc, hfc) => {
    const { zone } = hfc;
    if (!acc[zone]) {
      acc[zone] = [];
    }
    acc[zone].push(hfc);
    return acc;
  }, {} as Record<string, typeof initHfcForm[]>);
};
