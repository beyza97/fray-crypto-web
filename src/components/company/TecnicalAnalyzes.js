import React from 'react';
import TradingViewWidget, { Themes, BarStyles } from "react-tradingview-widget";

export const TecnicalAnalyzes = ({ code }) => {

    return (
        <div style={{ marginTop: '10px' }}>
            <h2>Teknik Analizler</h2>
            <div className='p-grid' style={{ height: '600px' }}>
                {/* <TradingViewWidget
                    symbol={"BIST:" + (code.split(", ")[1] || code)}
                    theme={Themes.DARK}
                    locale="tr"
                    autosize
                    hide_side_toolbar={false}
                    style={BarStyles.BARS}
                /> */}
            </div>
        </div>
    )
}