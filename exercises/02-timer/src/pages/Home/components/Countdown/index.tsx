import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'

// Importação do contexto
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  // Desestruturação do contexto dos ciclos
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
    setActiveCycleIdAsNull,
  } = useContext(CyclesContext)

  // Declaração de uma variável que verifica se há algum ciclo ativo. Havendo ciclo ativo, converte a quantidade de minutos para segundos
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    /*
      1. Este useEffect configura um intervalo para atualizar o tempo passado de um ciclo ativo a cada segundo.
      2. Se houver um ciclo ativo, ele calcula a diferença em segundos entre a hora atual e a data de início do ciclo.
      3. Se o tempo passado for maior ou igual ao total de segundos do ciclo, marca o ciclo como finalizado, caso contrário, apenas atualiza o tempo decorrido.
      4. Quando o componente é desmontado ou as dependências mudam, o intervalo é limpo para evitar vazamentos de memória.
    */
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          document.title = '02 - Timer'
          setActiveCycleIdAsNull()
          clearInterval(interval)
          setSecondsPassed(totalSeconds)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    setActiveCycleIdAsNull,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0') // padStart() preenche uma string até o número de caracteres desejado
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
