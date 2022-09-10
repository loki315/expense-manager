import React, { useState, useEffect, useCallback } from "react";
import TransactionForm from "../../components/TransactionForm";
import TransactionList from "../../components/TransactionList";
import Graph from "../../components/Graph";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
// styles

function Home() {
  const colors = {
    Food: "#EF4444",
    Transportation: "#10B981",
    Entertainment: "#3B82F6",
    Other: "#F59E0B",
  };
  const { user } = useContext(AuthContext);
  const [dataObj, setDataObj] = useState(null);
  const [config, setConfig] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const getGraphData = useCallback(async () => {
    let res = await fetch(
      `http://localhost:5000/api/expenses/getAll/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res = await res.json();

    const total = res.data.docs.reduce((acc, curr) => acc + curr.amount, 0);

    setDataObj(
      res.data.docs.map((item) => ({
        color: colors[item.category],
        ...item,
        percent: Math.trunc((item.amount / total) * 100),
      }))
    );
  }, [user._id]);

  useEffect(() => {
    if (dataObj) {
      setConfig({
        data: {
          datasets: [
            {
              data: dataObj.map((item) => item.amount),
              backgroundColor: dataObj.map((item) => item.color),
              hoverOffset: 4,
              borderRadius: 30,
              spacing: 10,
            },
          ],
        },
        options: {
          cutout: 115,
        },
      });
    }
  }, [dataObj]);

  const getTransactions = useCallback(async () => {
    let res = await fetch(
      `http://localhost:5000/api/expenses/getOne/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res = await res.json();
    setTransactions(res.data.data);
    getGraphData();
  }, [getGraphData, user._id]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <div className="flex mx-16 my-6">
      <div className="w-full">
        <Graph config={config} dataObj={dataObj} />
      </div>
      <div className="flex flex-col gap-5">
        <TransactionForm getTransactions={getTransactions} />
        <TransactionList
          transactions={transactions}
          getTransactions={getTransactions}
        />
      </div>
    </div>
  );
}

export default Home;
