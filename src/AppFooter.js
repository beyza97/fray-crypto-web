import React from 'react';
import { Link } from 'react-router-dom';

const AppFooter = () => {

    return (
        <div className="layout-footer clearfix">
            <div className='p-grid' style={{ marginLeft: '8%' }}>
                <div className="p-col-12">
                    <span className="footer-text-left" >
                        <span style={{ color: 'white' }}>F-Ray Financial Technologies © 2022. All rights reserved.</span>
                    </span>
                </div>
                <div className="p-col-12">
                    <a href='https://f-rayscoring.com/sorumluluk-reddi-beyani/' target="_blank">Sorumluluk Reddi Beyanı</a>
                </div>
            </div>

        </div>
    );

}

export default AppFooter;