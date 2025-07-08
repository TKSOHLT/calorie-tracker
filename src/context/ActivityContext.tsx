import {
  createContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  activityReducer,
  initialState,
  type ActivityActions,
  type ActivityState,
} from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import type { Activity } from "../types";

//**
// *Al crear un context se requiere de:
// 1. Context: Contexto de la app
// 2. Provider: Se recibe el children que es un ReactNode y se colocan como value={{}} lo que se va a retornar
// 3. Props de ambos */

type ActivityContextProps = {
  state: ActivityState,
  dispatch: Dispatch<ActivityActions>,
  caloriesConsumed: number,
  caloriesBurned: number,
  netCalories: number,
  categoryName: (category: Activity["category"]) => string[],
  isEmptyActivities: boolean
};

type ActivityProviderProps = {
  children: ReactNode
};

export const ActivityContext = createContext<ActivityContextProps>(null!); //Los props de este context

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  //Aquí se pueden poner funciones compartidas como un useMemo con alguna funcion
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities]
  );

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );
  
  return (
    <ActivityContext.Provider
      value={{
        //Aquì se usan los props del context (type ActivityContextProps = {...})
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        categoryName,
        isEmptyActivities
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
