import React from "react";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";
import { IoFilter, IoGitCompare } from "react-icons/io5";
import { GiNewspaper } from "react-icons/gi";
import { FaMicroblog } from "react-icons/fa";

import "./Topbar.css";
import transitions from "@material-ui/core/styles/transitions";
export const Topbar = () => {
  const history = useHistory();
  return (
    <>
      <h2 style={{ marginTop: "50px", marginLeft: "5%" }}>Coinleri Keşfet</h2>

      <div className="" /*'dashboard-topbar'*/ style={{ marginLeft: "5%" }}>
        <div className="p-grid" style={{ height: "15%" }}>
          <div className="p-col-4 Template">
            <Button
              onClick={() => history.push("/filtering")}
              style={{
                paddingRight: "20%",
                transitions: "background-position 0.5s ease-out",
                backgroundPosition: "right bottom",
                backgroundImage:"linear-gradient(to right, #2A9473 5%,#33BF93 45%, #3DE4B0 100%"
              }}
              className="filtre p-0 "
            >
              <i className="px-2">
                <IoFilter />
              </i>
              <span className="px-3" style={{ marginLeft: "5%",}}>
                <strong>FİLTRELE</strong>
              </span>
            </Button>
          </div>

          <div className="p-col-4 Template">
            <Button
              onClick={() => history.push("/compare")}
              style={{ paddingRight: "20%",                transitions: "background-position 0.5s ease-out",
                backgroundPosition: "right bottom",
                backgroundImage:"linear-gradient(to right, #2A9473 5%,#33BF93 45%, #3DE4B0 100%" }}
              className="filtre p-0 "
            >
              <i className="px-2">
                <IoGitCompare />
              </i>
              <span className="px-3" style={{ marginLeft: "5%" }}>
                <strong>KIYASLA</strong>
              </span>
            </Button>
          </div>

          <div className="p-col-4 Template">
            <Button
              onClick={() => history.push("/blog")}
              style={{
                paddingRight: "20%",
                transitions: "background-position 0.5s ease-out",
                backgroundPosition: "right bottom",
                backgroundImage:"linear-gradient(to right, #2A9473 5%,#33BF93 45%, #3DE4B0 100%"
              }}
              className="blog p-0 "
            >
              <i className="px-2">
                <FaMicroblog />
              </i>
              <span className="px-3" style={{ marginLeft: "5%" }}>
                <strong>BLOG</strong>
              </span>
            </Button>
          </div>
          {/* <div className="p-col-6" style={{
                    backgroundImage: "linear-gradient(90.15deg, #1F1E1E 3.15%, rgba(23, 23, 23, 0.62) 93.17%), url(assets/layout/images/bitcoin-dot-connected.png)",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    marginTop: '6px'
                }}>
                    { <p style={{ marginTop: '40px', marginRight:'25px' }}>F-Ray ile coinler hakkında </p><p> bilgi edinmek çok basit!</p> }
                </div> */}
        </div>
      </div>
    </>
  );
};
