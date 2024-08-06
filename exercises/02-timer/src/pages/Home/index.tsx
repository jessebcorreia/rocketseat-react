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
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

const newCycleFormValidationSchema = zod.object({
  // Schema de validação do formulário, utilizando o zod
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ter ao menos 5 minutos')
    .max(60, 'O ciclo não pode ultrapassar 60 minutos'),
})

// Inferência de tipagem, tomando como base a validação do zod
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  // utilização do contexto dos ciclos
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<newCycleFormData>({
    // Declaração de uma variável que recebe como valor a execução do hook useForm(). O hook recebe um objeto de configuração que utiliza o zodResolver para validar o formulário (schema de validação previamente criado). Depois, define os valores padrão para os campos do formulário através da propriedade defaultValues.
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // Desestruturação de alguns métodos do objeto newCycleForm, criado acima
  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  // Definição de uma variável que recebe sempre o valor atual do input com o name="task". No caso desse código, o name é definido automaticamente com o {... register('task')}, dentro do input
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      {/* a função handleSubmit é desestruturada do hook useForm, e serve pra validar os campos e, caso a validação passe, criar um novo ciclo */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        {/* FormProvider é um componente importado do react-hook-form. Ele serve para fornecer o contexto do formulário aos componentes filhos. Neste caso, estou usando o spread operator {...newCycleForm} para disponibilizar todas as propriedades e métodos do newCycleForm aos componentes filhos. */}
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {/* Operador condicional ternário que verifica se existe algum ciclo ativo. Com isso, define qual botão deve exibir em tela. */}
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
