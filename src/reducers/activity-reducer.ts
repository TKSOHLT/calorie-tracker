import type { Activity } from "../types"

//! useReducer:
//*
// Está vacado en useState, es un hook para manejar el state 
// es una alternativa a useState, se usa para situaciones más complejas
// como usarlo en donde el nuevo estado depende del estado anterior 
// o cuando hay multiples sub-valores o logica condicional a considerar
// Composición:
// *const [state, dispatch] = useReducer(reducer, initialState);
// Es una función que toma el estado actual y una accio´n, y devuelve el nuevo estado
// Estado inicial: El estado inicial del reducer*/

//**
// !Terminos:
// * state: es el vlaor del estado cuya logica se maneja dentro del reducer
// * initialState: Es el state inicial con el que es creado el reducer, similar a los valores de inicio de useState
// * Actions: Acciones o funciones que manejan toda la lógica para modificar el state
// * Payload: Es la información que modifica el state
// */

export type ActivityActions = {
    type: 'save-activity',
    payload: { newActivity: Activity } //Payload = parametro
}| {
    type: 'set-activeId',
    payload: { id: Activity['id'] } //Payload = parametro
} | {
    type: 'delete-activity',
    payload: { id: Activity['id']}
} | {
    type: 'restart-app'
}

export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id'] //lookup
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
}

//State inicial:
export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

//!Reducer:
export const activityReducer = (
        state : ActivityState = initialState,
        action: ActivityActions
    ) => {

        if(action.type === 'save-activity'){
            //Este codigo maneja la logica  para actualizar el state
            let updatedActivities : Activity[] = [];
            if(state.activeId){
                updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity);
            }else{
                updatedActivities = [...state.activities, action.payload.newActivity]
            }

            return {
                ...state,
                activities: updatedActivities,
                activeId: '' // Cada que haya una nueva actividad se va a reiniciar
            };
        }

        if(action.type === 'set-activeId'){
            return {
                ...state,
                activeId: action.payload.id
            };
        }

        if(action.type == 'delete-activity'){
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id)
            }
        }

        if(action.type == 'restart-app'){
            return {
                activities: [],
                activeId: ''
            }
        }

        return state;
}
