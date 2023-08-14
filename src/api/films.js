import {apiClient} from './config';

export const getDetailFilm = async (payload) => {
    const res = await apiClient.get(`films/related?slug=${payload}`);
    return res;
}

export const getFilms = async () => {
    const res = await apiClient.get(`/films/filter`);
    return res;
}

export const reviewsFilm = async (id, payload) => {
    const res = await apiClient.patch(`films/${id}`, payload, {
        withCredentials: true,
      });
    return res;
}