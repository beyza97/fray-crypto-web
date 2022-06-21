export const PackageSelection = () => {






    return (
        <body className="packageSelection-body">
            <div id="pricing">
                <div>
                    <h2>Paketinizi seçin</h2>
                    <div className="p-grid">
                        <div className="p-col-12 p-md-4" style={{ padding: "80px 0" }}>
                            <div className="pricing-box">
                                <div className="pricing-header">
                                    <h3>Aylık Paket</h3>
                                </div>
                                <div className="pricing-content">
                                    <div className="pricing-price">
                                        <h3>65,00 TL</h3>
                                    </div>
                                    <ul>
                                        <li>Tüm özelliklere sınırsız erişim</li>
                                        <li>İlk 2 gün koşulsuz iade garantisi</li>
                                        <li>Ücretsiz Whatsapp destek hattı</li>
                                    </ul>
                                    <button type="button" className="p-button p-component p-button-text-only pink-btn">
                                        <span className="p-button-label">Paketi Seç</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12 p-md-4">
                            <label>En Çok tercih Edİlen</label>
                            <div className="pricing-box" style={{ border: '4px solid #42AE7F' }}>
                                <div className="pricing-header">
                                    <h3>3 Aylık Paket</h3>
                                </div>
                                <div className="pricing-content">
                                    <div className="pricing-price" style={{ height: '80px' }}>
                                        <span className="strikethrough">195,00 TL</span>
                                        <h3 style={{ padding: "15px", margin: '0' }}>169,00 TL</h3>
                                    </div>
                                    <ul>
                                        <li>Tüm özelliklere sınırsız erişim</li>
                                        <li>İlk 2 gün koşulsuz iade garantisi</li>
                                        <li>Ücretsiz Whatsapp destek hattı</li>
                                    </ul>
                                    <button type="button" className="p-button p-component p-button-text-only pink-btn">
                                        <span className="p-button-label">Paketi Seç</span>
                                    </button>
                                </div>
                            </div>
                            <p>Paket seçmeden devam et</p>
                        </div>

                        <div className="p-col-12 p-md-4" style={{ padding: "80px 0" }}>
                            <div className="pricing-box">
                                <div className="pricing-header">
                                    <h3>Yıllık Paket</h3>
                                </div>
                                <div className="pricing-content">
                                    <div className="pricing-price">
                                        <h3>625,00 TL</h3>
                                    </div>
                                    <ul>
                                        <li>Tüm özelliklere sınırsız erişim</li>
                                        <li>İlk 2 gün koşulsuz iade garantisi</li>
                                        <li>Ücretsiz Whatsapp destek hattı</li>
                                    </ul>
                                    <button type="button" className="p-button p-component p-button-text-only pink-btn">
                                        <span className="p-button-label">Paketi Seç</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}