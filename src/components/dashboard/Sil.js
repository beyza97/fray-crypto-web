import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ToggleButton } from "primereact/togglebutton";
import { CustomerService } from "../../service/CustomerService";
import "./Sil.css";

export const Sil = () => {
  const [customers1, setCustomers1] = useState([]);
  const [customers2, setCustomers2] = useState([]);
  const [customersGrouped, setCustomersGrouped] = useState(null);
  const [lockedCustomers, setLockedCustomers] = useState([]);
  const [unlockedCustomers, setUnlockedCustomers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [balanceFrozen, setBalanceFrozen] = useState(false);
  const customerService = new CustomerService();

    useEffect(() => {setLoading(true);

    customerService.getCustomersLarge().then((data) => {
      setCustomers1(data);
      setLoading(false);
    });
    customerService.getCustomersMedium().then((data) => {
      setCustomers2(data);
    });
    customerService.getCustomersMedium().then((data) => {
      setUnlockedCustomers(data);
    });
    customerService.getCustomersMedium().then((data) => {
      setCustomersGrouped(data);
    });

    setLockedCustomers([
      {
        id: 5135,
        name: "Geraldine Bisset",
        country: {
          name: "France",
          code: "fr",
        },
        company: "Bisset Group",
        status: "proposal",
        date: "2019-05-05",
        activity: 0,
        representative: {
          name: "Amy Elsner",
          image: "amyelsner.png",
        },
      },
    ]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const dialogFooterTemplate = () => {
    return <Button label="Ok" icon="pi pi-check" onClick={closeDialog} />;
  };

  const balanceTemplate1 = (rowData) => {
    return formatCurrency(rowData.balance);
  };

  const balanceTemplate2 = (rowData) => {
    return <span className="font-bold">{formatCurrency(rowData.balance)}</span>;
  };

  const lockTemplate = (rowData, options) => {
    const icon = options.frozenRow ? "pi pi-lock" : "pi pi-lock-open";
    const disabled = options.frozenRow ? false : lockedCustomers.length >= 2;

    return (
      <Button
        type="button"
        icon={icon}
        disabled={disabled}
        className="p-button-sm p-button-text"
        onClick={() => toggleLock(rowData, options.frozenRow, options.rowIndex)}
      />
    );
  };

  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          alt="flag"
          src="/images/flag/flag_placeholder.png"
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          className={`flag flag-${rowData.country.code}`}
          width={30}
        />
        <span className="image-text">{rowData.country.name}</span>
      </React.Fragment>
    );
  };

  const statusTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };

  const headerTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          alt={rowData.representative.name}
          src={`images/avatar/${rowData.representative.image}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width="32"
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">{rowData.representative.name}</span>
      </React.Fragment>
    );
  };

  const footerTemplate = (rowData) => {
    return (
      <td className="font-bold">
        Total Customers: {calculateCustomerTotal(rowData.representative.name)}
      </td>
    );
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const calculateCustomerTotal = (name) => {
    let total = 0;

    if (customersGrouped) {
      for (let customer of customersGrouped) {
        if (customer.representative.name === name) {
          total++;
        }
      }
    }

    return total;
  };

  const toggleLock = (data, frozen, index) => {
    let _lockedCustomers, _unlockedCustomers;

    if (frozen) {
      _lockedCustomers = lockedCustomers.filter((c, i) => i !== index);
      _unlockedCustomers = [...unlockedCustomers, data];
    } else {
      _unlockedCustomers = unlockedCustomers.filter((c, i) => i !== index);
      _lockedCustomers = [...lockedCustomers, data];
    }

    _unlockedCustomers.sort((val1, val2) => {
      return val1.id < val2.id ? -1 : 1;
    });

    setLockedCustomers(_lockedCustomers);
    setUnlockedCustomers(_unlockedCustomers);
  };

  return (
    <div className="datatable-scroll-demo">

      <div className="card">
        <h5>Frozen Rows</h5>
        <DataTable
          value={unlockedCustomers}
          frozenValue={lockedCustomers}
          scrollable
          scrollHeight="400px"
          loading={loading}
        >
          <Column
            field="name"
            header="Name"
            style={{ minWidth: "200px" }}
          ></Column>
          <Column
            field="country.name"
            header="Country"
            style={{ minWidth: "200px" }}
          ></Column>
          <Column
            field="representative.name"
            header="Representative"
            style={{ minWidth: "200px" }}
          ></Column>
          <Column
            field="status"
            header="Status"
            style={{ minWidth: "200px" }}
          ></Column>
          <Column style={{ flex: "0 0 4rem" }} body={lockTemplate}></Column>
        </DataTable>
      </div>

  

    </div>
  );
};
