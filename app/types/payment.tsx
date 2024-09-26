export interface Installment {
    id: number;
    number: number;
    amount: number;
  }
  
  export interface Payment {
    id: number;
    studentName: string;
    type: 'On Sight' | 'Installment';
    amountPaid: number;
    amount: number;
    date: string;
    installments: Installment[];
  }
  