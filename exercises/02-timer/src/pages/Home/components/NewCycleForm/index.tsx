import { useContext } from 'react'
import { FormContainer, TaskInput, MinutesAmountInput } from './styles'

// Importação dos contextos
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  // Início da criação do componente NewCycleForm()
  const { activeCycle } = useContext(CyclesContext)
  // Desestruturação do contexto dos ciclos

  const { register } = useFormContext()
  // Desestruturação do contexto do formulário

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}
        // o register é usado para conectar esse campo de input ao formulário gerenciado pelo react-hook-form. Ele está atribuindo o name="task" a este campo, permitindo a coleta e validação de dados
      />

      <datalist id="task-suggestions">
        <option value="Sugestão 1" />
        <option value="Sugestão 2" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
