export interface Installment {
  id: number;
  payment_id: number;
  installment: number;
  amount: string;
  payment_date: Date | null;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  birth_date: string;
  cpf: string;
}

export interface PaymentMethod {
  id: number;
  method: string;
  installments: number;
}

export interface PaymentTable {
  id: number;
  student_id: number;
  amount: string;
  payment_method_id: number;
  installments: {
    data: Installment[]; // Wrap installments inside a data object
  };
  student: {
    data: Student; // Wrap student inside a data object
  };
  paymentMethod: {
    data: PaymentMethod; // Wrap payment method inside a data object
  };
}