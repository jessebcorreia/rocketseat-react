import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { differenceInSeconds } from 'date-fns'

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'

interface CreateCycleData {
  // Tipagem do parâmetro da função para criar um novo ciclo
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  // Tipagem do contexto dos ciclos, que serão repassados para o(s) componente(s) filho(s)
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  setActiveCycleIdAsNull: () => void
  markCurrentCycleAsFinished: () => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

// Criação e exportação do contexto dos ciclos
export const CyclesContext = createContext({} as CyclesContextType)

// Criação de uma interface definindo a tipagem da propriedade do CyclesContextProvider. Neste caso, 'children' tem o tipo 'ReactNode', que significa qualquer componente react.
interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    //
    (initialState) => {
      // Busca as informações no localstorage do navegador
      const storageStateAsJSON = localStorage.getItem(
        '@timer:cycles-state-1.0.0',
      )

      // Se houver alguma informação salva, então as retorna no formato string e será utilizada como estado inicial. Caso contrário retorna o estado inicial padrão.
      if (storageStateAsJSON) {
        return JSON.parse(storageStateAsJSON)
      }
      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  // Declaração de uma variável que recebe como valor a execução do método find(). Esse método percorre o array de objetos (ciclos) e retorna o primeiro elemento que satisfizer a condição (ou seja, que o ID do ciclo seja igual ao ID armazenado na variável activeCycleID). Com isso, será retornado o objeto (ciclo) ativo

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    // Converte as informações dos ciclos para strings no formato JSON
    const stateJSON = JSON.stringify(cyclesState)

    // Salva as informações JSON no localstorage do navegador
    localStorage.setItem('@timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function setSecondsPassed(seconds: number) {
    // Função para mudança de estado - executa o setAmountSecondsPassed()
    setAmountSecondsPassed(seconds)
  }

  function setActiveCycleIdAsNull() {
    // Função para mudança de estado - executa o setActiveCycleId()
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    // Função para criar um novo ciclo
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      // Executa o método .Provider, da criação do contexto. A propriedade "value" recebe um objeto com todos os valores e funções que serão disponibilizados para os componentes filhos através do contexto
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        setActiveCycleIdAsNull,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
