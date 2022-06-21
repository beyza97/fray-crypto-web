import React from 'react';
import { Card } from 'primereact/card';
import { v4 as uuidv4 } from 'uuid';


export const BistPanel = ({ bistIndices }) => {

    return (<>
        <div className="p-grid">
            {bistIndices && bistIndices.map((bist) => {
                return (
                    <div className="p-col-4" key={uuidv4()}>
                        <Card title={bist.aciklama}>
                            <div className="p-grid" style={{ marginTop: '-15px' }}>
                                <div className="p-col-10">Dünkü Kapanış:</div>
                                <div className="p-col-2">{bist.dunkukapanis}</div>
                                <div className="p-col-10">Açılış:</div>
                                <div className="p-col-2">{bist.acilis}</div>
                                <div className="p-col-10">Son:</div>
                                <div className="p-col-2">{bist.son}</div>
                            </div>
                        </Card>
                    </div>

                )
            })}

        </div>
    </>);
}