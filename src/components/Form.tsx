import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import type { ChangeEvent, FormEvent } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import { useActivity } from "../hook/useActivity";

const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
}

export default function Form() {
  const {state, dispatch} = useActivity();

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
      console.log("activeId cambió:", state.activeId);

    if(state.activeId){
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
        ...activity,
        [e.target.id]: isNumberField ? +e.target.value  : e.target.value
    })
  }

  const isValidActivity = () => {
    const {name, calories} = activity;
    return name.trim() !== '' && calories > 0;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: "save-activity", payload: {newActivity: activity}});
    setActivity({...initialState,id: uuidv4()});
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name">Actividad:</label>
        <input
          id="name"
          type="text"
          value={activity.name}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, jugo de naranja, ensalada, ejercicio, pesas, bicicleta..."
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories">Calorias:</label>
        <input
          id="calories"
          type="number"
          value={activity.calories}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 o 500"
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
