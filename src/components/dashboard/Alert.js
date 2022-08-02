import React from 'react';
import {Alert} from "reactstrap";

export function CoinAlert() {

    return <Alert color="secondary" style={{color:"#fff"}}>
        <i className="fas fa-spinner fa-spin mr-2"/>
        Coin Bilgileri Yüklenmektedir...
    </Alert>;
}