import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hook/useActivity";

export default function CalorieTracker() {
  const { caloriesBurned, caloriesConsumed, netCalories } = useActivity();

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay text="Consumidas" calories={caloriesConsumed} />
        <CalorieDisplay text="Quemadas" calories={caloriesBurned} />
        <CalorieDisplay text="Diferencia" calories={netCalories} />
      </div>
    </>
  );
}
