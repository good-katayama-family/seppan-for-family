import type { costFormType } from "@lib/type/costForm.model";

type householdType = {
  label: string;
  placeholder: string;
  form: keyof costFormType;
};

export const householdList: householdType[] = [
  { label: "家賃", placeholder: "56000", form: "rent" },
  { label: "食費", placeholder: "20000", form: "foodCost" },
  { label: "光熱費", placeholder: "8000", form: "utilityCost" },
  { label: "水道", placeholder: "1000", form: "waterCost" },
  { label: "通信費", placeholder: "4500", form: "communicationCost" },
  { label: "日用品費", placeholder: "3800", form: "dailyCost" },
  { label: "交際費", placeholder: "15000", form: "entertainmentCost" },
  { label: "その他", placeholder: "1200", form: "othersCost" },
];
