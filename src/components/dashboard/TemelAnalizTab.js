import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { Avatar } from "primereact/avatar";
import "./Haber_tab.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import ProductService from "../../service/ProductService";
import moment from "moment";
import "moment/locale/tr"; // haber tarih ve saatini tr formatında ayarlıyor
import { Link } from "react-router-dom";
import { BtcGenelBakis } from "./BtcGenelBakis";
import "./BtcTabsTable.css";
import { CardBody, CardHeader, Col, Row } from "reactstrap";
import { ModuleTradingView } from "./Chart";
import { Chart } from "primereact/chart";
import useAxios from "../../utils/useAxios";
import { LastComment } from "../LastComment";
export const TemelAnalizTab = () => {
  return (
    <div className="p-grid">
      <div className="p-col-12">
        <div className="card">
          <Card title="Bitcoin (BTC) Nedir?" style={{ marginBottom: "2em" }}>
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Bitcoin (BTC), merkeziyetsiz bir kripto para birimidir. Açık bir
              koddur; şifreli ve anonim kodlarla tanımlanır. Eşler arası (peer
              to peer/P2P) teknolojisini kullandığından, her türlü finansal
              işlemin eşler arasında güvenli bir ortamda kolayca kaydedilmesini
              sağlar.
              <br></br>
              İnternet üzerinden alışveriş bugün neredeyse tamamen, güvenilir
              bir üçüncü taraf olarak elektronik ödemeleri işleyen finansal
              kurumlara bağımlı hale geldi. Bu sistem çoğu işlem için oldukça
              iyi çalışıyor olsa da hala güvene dayalı bir model olmanın
              zayıflığını barındırıyor. Finansal kurumlar ihtilaflarda
              arabuluculuktan kaçamadıklarından tamamen geri dönüşü olmayan
              işlemler gerçekte mümkün değil. Arabuluculuk hizmetinin gideri
              işlem giderlerini yükseltir ve mümkün olan en küçük işlem
              miktarını sınırladığı için küçük ödeme işlemlerini engeller, bunun
              yanında geri döndürülemeyen hizmetler için geri döndürülemeyen
              ödeme alma imkanının olmaması daha da masraflıdır. İşlemi geri
              döndürme ihtimali ile birlikte güvenme ihtiyacı da artar.
              Satıcılar müşterilerine şüpheyle bakmalı ve başka bir durumda
              ihtiyaç duyulabilecek bilgiden fazlasını vermeleri için
              zorlamalıdır. Belli bir oranda dolandırıcılık kaçınılmaz kabul
              edilir. Bu maliyetler ve ödeme belirsizlikleri yüzyüze alışverişte
              fiziksel para kullanımıyla giderilebilir ancak güven duyulan bir
              üçüncü taraf olmadan bir iletişim kanalı üzerinden ödeme
              yapılabilecek bir mekanizma bulunmamaktadır. İhtiyacımız olan
              güven yerine kriptografik kanıta dayalı, iki tarafın üçüncü bir
              güvenilir kişiye gerek duymadan doğrudan birbirleriyle işlem
              yapabileceği bir elektronik ödeme sistemidir. Geri döndürülmesi
              imkansıza yakın işlemler satıcıları dolandırıcılıktan
              koruyacaktır. Alıcıları koruyacak rutin emanetçi mekanizmaları
              kolaylıkla uygulanabilir. Bu makalede eşten-eşe dağıtık bir zaman
              damgası sunucusunun işlemlerin tarihsel sırasını hesaba dayalı
              olarak kanıtlamasını kullanarak mükerrer harcama problemine bir
              çözüm öneriyoruz. Sistem dürüst düğümler topluca saldırgan
              düğümlerden daha fazla CPU gücünü ellerinde bulundurduğu sürece
              güvenlidir.
            </p>
          </Card>
          <Card
            title="Bitcoin (BTC) Altyapısı Nedir?"
            style={{ marginBottom: "2em" }}
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Bitcoin şifrelenmiş işlem takibi sağlayan dağıtık bir veri tabanı
              olan blokzincir teknolojisi üzerine kurulu. Blokzincir
              teknolojisinde kullanıcılar aracısız şekilde ağa bağlanabiliyor,
              yeni işlemler yapabiliyor, işlemleri doğrulayabiliyor ve yeni
              bloklar oluşturabiliyor.
              <br></br>
              Her bir bilginin bloklar halinde, gelişmiş şifreleme
              algoritmalarıyla, birbirine bağlanarak kaydedildiği bu dağıtık
              veri tabanı, bir merkeze veya otoriteye bağlı olmaksızın işlem
              yapabilme imkânı sağlıyor
            </p>
          </Card>
          <Card title="PeertoPeer (P2P) Nedir?" style={{ marginBottom: "2em" }}>
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              P2P (Peer-to-Peer) kelime anlamı ile eşten eşe demektir. Blok
              zincir ağının temel özelliklerinden biri olan P2P; üçüncü bir kişi
              ya da kurumun onayına ihtiyaç duymadan, doğrudan kişiler arasında
              gerçekleştirilen işlemleri ifade etmek için kullanılan bir
              kavramdır. Arada veya merkezde bir devlet, şirket, birey veya
              organizasyon gibi merkezi bir unsura direkt bağlı olmayıp, işlem
              mekanizması bir ağa dağıtılmıştır. Dağıtık ağ yapısı, bir ağ
              üzerindeki birden fazla cihazın birbirleri arasında veri iletişimi
              kurdukları sisteme denir.
            </p>
          </Card>
          <Card
            title="Bitcoin (BTC) Nasıl Çalışır?"
            style={{ marginBottom: "2em" }}
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Bir kripto para birimi, dijital, şifreli ve merkezi olmayan bir
              değişim aracıdır. Yerel para birimlerinin aksine, bir kripto para
              biriminin değerini yöneten ve koruyan merkezi bir otorite yoktur.
              Bunun yerine, bu görevler internet aracılığıyla bir kripto para
              biriminin kullanıcıları arasında geniş çapta dağıtılır.
              <br></br>
              Çoğu insan, hisse senetleri veya değerli metaller gibi diğer
              varlıklarda olduğu gibi kripto para birimlerine yatırım yapsada,
              normal mal ve hizmet satın almak için kriptoyu kullanabilirsiniz.
              Kripto para birimi yeni ve heyecan verici bir varlık sınıfı olsada
              her bir sistemin tam olarak nasıl çalıştığını anlamak için oldukça
              fazla araştırma yapmanız gerektiğinden satın almak riskli
              olabilir.
            </p>
          </Card>
          <Card
            title="Bitcoin (BTC) Arzı Sınırsız Mı?"
            style={{ marginBottom: "2em" }}
          >
            <p className="m-0" style={{ lineHeight: "1.5" }}>
              Bitcoin arzı sınırsız değil, yalnızca 21 milyon adet üretilecek ve
              bu sürecin 2140 yılında tamamlanması öngörülüyor. Ancak şu an
              içinde bulunduğu konum değerlendirildiğinde bu sürenin daha erkene
              çekilme ihtimali görülüyor.
              <br></br>
              Bitcoin’in sınırlı sayıda bir arzının bulunması, altınla
              kıyaslanmasına yol açtı ve talep gören bir yatırım aracı haline
              geldi. Kripto para piyasasının oluşmasında bu etken büyük rol
              oynamaktadır.
            </p>
          </Card>
        </div>
      </div>
      <div className="grid">
      <span></span>
        <LastComment />
      </div>
    </div>
  );
};
