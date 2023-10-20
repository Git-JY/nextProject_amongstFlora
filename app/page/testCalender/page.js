"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//var DatePicker = require("react-bootstrap-date-picker");

export default function page() {

    const [startDate, setStartDate] = useState(new Date());
    console.log('startDate: ', startDate);
  return (
    <>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <input type="file"></input>
    </>
  )
}
