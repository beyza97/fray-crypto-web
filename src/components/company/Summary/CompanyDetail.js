import React, { useEffect, useState } from 'react';
import useAxios from '../../../utils/useAxios';
import { numberFormat } from '../../../helpers/common';
import { Tooltip } from 'primereact/tooltip';

export const CompanyDetail = ({ code }) => {

    const [detail, setDetail] = useState(null)
    const api = useAxios()

    useEffect(() => {
        if (code)
            api.get(`/market/ratios/${code}`).then(res => setDetail(res.data))
    }, [code]);


    return (<>
        {detail &&
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
                    <label >{detail.stockPrice}</label>
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
                    <label >{detail.stockEarning}</label>
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
                    <label >{numberFormat(detail.marketValue)}</label>
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
                    <label >{numberFormat(detail.paidInCapital)}</label>
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
                    <label >{numberFormat(detail.netDebt)}</label>
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
                    <label >{numberFormat(detail.firmValue)}</label>
                </div>
            </div>
        }
    </>
    )
}