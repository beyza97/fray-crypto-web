import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Avatar } from "primereact/avatar";
import "./Haber_tab.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ProductService from "../../service/ProductService";
import moment from "moment";
import "moment/locale/tr"; // haber tarih ve saatini tr formatında ayarlıyor
import { Link } from "react-router-dom";

export const BtcGenelBakis = ({ news, tt }) => {
  const [activeIndex1, setActiveIndex1] = useState(1);
  // let datetr[]=moment(news.publication_datetime).format('llll');
  // console.log("datetr ", datetr);

  if (news) {
    news.map(
      (item) => (item.a = moment(item.publication_datetime).format("llll"))
    );
  }
  console.log("news", news);
  console.log("tt- 20 coin ", tt);

  return news ? (
    <div className="card">
    <h5>Closable</h5>
    <TabView>
        <TabPanel header="Header I">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </TabPanel>
        <TabPanel header="Header II" closable>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
        </TabPanel>
        <TabPanel header="Header III" closable>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
            cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
        </TabPanel>
    </TabView>
</div>
  ) : (
    <></>
  );
};
