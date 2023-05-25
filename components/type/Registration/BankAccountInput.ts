export interface BankAccountInput {
  name: string;
  code: string;
  swiftCode: string;
  accountNumber: string;
}

export interface Bank {
  name: string;
  code: string;
  swiftCode: string;
}
