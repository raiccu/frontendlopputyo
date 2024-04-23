import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchTraining(), []);

  const fetchTraining = () => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings"
    )
      .then((response) => response.json())
      .then((trainingsData) => {
        const trainingsCustomers = [];

        const fetchCustomer = (training) => {
          fetch(training._links.customer.href)
            .then((response) => response.json())
            .then((customerData) => {
              const customerName = `${customerData.firstname} ${customerData.lastname}`;

              const trainingCustomer = {
                ...training,
                customerName: customerName,
              };

              trainingsCustomers.push(trainingCustomer);

              if (
                trainingsCustomers.length ===
                trainingsData._embedded.trainings.length
              ) {
                setTrainings(trainingsCustomers);
              }
            });
        };

        trainingsData._embedded.trainings.forEach(fetchCustomer);
      });
  };

  const [columnDefs] = useState([
    {
      field: "date",
      filter: true,
      valueFormatter: (params) =>
        params.data.date ? dayjs(params.data.date).toDate() : null,
    },
    { field: "activity", filter: true },
    { field: "duration", filter: true },
    {
      headerName: "Customer",
      field: "customerName",
      filter: true,
    },
  ]);

  return (
    <div>
      <h2>Trainings</h2>
      <div className="ag-theme-material" style={{ width: 600, height: 1000 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          rowHeight={50}
        />
      </div>
    </div>
  );
};

export default TrainingList;
