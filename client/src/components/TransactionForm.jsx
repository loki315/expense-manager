import React, { useState } from "react";
import { Input, Button, Select, Option } from "@material-tailwind/react";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function TransactionForm({ getTransactions }) {
  const { user, setError } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const addTransaction = async () => {
    let res = await fetch("http://localhost:5000/api/expenses/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        amount,
        category,
        user: user._id,
      }),
    });
    res = await res.json();
    if (res.success) {
      setError({
        err: new Error("Transaction Added"),
        color: "green",
      });
    } else {
      setError({
        err: res,
        color: "red",
      });
    }
    getTransactions();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction();
  };

  return (
    <div className="w-96 bg-yellow-50 drop-shadow-md p-8 rounded-3xl">
      <h3 className="mb-4 text-center">Add Transaction</h3>
      <form>
        <Select label="Select Category" onChange={(val) => setCategory(val)}>
          <Option value="Food">Food</Option>
          <Option value="Transportation">Transportation</Option>
          <Option value="Entertainment">Entertainment</Option>
          <Option value="Other">Other</Option>
        </Select>
        <br />
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Transaction Name"
        />
        <br />
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          label="Transaction Amount"
        />
        <br />
        <Button color="amber" onClick={handleSubmit}>
          Make Transaction
        </Button>
      </form>
    </div>
  );
}

export default TransactionForm;
