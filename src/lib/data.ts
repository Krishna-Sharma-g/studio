export type Account = {
  id: string;
  type: 'Checking' | 'Savings';
  number: string;
  balance: number;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Payment';
  status: 'Completed' | 'Pending' | 'Failed';
  balance: number;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  status: 'Active' | 'Inactive' | 'Frozen';
  joinedDate: string;
};

export const user = {
  name: 'Priya Sharma',
  email: 'priya.sharma@mmbank.com',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export const accounts: Account[] = [
  { id: 'acc_1', type: 'Checking', number: '**** **** **** 1234', balance: 450000.75 },
  { id: 'acc_2', type: 'Savings', number: '**** **** **** 5678', balance: 1250000.50 },
];

export const transactions: Transaction[] = [
  { id: 'txn_1', date: '2024-07-29', description: 'Netflix Subscription', amount: -799, type: 'Payment', status: 'Completed', balance: 450000.75 },
  { id: 'txn_2', date: '2024-07-28', description: 'BigBasket Groceries', amount: -5540.50, type: 'Payment', status: 'Completed', balance: 450799.75 },
  { id: 'txn_3', date: '2024-07-27', description: 'Salary Deposit', amount: 150000.00, type: 'Deposit', status: 'Completed', balance: 456340.25 },
  { id: 'txn_4', date: '2024-07-25', description: 'Transfer to Savings', amount: -50000.00, type: 'Transfer', status: 'Completed', balance: 306340.25 },
  { id: 'txn_5', date: '2024-07-22', description: 'Amazon.in', amount: -8500.00, type: 'Payment', status: 'Completed', balance: 356340.25 },
  { id: 'txn_6', date: '2024-07-20', description: 'Petrol Pump', amount: -3000.00, type: 'Payment', status: 'Completed', balance: 364840.25 },
  { id: 'txn_7', date: '2024-07-18', description: 'ATM Withdrawal', amount: -10000.00, type: 'Withdrawal', status: 'Completed', balance: 367840.25 },
  { id: 'txn_8', date: '2024-07-15', description: 'Dinner at BBQ Nation', amount: -4500.00, type: 'Payment', status: 'Completed', balance: 377840.25 },
];

export const customers: Customer[] = [
  { id: 'cus_1', name: 'Rajesh Kumar', email: 'rajesh.k@example.com', accountNumber: '...7890', status: 'Active', joinedDate: '2023-01-15' },
  { id: 'cus_2', name: 'Sunita Singh', email: 'sunita.s@example.com', accountNumber: '...1234', status: 'Active', joinedDate: '2022-11-20' },
  { id: 'cus_3', name: 'Amit Patel', email: 'amit.p@example.com', accountNumber: '...5678', status: 'Inactive', joinedDate: '2023-05-10' },
  { id: 'cus_4', name: 'Deepika Mehta', email: 'deepika.m@example.com', accountNumber: '...3456', status: 'Active', joinedDate: '2021-08-01' },
  { id: 'cus_5', name: 'Vikram Rao', email: 'vikram.r@example.com', accountNumber: '...9012', status: 'Frozen', joinedDate: '2023-09-25' },
  { id: 'cus_6', name: 'Anjali Gupta', email: 'anjali.g@example.com', accountNumber: '...6789', status: 'Active', joinedDate: '2024-02-18' },
];
