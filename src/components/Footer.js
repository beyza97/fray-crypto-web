import React from 'react';

export const Footer = () => {

    return (
        <div style={{ borderTopStyle: 'solid', borderTopColor: '#616161', width: '90%', marginLeft: '5%', marginTop: 'auto' }} >
            <p style={{ color: '#616161', marginTop: '1em' }}>
                Burada yer alan yatırım bilgi, yorum ve tavsiyeleri yatırım danışmanlığı kapsamında değildir. Yatırım danışmanlığı hizmeti; aracı kurumlar, portföy yönetim şirketleri, yatırım ve kalkınma bankaları ile müşteri arasında imzalanacak yatırım danışmanlığı sözleşmesi çerçevesinde ve yetkili kuruluşlar tarafından kişilerin risk ve getiri tercihleri dikkate alınarak kişiye özel sunulmaktadır. Burada yer alan yorum ve tavsiyeler ise genel niteliktedir. Burada yer alan yorum ve tavsiyeler, mali durumunuz ile risk ve getiri tercihlerinize uygun olmayabilir. Bu nedenle, sadece burada yer alan bilgilere dayanılarak yatırım kararı verilmesi beklentilerinize uygun sonuçlar doğurmayabilir. Gerek bu yayındaki, gerekse bu yayında kullanılan kaynaklardaki hata ve eksikliklerden ve bu yayındaki bilgilerin kullanılması sonucunda yatırımcıların ve/veya ilgili kişilerin uğrayabilecekleri doğrudan ve/veya dolaylı zararlardan, kâr yoksunluğundan, manevi zararlardan ve her ne şekil ve surette olursa olsun üçüncü kişilerin uğrayabileceği her türlü zararlardan dolayı F-Ray Finansal Teknolojiler sorumlu tutulamaz.
            </p>
            <p style={{ color: '#616161' }}>
                BİST hisse verileri, gün sonu verileridir. BİST isim ve logosu “Koruma Marka Belgesi” altında korunmakta olup izinsiz kullanılamaz, iktibas edilemez, değiştirilemez. BİST ismi altında açıklanan tüm bilgilerin telif hakları tamamen BİST’e ait olup,tekrar yayınlanamaz.
            </p>
            <p style={{ color: '#616161' }}>
                Gün sonu kapanış hisse verileri <img src="assets/layout/images/foreks.png" /> tarafından sağlanmaktadır.
            </p>
        </div>
    );
}