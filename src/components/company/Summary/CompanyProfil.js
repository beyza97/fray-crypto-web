

export const CompanyProfil = (company) => {
    if (!company?.code)
        return null

    return (
        <div style={{ marginTop: '1%' }}>
            <h2>Şirket Profili</h2>
            <div className="company-profil">
                <div className="p-grid">
                    <div className="p-col-6">
                        <h4>Adres</h4>
                        <p>{company.adres}</p>
                    </div>
                    <div className="p-col-6">
                        <h4>Değer Çarpanı</h4>
                        <p>{company.aciklik}</p>
                    </div>
                    <div className="p-col-6">
                        <h4>Telefon</h4>
                        <p>{company.telefon}</p>
                    </div>
                    <div className="p-col-6">
                        <h4>Sektör</h4>
                        <p>{company.sektor}</p>
                    </div>
                    <div className="p-col-6">
                        <h4>Website</h4>
                        <a>{company.internet}</a>
                    </div>
                    <div className="p-col-6">
                        <h4>Endeksler</h4>
                        <p>{company.endeksler}</p>
                    </div>
                    <div className="p-col-6">
                        <h4>Mail</h4>
                        <p>{company.email}</p>
                    </div>
                    <div className="p-col-6">
                        <h4>Halka Açıklık Oranı</h4>
                        <p>{company.aciklik}</p>
                    </div>
                    <div className="p-col-6">
                        <h4>Konsolidasyon</h4>
                        <p>{company.pazar}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}