import { useEffect } from 'react';
import { withRouter, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    return props.children;
}

export default withRouter(ScrollToTop);