import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { Button } from "primereact/button";
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';

export const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null)
    let api = useAxios();

    useEffect(() => {
        if (id) {
            api.get(`/post/${id}`).then(res => {
                setBlog(res.data)
            })
        }
    }, [id])

    return (
        <>
            {blog &&
                <div style={{ marginTop: '1%' }}>
                    <div className="p-col-12">
                        <Link style={{ color: '#ffffff', opacity: '0.5', textDecoration: 'none' }} to='/blog'>Blog </Link>
                        <a style={{ color: '#ffffff', marginLeft: '0.5%' }}>{'>'} &nbsp; Yazı detayı</a>
                    </div>
                    <h2>{blog.name}</h2>
                    <h6 style={{ opacity: '0.5' }}>Yayınlanma tarihi: {new Date(blog.published_at).toLocaleDateString()}</h6>
                    <Message style={{ width: '100%', marginTop: '1%' }} severity="warn" content={(
                        <React.Fragment>
                            <i className="pi pi-info-circle" style={{ color: '#D0FF49' }} />&nbsp;
                            <label>Yazılarda yer alan analiz ve görüşler tamamen yazarın kişisel yorum ve görüşlerini yansıtmakta olup, sizin risk ve getiri tercihlerinizle uyumlu olmayabilir, gerçeği yansıtmayabilir ve yatırım danışmanlığı kapsamında değildir. Yazılarda yer alan bilgiler yazarın şahsi görüşleri olup F-Ray Finansal Teknolojiler ile hiçbir ilgisi bulunmamaktadır.</label>
                        </React.Fragment>
                    )} />
                    <div style={{ marginTop: '1%' }} dangerouslySetInnerHTML={{ __html: blog.content }} />
                    <Message style={{ width: '100%', marginTop: '1%' }} severity="warn" content={(
                        <React.Fragment>
                            <i className="pi pi-info-circle" style={{ color: '#D0FF49' }} />&nbsp;
                            <label>Yazılarda yer alan analiz ve görüşler tamamen yazarın kişisel yorum ve görüşlerini yansıtmakta olup, sizin risk ve getiri tercihlerinizle uyumlu olmayabilir, gerçeği yansıtmayabilir ve yatırım danışmanlığı kapsamında değildir. Yazılarda yer alan bilgiler yazarın şahsi görüşleri olup F-Ray Finansal Teknolojiler ile hiçbir ilgisi bulunmamaktadır.</label>
                        </React.Fragment>
                    )} />
                </div>
            }
        </>
    )

}