export type Meal = {
  _id?: string;
  type: "Breakfast" | "Lunch" | "Dinner" | string;
  name: string;
  portion: string;
  calories: number;
  date?: string;
};