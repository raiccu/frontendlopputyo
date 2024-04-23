import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  const [columnDefs] = useState([
    { field: "firstname", filter: true },
    { field: "lastname", filter: true },
    { field: "email", filter: true },
    { field: "phone", filter: true },
  ]);

  useEffect(() => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/customers"
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);

        return response.json();
      })
      .then((responseData) => {
        setCustomers(responseData._embedded.customers);
      });
  }, []);

  console.log(customers);

  return (
    <div>
      <h2>Customers</h2>
      <div className="ag-theme-material" style={{ width: 600, height: 1000 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          rowHeight={50}
        />
      </div>
    </div>
  );
};

export default CustomerList;
