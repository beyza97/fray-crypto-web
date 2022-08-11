import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import classNames from "classnames";
import { ColorBox } from "devextreme-react";
import { Input } from "reactstrap";
import query from "devextreme/data/query";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";
import { TradingViewEmbed, widgetType,TICKER_TAPE } from "react-typescript-tradingview-embed";


export const BTCTopbar=() => {
    return (
        
        <Row>
          <Col>
            <Card>
              <CardBody style={{ height: "700px" }}>
    
          {/* <TradingViewEmbed
          widgetType={widgetType.TICKER_TAPE}
          widgetConfig={{
          showSymbolLogo: true,
          isTransparent: true,
          displayMode: "adaptive",
          colorTheme: "dark",
          autosize: true,
          symbols: [
            {
              proName: "BITSTAMP:ETHUSD",
              title: "ETH/USD"
            },
            {
              proName: "BITSTAMP:BTCUSD",
              title: "BTC/USD"
            },
            {
              proName: "BINANCE:BNBUSDT",
              title: "BNB/USDT"
            },
            {
              proName: "BINANCE:ADAUSD",
              title: "ADA/USD"
            },
            {
              proName: "BINANCE:DOTUSDT",
              title: "DOT/USDT"
            },
            {
              proName: "UNISWAP:UNIUSDT",
              title: "UNI/USDT"
            }
          ]
        }}
      /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
};
