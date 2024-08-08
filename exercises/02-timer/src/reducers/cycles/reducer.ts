import { produce } from "immer";
import { ActionTypes } from "./actions";

export interface Cycle {
  // Tipagem de cada ciclo
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  // Definição da tipagem do estado, que será gerido pelo useReducer()
  cycles: Cycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  // Função reducer que será usada no useReducer() dos ciclos
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
        draft.activeCycleId = null;
      });

      /* CÓDIGO ANTES DA BIBLIOTECA IMMER:
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null,
        };
      */
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId;
      });
      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date();
        draft.activeCycleId = null;
      });
    }
    default:
      return state;
  }
}
