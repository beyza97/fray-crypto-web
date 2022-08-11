import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import classNames from "classnames";
import { ColorBox } from "devextreme-react";
import { Input } from "reactstrap";
import query from "devextreme/data/query";
import { Column } from "primereact/column";
import useAxios from "../utils/useAxios";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { BTCTopbar } from "../components/dashboard/BTCTopbar";
import { UpcomingDividend } from "../components/dashboard/UpcomingDividend";
import { ModuleTradingView } from "../components/dashboard/Chart";
import { Col } from "reactstrap";
import { TechnicalAnalysis } from "../components/dashboard/TechnicalAnalysis";
import { BTCHorizontalAccordion } from "../components/dashboard/BTCHorizontalAccordion";
import { BTCtabs } from "../components/dashboard/BTCtabs";
import { ThousandPanel } from "../components/company/Summary/ThousandPanell";


export const BTCMainPage = () => {
  return (
    <body className="dashboard-body">
      <UpcomingDividend />
      <div className="p-grid" style={{ marginTop: "5%" }}>
      <div className="p-col-12">
      <BTCtabs/>
      </div>
        {/* <div className="p-col-10" style={{ marginLeft: "10%" }}>

          <BTCHorizontalAccordion style={{ marginTop: "40px" }} />


        </div> */}

      </div>

    </body>
  );
};
