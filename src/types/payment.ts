export interface Installment {
    id: number;
    number: number;
    amount: number;
  }
  
  export interface Payment {
    id: number;
    student_id: number;
    payment_method_id: number;
    amount: number;
  }
  