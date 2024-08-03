import { useMemo } from "react";
import { ViewCalories } from "./ViewCalories";
import { useActivity } from "../hooks/useActivity";

export const ActivityTracker = () => {
  const { state } = useActivity();

  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );
  const caloriesUsed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesDiferenc = useMemo(
    () => caloriesConsumed - caloriesUsed,
    [state.activities]
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
