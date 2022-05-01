import axios, {AxiosPromise, AxiosResponse} from 'axios'


export const APIUri = {
    server: "http://192.168.0.105",
    port: "8030",
    film: "/film",
    filmInfo: "/film/:id",
    filmImage: "/film/image",
    filmLink: "/film/link",
    filmLike: "/film/:id/like",
    filmCover: "/film/:id/cover",
    addFilmLink: "/film/:id/link",
    addFilmImage: "/film/:id/image",
    saveFilmImage: "/film/:id/image",
    isPlayer: "/film/:id/isplayer",
    isCollect: "/film/:id/isCollect",
    collect: "/film/:id/collect",
    unCollect: "/film/:id/uncollect",

    actress: "/actress",
    actressInfo: "/actress/:id",
    actressFilm: "/actress/:id/film",
    actressFilms: "/actress/:id/films",

    genre: "/genre",
    genreInfo: "/genre/:id",
    genreFilm: "/genre/:id/film",
}

export const ImagePath = `${APIUri.server}/static/images`
export const LogoPath = `${APIUri.server}/static/logo`
export const FilmPath = `${APIUri.server}/static/movies`

axios.defaults.baseURL = APIUri.server + ":" + APIUri.port
axios.interceptors.response.use((res: AxiosResponse) => {
        if (res.data.code != 200) {
            alert(res.data.message)
        }
        return res.data;
    },
    error => {
        if (error.response.status === 404) {
            alert("404 not found")
        }
        if (error.response.status === 500) {
            alert("服务器错误")
        }
        return {}
    });

type APIResult = {
  code: number,
  data: {
    total: number,
    data_list: any[]
  },
  message: string
}

export const list = (uri: string, params: any): AxiosPromise => {
  return axios.get<APIResult>(uri, {params})
}
export const get = (uri: string, params: any): AxiosPromise => {
  return axios.get(uri, {params})
}
export const post = (uri: string, data: any): AxiosPromise => {
  return axios.post(uri, data)
}
export const put = (uri: string, data: any): AxiosPromise => {
  return axios.put(uri, data)
}
export const del = (uri: string, id: any): AxiosPromise => {
  return axios.delete(`${uri}/${id}`)
}
