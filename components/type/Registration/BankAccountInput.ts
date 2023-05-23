export interface BankAccountInput {
  name: string;
  code: string;
  swift_code: string;
  accountNumber: string;
}

export interface Bank {
  name: string;
  code: string;
  swift_code: string;
}
