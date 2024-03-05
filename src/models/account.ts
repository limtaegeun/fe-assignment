export interface Account {
  name: string
  address: string
  phone: string
  email: string
  password: string
  cardNumber: string
}

export type CreateAccountDto = Partial<Account>
