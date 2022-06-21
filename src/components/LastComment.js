import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import { v4 as uuidv4 } from 'uuid';


export const LastComment = () => {

    const [comments, setComments] = useState([]);
    let api = useAxios();
    useEffect(() => {
        api.get('/post?aktif=1&page=1&itemPerPage=4&query=&sort=id&desc=true').then(res => setComments(res.data.data))
    }, []);

    return (
        <>
            {
                comments &&
                <>
                    <h2>Son yazılar</h2>
                    <div className="p-grid">
                        {comments.map((comment) => {
                            return (
                                <div className="p-col-3" key={uuidv4()}>
                                    <div className="p-grid">
                                        <div className="p-col-12"> {comment.featured_image && (
                                            <img
                                                src={comment.featured_image.access_url}
                                                alt={comment.name}
                                                width="100px"
                                            />
                                        )}</div>
                                        <div className="p-col-12" style={{ color: '#FCFCFC', opacity: '0.5' }}>{new Date(comment.updated_at).toLocaleDateString()}</div>
                                        <div className="p-col-12" style={{ color: '#FCFCFC' }}>{comment.name}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </>



    )
}