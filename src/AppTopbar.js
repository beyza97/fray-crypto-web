import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import classNames from "classnames";
import AuthContext from "./context/AuthContext";
import useAxios from "./utils/useAxios";
import { ColorBox } from "devextreme-react";
import useFetch from "./components/useFetch";
import { Input } from "reactstrap";
import query from "devextreme/data/query";
import AppLeftBar from './AppLeftBar';

<div>
<AppLeftBar/>
</div>

const AppTopbar = (props) => {
  const [Coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState(null);
  const [filteredCoins, setFilteredCoins] = useState(null);
  const history = useHistory();

  let { logoutUser } = useContext(AuthContext);
  let api = useAxios();

  const goDashboard = () => {
    history.push("/");
  };

  const searchCoins = async (event) => {
    let _filteredCoins;
    let filtered;
    if (!event.query.trim().length) {
      _filteredCoins = [...Coins];
    } else {
      _filteredCoins = await (
        await api.get("/crypto/coin/all?languageCode=en")
      )?.data;
    }
    _filteredCoins.filter((data) => {
      const dataName = data.name;
      return dataName.includes(query);
    });
    setFilteredCoins(
      _filteredCoins.filter((item) => {
        // item.name === "ProxyNode" && console.log(event.query, item.name);
        return item.name
          .toLowerCase()
          .includes(event.query.trim().toLowerCase());
      })
    );
  };

  const onTopbarItemClick = (event, item) => {
    if (props.onTopbarItemClick) {
      props.onTopbarItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };

  const itemTemplate = (item) => {
    return (
      <div>
        {item.code} {item.name}
      </div>
    );
  };

  let topbarClass = classNames("topbar-menu fadeInDown", {
    "topbar-menu-active": props.topbarMenuActive,
  });
  let horizontalIcon = props.layoutMode === "horizontal" && (
    <button type="button" className="p-link topbar-logo" onClick={goDashboard}>
      <img
        alt="logo"
        style={{ height: "45px", marginTop: "4px" }}
        src="https://f-rayscoring.com/wp-content/uploads/2022/02/Adsiz-tasarim-1.png"
      />
    </button>
  );
  // <div class="p-col-12 p-md-4">
  // <a href="anasayfa linki gelecek">

  // 	<img src="https://f-rayscoring.com/wp-content/uploads/2022/02/Adsiz-tasarim-1.png" class="footer-logo"></a>
  // <!-- <img src="../layout/images/logo-slim.png" class="footer-logo" /> -->

  // <div>
  
  // yatay topbar 


  return (

    <div className="layout-topbar">
    <div>
      <AppLeftBar/> 
    </div>
      <div style={{ marginLeft: "5%", marginRight: "5%" }}>
        {horizontalIcon}

        <img
          alt="logo"
          src="https://f-rayscoring.com/wp-content/uploads/2022/02/Adsiz-tasarim-1.png"
          className="mobile-logo"
        />

        <button
          type="button"
          className="p-link menu-btn"
          onClick={props.onMenuButtonClick}
        >
          <i className="pi pi-bars"></i>
        </button>

        <button
          type="button"
          className="p-link topbar-menu-btn"
          onClick={props.onTopbarMobileMenuButtonClick}
        >
          <i className="pi pi-user"></i>
        </button>

        <div className="layout-topbar-menu-wrapper">
          <ul className={topbarClass}>
            <li
              className={classNames("profile-item", {
                "active-topmenuitem": props.activeTopbarItem === "profile",
              })}
            >
              <button
                type="button"
                className="p-link"
                onClick={(e) => onTopbarItemClick(e, "profile")}
              >
                <span className="profile-image-wrapper">
                  <img src="assets/layout/images/avatar.png" alt="avatar" />
                </span>
              </button>
              <ul className={classNames({ fadeInDown: false })}>
                <li role="menuitem">
                  <button type="button" className="p-link">
                    <i className="pi pi-user"></i>
                    <span>Profilim</span>
                  </button>
                </li>
                <li role="menuitem">
									<button type="button" className="p-link">
										<i className="pi pi-lock"></i>
										<span>Privacy</span>
									</button>
								</li>
								<li role="menuitem">
									<button type="button" className="p-link">
										<i className="pi pi-cog"></i>
										<span>Settings</span>
									</button>
								</li>
                <li role="menuitem">
                  <button type="button" className="p-link" onClick={logoutUser}>
                    <i className="pi pi-sign-out"></i>
                    <span>Çıkış</span>
                  </button>
                </li>
              </ul>
            </li>
            <div>
              {/* <Button
                label="Anasayfa"
                style={{ marginLeft: "40px", top: "-10px" }}
                onClick={goDashboard}
                className="p-button-plain p-button-lg p-button-text"
              /> */}
              {/* <Button
                label="Tüm Coinler"
                style={{ marginLeft: "40px", top: "-10px" }}
                onClick={() => history.push("/allCoins")}
                className="p-button-plain p-button-lg p-button-text"
              /> */}
              <Button
                label="Portal"
                style={{ marginLeft: "40px", top: "-10px" }}
                onClick={() => history.push("/portal")}
                className="p-button-plain p-button-lg p-button-text"
              />
              <Button
                label="Blog"
                style={{ marginLeft: "40px", top: "-10px" }}
                onClick={() => history.push("/blog")}
                className="p-button-plain p-button-lg p-button-text"
              />
              {/* <Button
                label="Haberler"
                style={{ marginLeft: "40px", top: "-10px" }}
                onClick={() => history.push("/news")}
                className="p-button-plain p-button-lg p-button-text"
              />
              <Button
                label="Al/Sat"
                style={{ marginLeft: "40px", top: "-10px" }}
                onClick={() => history.push("/alarms")}
                className="p-button-plain p-button-lg p-button-text"
              /> */}
              <Button
                label="Profilim"
                style={{ left: "40px", top: "-10px" }}
                onClick={() => history.push("/profile")}
                className="p-button-plain p-button-lg p-button-text"
              />
              <AutoComplete
                style={{ left: "45%", top: "-5px", right: "2%" }}
                size={30}
                placeholder="Coinler içinde ara..."
                value={selectedCoins}
                suggestions={filteredCoins}
                completeMethod={searchCoins}
                field="name"
                forceSelection
                itemTemplate={itemTemplate}
                onSelect={(e) => history.push(`/crypto/coin/${e.value.code}`)}
                onChange={(e) => setSelectedCoins(e.value)}
              />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppTopbar;
