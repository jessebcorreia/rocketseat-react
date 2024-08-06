import { createContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

// Schema de validação do formulário, utilizando o zod
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ter ao menos 5 minutos')
    .max(60, 'O ciclo não pode ultrapassar 60 minutos'),
})

// Inferência de tipagem, tomando como base a validação do zod
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

// Tipagem de cada ciclo
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

// Tipagem do contexto dos ciclos, que serão repassados para o(s) componente(s) filho(s)
interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setActiveCycleIdAsNull: () => void
  setSecondsPassed: (seconds: number) => void
}

// Criação e exportação do contexto dos ciclos
export const CyclesContext = createContext({} as CyclesContextType)

// Início da criação do componente Home()
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  // Função para mudança de estado - executa o setAmountSecondsPassed()
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  // Função para mudança de estado - executa o setActiveCycleId()
  function setActiveCycleIdAsNull() {
    setActiveCycleId(null)
  }

  // Função que inclui a data de encerramento de um ciclo
  function markCurrentCycleAsFinished() {
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

  // Declaração de uma variável que recebe como valor a execução do método find(). Esse método percorre o array de objetos (ciclos) e retorna o primeiro elemento que satisfizer a condição (ou seja, que o ID do ciclo seja igual ao ID armazenado na variável activeCycleID). Com isso, será retornado o objeto (ciclo) ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  // Declaração de uma variável que recebe como valor a execução do hook useForm(). O hook recebe um objeto de configuração que utiliza o zodResolver para validar o formulário (schema de validação previamente criado). Depois, define os valores padrão para os campos do formulário através da propriedade defaultValues.
  const newCycleForm = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // Desestruturação de alguns métodos do objeto newCycleForm, criado acima
  const { handleSubmit, watch, reset } = newCycleForm

  // Função para criar um novo ciclo
  function handleCreateNewCycle(data: newCycleFormData) {
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
    reset()
  }

  // Função para interromper o ciclo, acrescentando a data de interrupção no ciclo ativo e definindo a variável activeCycleId como "null" ao final de sua execução
  function handleInterruptCycle() {
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

  // Definição de uma variável que recebe sempre o valor atual do input com o name="task". No caso desse código, o name é definido automaticamente com o {... register('task')}, dentro do input
  const task = watch('task')
  const isSubmitDisabled = !task

  // Inicia o retorno da função que cria o componente Home()
  return (
    <HomeContainer>
      {/* a função handleSubmit é desestruturada do hook useForm, e serve pra validar os campos e, caso a validação passe, criar um novo ciclo */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {/* Executa o método .Provider, da criação do contexto. A propriedade "value" recebe um objeto com todos os valores e funções que serão disponibilizados para os componentes filhos através do contexto */}
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            setActiveCycleIdAsNull,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          {/* FormProvider é um componente importado do react-hook-form. Ele serve para fornecer o contexto do formulário aos componentes filhos. Neste caso, estou usando o spread operator {...newCycleForm} para disponibilizar todas as propriedades e métodos do newCycleForm aos componentes filhos. */}
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {/* Operador condicional ternário que verifica se existe algum ciclo ativo. Com isso, define qual botão deve exibir em tela. */}
        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
