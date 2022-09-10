import React from "react";
import {} from "@material-tailwind/react";

function TransactionList({ transactions, getTransactions }) {
  const color = {
    Food: "#EF4444",
    Entertainment: "#3B82F6",
    Transportation: "#10B981",
    Other: "#F59E0B",
  };

  const bgColor = {
    Food: "#FEE2E2",
    Entertainment: "#BFDBFE",
    Transportation: "#C6F6D5",
    Other: "#FEF3C7",
  };

  const deleteTransactions = async (id) => {
    await fetch(
      `https://expense-tracker-rb.herokuapp.com/api/expenses/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    getTransactions();
  };

  return (
    <div className="w-96 max-h-60 overflow-y-auto bg-deep-purple-50 border-deep-purple-500 border-2 shadow-lg shadow-deep-purple-500 px-8 py-6 rounded-3xl">
      <h3 className="mb-4 text-center text-xl font-bold text-deep-purple-500">
        Transaction List
      </h3>
      {transactions.map((transaction) => (
        <div
          className="rounded-lg px-3 py-2 mb-2 flex justify-between"
          style={{
            borderColor: color[transaction.category],
            backgroundColor: bgColor[transaction.category],
            border: `1px solid ${color[transaction.category]}`,
            borderLeft: `4px solid ${color[transaction.category]}`,
          }}
          key={transaction._id}
        >
          <div>{transaction.name}</div>
          <div
            onClick={() => deleteTransactions(transaction._id)}
            className="bg-gray-200 border-gray-400 border px-1 drop-shadow-md cursor-pointer rounded-md text-gray-600"
          >
            &#10006;
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
