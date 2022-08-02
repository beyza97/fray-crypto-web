import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useAxios from "../utils/useAxios";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { useHistory } from "react-router-dom";
import { TotalMarketCap } from "../components/dashboard/TotalMarketCap";
import { HaberTablo } from "../components/dashboard/HaberTablo";

export const HaberAnaliz = () => {
  const [news, setNews] = useState([]);

  return (
    <div className="p-grid">
      <TotalMarketCap />
      <div style={{ marginLeft: "10%", marginTop: "5%" }}>
        <HaberTablo />
      </div>
    </div>
  );
};