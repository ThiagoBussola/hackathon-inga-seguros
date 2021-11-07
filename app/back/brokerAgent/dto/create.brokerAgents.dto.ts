export interface CreateBrokerAgentDto {
  email: string
  password: string
  name?: string
  broker: string
  cellPhone?: string
  cpf?: number
  cep?: number
  address?: string
}
