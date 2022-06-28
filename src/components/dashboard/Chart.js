import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";
import React from "react";

export function ModuleTradingView({ fullSize }) {
  const slug = "ss,bbb";
  const color = "dark";
  return (
    <Row>
      <Col>
        <Card>
          <CardBody style={{ height: "550px" }}>
            <TradingViewWidget
              symbol={"BIST:" + (slug.split(", ")[1] || slug)}
              theme={Themes.DARK}
              locale="tr"
              autosize={true}
              height={400}
              hide_side_toolbar={false}
              style={BarStyles.BARS}
              allow_symbol_change={true}
              interval="D"
              toolbar_bg="f1f3f6"
              withdateranges={true}
              save_images={false}
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
