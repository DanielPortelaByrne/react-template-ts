import { useEffect, useState } from "react";
interface Expense {
  amount: number;
  category: string;
  date: string;
  description: string;
  id: number;
  merchant: string;
  status: string;
}

function App() {
  const [expenses, setExpenses] = useState<null | Expense[]>([]);

  async function fetchExpenses() {
    const response = await fetch(
      "https://expenses-backend-mu.vercel.app/expenses",
      {
        headers: {
          "Content-Type": "application/json",
          Username: "daniel.portelabyrne", // <--- Make sure you change this
        },
      }
    );
    const data: Expense[] = await response.json();
    setExpenses(data);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  console.log(expenses);

  return (
    <div className="table-container">
      <div className="header-border">
        {" "}
        <h1>Expenses</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          {expenses?.map((expense) => (
            <tr key={expense.id}>
              <td>{formatDate(expense.date)}</td>
              <td>{expense.merchant}</td>
              <td>£{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

//If I had more time I would work a lot more with the UI to make it cleaner and more appealing to an end user with good font selection, on hover animations and
// a brand identifying colour palette/scheme
