import React from "react";
import { Button } from "primereact/button";
import { useHistory } from "react-router-dom";

export const Topbar = () => {
  const history = useHistory();
  return (
    <>
      <h2 style={{ marginTop: "50px", marginLeft: "5%" }}>Coinleri Keşfet</h2>

      <div className="" /*'dashboard-topbar'*/ style={{ marginLeft: "5%" }}>
        <div className="p-grid" style={{ height: "15%" }}>
          <div className="p-col-4">
            <Button
              onClick={() => history.push("/filtering")}
              style={{
                // backgroundImage: "url(assets/layout/images/filter.png)",
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "10% 10%",
                paddingRight: "20%",
              }}
              className="p-button-lg"
              label="Filtrele"
            />
          </div>
          <div className="p-col-4">
            <Button
              onClick={() => history.push("/compare")}
              style={{
                // backgroundImage: "url(assets/layout/images/before-after.png)",
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "10% 10%",
                paddingRight: "20%",
              }}
              className="p-button-lg"
              label="Kıyasla"
            />
          </div>

          <div className="p-col-4">
            <Button
              onClick={() => history.push("/blog")}
              style={{
                // backgroundImage: "url(assets/layout/images/star.png)",
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "10% 10%",
                paddingRight: "20%",
              }}
              className="p-button-lg"
              label="Blog"
            />
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
