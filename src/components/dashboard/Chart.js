import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";
import React from "react";
import useFetch from "../useFetch";

export function ModuleTradingView({/*tradeinfo,*/ fullSize }) {
  const slug = " ";
  const color = "dark";
  // const [com] = useFetch("/crypto/"+tradeinfo.symbol);
  return (
    <Row>
      <Col>
        <Card>
          <CardBody style={{ height: "700px" }}>
            <TradingViewWidget
              symbol={"BTC" /* + (slug.split(",   ")[1] || slug)*/}
              // slug={tradeinfo.symbol}
              
              theme={Themes.DARK}
              locale="tr"
              autosize
              height={500}
              hide_side_toolbar={false}
              style={BarStyles.BARS}
              allow_symbol_change={true}
              interval="D"
              toolbar_bg="f1f3f6"
              withdateranges={true}
              save_images={true}
              show_popup_button={true}
              popup_width={1000}
              popup_height={650}
              timezone="Etc/UTC"
              range="YTD"
              details={true}
              hotlist={true}
              calendar={true}
              container_id="trandingview_3a71"  

            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}