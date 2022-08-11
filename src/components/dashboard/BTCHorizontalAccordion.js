import React from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import './HorizontalAccordion.css';
import { ModuleTradingView } from './Chart';
import { TechnicalAnalysis } from './TechnicalAnalysis';
import { Top10Coins } from './Top10Coins';
import { BTCtabs } from './BTCtabs';

export const BTCHorizontalAccordion = () => (
  <div>
  <BTCtabs/>
    <h1 style={{marginLeft:"10%"}}></h1>
    <Accordion atomic={true} style={{}}>

      <AccordionItem title="Genel Bakış">
        <div className="p-grid" style={{marginTop:"5%",marginBottom:"5%"}}>
            <div className="p-col-6">
                <Top10Coins/>
             </div>
             <div className="p-col-6">
                <Top10Coins/>
             </div>
        </div>
      </AccordionItem>

      <AccordionItem title="Temel Analiz">
        <div style={{marginTop:"10px", marginLeft:"10px", color:"#fff"}}>
             
            BitCoin'e ait temel analiz tablosu en güncel haliyle sunulmaktadır.
          
        </div>
        <div className="p-col-11" style={{marginTop:"5%",marginBottom:"5%"}}>
        <ModuleTradingView/>
        </div>
      </AccordionItem>

      <AccordionItem title="Teknik Analiz">
        <div style={{marginTop:"10px", marginLeft:"10px", color:"#fff"}}>
             
             BitCoin'e ait teknik analiz tablosu RSI ve ROC verileri ile sunulmaktadır.
           
        </div>
        <div className="p-col-11" style={{marginTop:"5%",marginBottom:"5%"}}>
            <TechnicalAnalysis/>
        </div>
      </AccordionItem>

      <AccordionItem title="Haber Analizi">
        <DummyContent />
      </AccordionItem>
      
      <AccordionItem title="Isı Haritası">
        <DummyContent />
      </AccordionItem>

    </Accordion>
  </div>
  
);

const DummyContent = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);

