import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useAxios from '../utils/useAxios';
import { Button } from "primereact/button";
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';
import { TotalMarketCap } from '../components/dashboard/TotalMarketCap';

export const HaberAnaliz = () => {
  const [news,setNews]=useState([]);
  
    return (
      <div className="p-grid">
        <TotalMarketCap/>
      </div>
    )

}