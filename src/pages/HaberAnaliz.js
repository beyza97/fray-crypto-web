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
import { GuncelHaberler } from "../components/dashboard/GuncelHaberler";

export const HaberAnaliz = () => {
  const [news, setNews] = useState([]);

  return (
    <div>
      <TotalMarketCap />
      <div style={{  marginTop: "15%" }}>
        <HaberTablo />
        <GuncelHaberler/>
      </div>
    </div>
  );
};