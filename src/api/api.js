const API_BASE_ENDPOINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (url, options = {}) => {
    const res = await fetch(`${API_BASE_ENDPOINT}${url}`);

    if(res.ok) {
        return res.json();
    }

    throw new Error('error!!!');
}

export const fetchFiles = () => request('');
export const fetchDetailFiles = (pathId) => request(`/${pathId}`); 