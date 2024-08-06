import { createContext, ReactNode, useState } from 'react'

interface CreateCycleData {
  // Tipagem do parâmetro da função para criar um novo ciclo
  task: string
  minutesAmount: number
}

interface Cycle {
  // Tipagem de cada ciclo
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
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

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)
// Criação e exportação do contexto dos ciclos

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  // Declaração de uma variável que recebe como valor a execução do método find(). Esse método percorre o array de objetos (ciclos) e retorna o primeiro elemento que satisfizer a condição (ou seja, que o ID do ciclo seja igual ao ID armazenado na variável activeCycleID). Com isso, será retornado o objeto (ciclo) ativo

  function setSecondsPassed(seconds: number) {
    // Função para mudança de estado - executa o setAmountSecondsPassed()
    setAmountSecondsPassed(seconds)
  }

  function setActiveCycleIdAsNull() {
    // Função para mudança de estado - executa o setActiveCycleId()
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    // Função que inclui a data de encerramento de um ciclo
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    })
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
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    // Função para interromper o ciclo, acrescentando a data de interrupção no ciclo ativo e definindo a variável activeCycleId como "null" ao final de sua execução
    setCycles((state) => {
      return state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    })
    setActiveCycleId(null)
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
