// import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { AutoComplete } from "primereact/autocomplete";
// import { Button } from "primereact/button";
// import classNames from "classnames";
// import AuthContext from "./context/AuthContext";
// import useAxios from "./utils/useAxios";
// import { ColorBox } from "devextreme-react";
// import { Input } from "reactstrap";
// import query from "devextreme/data/query";
// export const BTCMainPage = () => {
//     return (
    
//     <div className="layout-topbar">

//       <div style={{ marginLeft: "5%", marginRight: "5%" }}>
//         {horizontalIcon}

//         <img
//           alt="logo"
//           src="https://f-rayscoring.com/wp-content/uploads/2022/02/Adsiz-tasarim-1.png"
//           className="mobile-logo"
//         />

//         <button
//           type="button"
//           className="p-link menu-btn"
//           onClick={props.onMenuButtonClick}
//         >
//           <i className="pi pi-bars"></i>
//         </button>

//         <button
//           type="button"
//           className="p-link topbar-menu-btn"
//           onClick={props.onTopbarMobileMenuButtonClick}
//         >
//           <i className="pi pi-user"></i>
//         </button>

//         <div className="layout-topbar-menu-wrapper">
//           <ul className={topbarClass}>
//             <li
//               className={classNames("profile-item", {
//                 "active-topmenuitem": props.activeTopbarItem === "profile",
//               })}
//             >
//               <button
//                 type="button"
//                 className="p-link"
//                 onClick={(e) => onTopbarItemClick(e, "profile")}
//               >
//                 <span className="profile-image-wrapper">
//                   <img src="assets/layout/images/avatar.png" alt="avatar" />
//                 </span>
//               </button>
//               <ul className={classNames({ fadeInDown: false })}>
//                 <li role="menuitem">
//                   <button type="button" className="p-link">
//                     <i className="pi pi-user"></i>
//                     <span>Profilim</span>
//                   </button>
//                 </li>
//                 <li role="menuitem">
// 									<button type="button" className="p-link">
// 										<i className="pi pi-lock"></i>
// 										<span>Privacy</span>
// 									</button>
// 								</li>
// 								<li role="menuitem">
// 									<button type="button" className="p-link">
// 										<i className="pi pi-cog"></i>
// 										<span>Settings</span>
// 									</button>
// 								</li>
//                 <li role="menuitem">
//                   <button type="button" className="p-link" onClick={logoutUser}>
//                     <i className="pi pi-sign-out"></i>
//                     <span>Çıkış</span>
//                   </button>
//                 </li>
//               </ul>
//             </li>
//             <div>
//               {/* <Button
//                 label="Anasayfa"
//                 style={{ marginLeft: "40px", top: "-10px" }}
//                 onClick={goDashboard}
//                 className="p-button-plain p-button-lg p-button-text"
//               /> */}
//               <Button
//                 label="BTC"
//                 style={{ marginLeft: "40px", top: "-10px" }}
//                 onClick={() => history.push("/BTCinfo")}
//                 className="p-button-plain p-button-lg p-button-text"
//               />
//               <Button
//                 label="Portal"
//                 style={{ marginLeft: "40px", top: "-10px" }}
//                 onClick={() => history.push("/portal")}
//                 className="p-button-plain p-button-lg p-button-text"
//               />
//               <Button
//                 label="Blog"
//                 style={{ marginLeft: "40px", top: "-10px" }}
//                 onClick={() => history.push("/blog")}
//                 className="p-button-plain p-button-lg p-button-text"
//               />
//               {/* <Button
//                 label="Haberler"
//                 style={{ marginLeft: "40px", top: "-10px" }}
//                 onClick={() => history.push("/news")}
//                 className="p-button-plain p-button-lg p-button-text"
//               />
//               <Button
//                 label="Al/Sat"
//                 style={{ marginLeft: "40px", top: "-10px" }}
//                 onClick={() => history.push("/alarms")}
//                 className="p-button-plain p-button-lg p-button-text"
//               /> */}
//               <Button
//                 label="Profilim"
//                 style={{ left: "40px", top: "-10px" }}
//                 onClick={() => history.push("/profile")}
//                 className="p-button-plain p-button-lg p-button-text"
//               />
              
//             </div>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };


