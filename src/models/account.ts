export interface Account {
  name: string
  addr1: string
  addr2: string
  phone: string
  email: string
  password: string
  cardNumber: string
}

export type CreateAccountDto = Partial<Account>
