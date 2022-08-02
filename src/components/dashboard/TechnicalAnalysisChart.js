import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import TradingViewWidget , { Themes, BarStyles } from "react-tradingview-widget";
import React from "react";
export function TechnicalAnalysis({fullSize}){
    const slug="a,abc,d";
    const color="dark";

return(
    <Row>
        <Col>
            <Card>
                <CardBody  style={{ height: "600px" }}>
                    {/* <TradingViewWidget 
                        symbol={"BIST:" + (slug.split(", ")[1] || slug)}
                        theme={Themes.DARK}
                        locale="tr"
                        autosize={true}
                        height={600}
                        hide_side_toolbar={false}
                        style={1}
                        allow_symbol_change={true}
                        interval="D"
                        toolbar_bg="f1f3f6"
                        withdateranges={true}
                        save_images={false}
                        studies={["ROC@tv-basicstudies","StochasticRSI@tv-basicstudies","MASimple@tv-basicstudies"]}
                        show_popup_button={true}
                        popup_width={1000}
                        popup_height={650}
                        
                    /> */}
                </CardBody>
            </Card>
        </Col>
    </Row>
)
}
