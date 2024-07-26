import { useMemo } from "react";
import { Activity } from "../types";
import { ViewCalories } from "./ViewCalories";

type ActivityTrackerProps = {
  activities: Activity[];
};

export const ActivityTracker = ({ activities }: ActivityTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesUsed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriesDiferenc = useMemo(
    () => caloriesConsumed - caloriesUsed,
    [activities]
  );

  return (
    <>
      <h1 className="text-4xl font-black text-white text-center">
        Resumen de calorias
      </h1>

      <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-between">
        <ViewCalories counter={caloriesConsumed} text="Consumidas" />
        <ViewCalories counter={caloriesUsed} text="Ejercicios" />
        <ViewCalories counter={caloriesDiferenc} text="Diferencia" />
      </div>
    </>
  );
};
