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
    await fetch(`http://localhost:5000/api/expenses/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getTransactions();
  };

  return (
    <div className="w-96 max-h-80 overflow-y-auto bg-yellow-100 drop-shadow-md p-8 rounded-3xl">
      <h3 className="mb-4 text-center">Transaction List</h3>
      {transactions.map((transaction) => (
        <div
          className="border-l-4 rounded-lg p-3 mb-2 flex justify-between"
          style={{
            borderColor: color[transaction.category],
            backgroundColor: bgColor[transaction.category],
          }}
          key={transaction._id}
        >
          <div>{transaction.name}</div>
          <div
            onClick={() => deleteTransactions(transaction._id)}
            className="bg-gray-200 px-1 drop-shadow-md cursor-pointer rounded-md text-gray-600"
          >
            &#10006;
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
