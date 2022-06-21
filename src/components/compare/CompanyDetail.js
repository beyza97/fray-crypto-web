import React, { useEffect, useState } from 'react';
import useAxios from '../../utils/useAxios';
import { numberFormat } from '../../helpers/common';
import { Tooltip } from 'primereact/tooltip';

export const CompanyDetail = ({ code, code2 }) => {

    const [detail, setDetail] = useState(null)
    const [detail2, setDetail2] = useState(null)
    const api = useAxios()

    useEffect(() => {
        if (code)
            api.get(`/market/ratios/${code}`).then(res => setDetail(res.data))
    }, [code]);

    useEffect(() => {
        if (code2)
            api.get(`/market/ratios/${code2}`).then(res => setDetail2(res.data))
    }, [code2]);

    return (<>
        {detail && detail2 &&
            <div>
                <h2>Şirket Detayları</h2>
                <div className="custom-card" style={{ marginTop: '10px', padding: '5%' }}>
                    <Tooltip target=".pi" />
                    <p>Hisse Fiyatı
                        <i className="pi pi-info-circle"
                            data-pr-tooltip="Önceki gün sonu kapanış fiyatıdır."
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }}
                        />
                    </p>
                    <label style={{color:'#B3B1FF'}}>{detail.stockPrice}</label>
                    <label>vs</label>
                    <label style={{color:'#E4CB44'}}>{detail2.stockPrice}</label>
                    <hr />
                    <p>Hisse Başına Kar
                        <i className="pi pi-info-circle"
                            data-pr-tooltip="Yıllıklandırılmış net karın toplam hisse sayısına bölünmesiyle bulunan hisse başına kar, 
                                    şirketin her bir hissesine düşen net kar miktarını vermektedir. Toplam hisse sayısı, 
                                    her payın nominal değerinin 1 TL olduğu yaklaşımıyla ödenmiş sermaye ile hesaplanmaktadır."
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }} />
                    </p>
                    <label style={{color:'#B3B1FF'}}>{detail.stockEarning}</label>
                    <label>vs</label>
                    <label style={{color:'#E4CB44'}}>{detail2.stockEarning}</label>
                    <hr />
                    <p>Piyasa Değeri
                        <i className="pi pi-info-circle"
                            data-pr-tooltip="Kabaca şirketin piyasadaki değerini göstermektedir. Hisse sayısı ile hisse fiyatı çarpılarak elde edilir. 
                                        Hisse sayısı ise her pay 1 TL nominal değere karşılık geleceği varsayımı ile ödenmiş sermaye olarak kullanılabilir."
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }} />
                    </p>
                    <label style={{color:'#B3B1FF'}}>{numberFormat(detail.marketValue)}</label>
                    <label>vs</label>
                    <label style={{color:'#E4CB44'}}>{numberFormat(detail2.marketValue)}</label>
                    <hr />
                    <p>Ödenmiş Sermaye
                        <i className="pi pi-info-circle"
                            data-pr-tooltip="Ortaklarca taahhüt edilen sermayenin nakden ödenmiş kısmıdır. 
                        1 adet hissenin 1TL nominal değere sahip olduğu yaklaşımıyla ödenmiş sermaye hisse sayısı olarak da kullanılabilir."
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }} />
                    </p>
                    <label style={{color:'#B3B1FF'}}>{numberFormat(detail.paidInCapital)}</label>
                    <label>vs</label>
                    <label style={{color:'#E4CB44'}}>{numberFormat(detail2.paidInCapital)}</label>
                    <hr />
                    <p>Net Borç
                        <i className="pi pi-info-circle"
                            data-pr-tooltip="Firmanın kısa ve uzun vadeli toplam finansal borcundan nakit ve nakit benzerlerinin çıkartılması sonucu bulunan borç miktarıdır. 
                        Şirketin reel borç düzeyini gösterir."
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }} />
                    </p>
                    <label style={{color:'#B3B1FF'}}>{numberFormat(detail.netDebt)}</label>
                    <label>vs</label>
                    <label style={{color:'#E4CB44'}}>{numberFormat(detail2.netDebt)}</label>
                    <hr />
                    <p>Firma Değeri
                        <i className="pi pi-info-circle"
                            data-pr-tooltip="Piyasa değerine net borç eklenmesi ile bulunan değerdir. Özellikle şirket değeri ile satış ve FAVÖK kıyaslanabilmesi için hesaplanır. 
                        Çünkü satışların finansmanında özkaynaklar kadar borçlar da kullanılmaktadır."
                            data-pr-position="right"
                            data-pr-at="right+5 top"
                            data-pr-my="left center-2"
                            style={{ fontSize: '1rem', padding: '1%', cursor: 'pointer' }} />
                    </p>
                    <label style={{color:'#B3B1FF'}}>{numberFormat(detail.firmValue)}</label>
                    <label>vs</label>
                    <label style={{color:'#E4CB44'}}>{numberFormat(detail2.firmValue)}</label>
                </div>
            </div>
        }
    </>
    )
}