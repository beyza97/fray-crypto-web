import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { Button } from "primereact/button";
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { MultiSelect } from 'primereact/multiselect';

const defInput = {
    name: '',
    content: '',
    categories: null,
    tags: null,
    featured_image: null
}

export const BlogCreate = () => {
    const [input, setInput] = useState(defInput)
    const [blogCategory, setBlogCategory] = useState([])
    const [blogTag, setBlogTag] = useState([])
    const [file, setFile] = useState(null)
    let api = useAxios();

    useEffect(() => {
        api.get('/blog-category').then(res => setBlogCategory(res.data.data))
        api.get('/blog-tag').then(res => setBlogTag(res.data.data))
    }, [])

    const handleChange = (prop, value) => {
        let _input = { ...input };
        _input[`${prop}`] = value;
        defInput[`${prop}`] = value;
        setInput(_input);
    }

    const create = async () => {
        const formFileData = new FormData()
        formFileData.append('file', file)
        const response = await api.put(`/file/upload`, formFileData, { headers: { 'content-type': 'image/jpeg' } });
        let req = input
        req.featured_image = response.data
        if (req.name !== '' && req.content !== '') {
            const postRes = await api.put('/post', req)
        }
    }

    const invoiceUploadHandler = ({ files }) => {
        const [file] = files;
        setFile(file)
    };

    const headerTemplate = (options) => {
        const { className, chooseButton } = options;
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
            </div>
        );
    }

    const emptyTemplate = () => {
        return (
            <div style={{ textAlign: 'center', color: '#42AE7F', marginTop: '7%' }}>
                <span >Görsel seçin veya sürükleyin...</span>
            </div>
        )
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    return (
        <div style={{ width: '80%', marginLeft: '5%', marginTop: '1%' }}>
            <h2>Yeni Yazı</h2>
            <div className='p-grid'>
                <div className='p-col-8'>
                    <InputText placeholder='Yazı ismi' id="name" style={{ width: '100%' }} value={input.name} onChange={(e) => handleChange("name", e.target.value)} />
                </div>
                <div className='p-col-4'>
                    <Button className="p-button-lg" label="Yayınla" onClick={() => create()} style={{ width: '100%' }} />
                </div>
                <div className='p-col-8'>
                    <Editor style={{ minHeight: '320px' }} id="content" value={input.content} onTextChange={(e) => handleChange("content", e.htmlValue)} />
                </div>
                <div className='p-col-4'>
                    <div className='p-col-12'>
                        <h4>Ayarlar</h4>
                    </div>
                    <div className='p-col-12'>
                        <MultiSelect value={input.categories} style={{ width: '100%' }} options={blogCategory} onChange={(e) => handleChange("categories", e.value)} optionLabel="name" placeholder="Yazı kategorisi" display="chip" />
                    </div>
                    <div className='p-col-12'>
                        <MultiSelect value={input.tags} style={{ width: '100%' }} options={blogTag} onChange={(e) => handleChange("tags", e.value)} optionLabel="name" placeholder="Etiketler" display="chip" />
                    </div>
                    <div className='p-col-12'>
                        <h4>Yazı Görseli</h4>
                    </div>
                    <div className='p-col-12 custom-card'>
                        <p>Sadece .jpg ve .png dosyaları kabul edilir. Maksimum 500kb dosya boyutu kabul edilir</p>
                        <FileUpload
                            name="File"
                            multiple
                            accept="image/*"
                            maxFileSize={1000000}
                            customUpload={true}
                            auto
                            headerTemplate={headerTemplate}
                            uploadHandler={invoiceUploadHandler}
                            emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} />
                    </div>
                </div>
            </div>
        </div>
    )

}