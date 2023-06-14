import {apiClient} from './config';

export const getCategory = async () => {
    const res = await apiClient.get('categories');
    return res;
};

export const getListFilms = async (payload) => {
    const res = await apiClient.get(`films/filter?genre=${payload}`);
    return res;
}
