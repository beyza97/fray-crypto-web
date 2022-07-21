export default async function api(url, params) {
    var task;

    const newParams = params && {...params, headers: {'Accept': 'application/json', ...(params.headers || {})}};

    if (url.startsWith('/')) {
        task = fetch(process.env.REACT_APP_ENDPOINT + url, newParams);
    } else {
        task = fetch(url, newParams);
    }

    const data = await task;

    switch(data.status) {
        case 200:
        case 201:
            return await data.json();
        case 204:
            return true;
        case 404:
            throw new Error(`404 on ${url}`);
        default:
            let error;
            try {
                error = await data.json();
            } catch(e) {
                throw new Error('Invalid response on ' + url);
            }

            throw new Error(error.message);
    }
};