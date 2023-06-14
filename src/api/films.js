import {apiClient} from './config';

export const getDetailFilm = async (payload) => {
    const res = await apiClient.get(`films/related?slug=${payload}`);
    return res;
}

export const reviewsFilm = async (slug, payload) => {
    const res = await apiClient.patch(`films/${slug}`, payload);
    return res;
}