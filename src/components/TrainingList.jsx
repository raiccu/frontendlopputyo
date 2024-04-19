import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch(
      "https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings"
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);

        return response.json();
      })
      .then((responseData) => {
        setTrainings(responseData._embedded.trainings);
      });
  }, []);

  const getCustomerInfo = async (url) =>{
    const CustomerInfo = ({url}) =>{
      const [customerInfo, setCustomerInfo] = useState("");
  
      useEffect(()=>{
        getCustomerInfo(url);
      }, [url]);
  
      const getCustomerInfo = async (url) => {
        try {
          const info = await fetch(url);
          const data = await info.json();
          setCustomerInfo(`${data.firstname} ${data.lastname}`);
        } catch (err) {
          console.error("Error fetching customer info: " + err); 
        }
      };

      CustomerInfo();
  
      return customerInfo;
    };
  }

  const [columnDefs] = useState([
    {field: "date", filter: true, valueFormatter: params => params.data.date ? dayjs(params.data.date).toDate() : null  },
    {field: "activity", filter: true },
    {field: "duration", filter: true },
    {field: "customer", filter: true, valueGetter: getCustomerInfo },
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
