import axios, {AxiosPromise, AxiosResponse} from 'axios'
import store from "@/store";


export const APIUri = {
    // server: "http://192.168.0.105:8030",
    server: "",
    staticServer: "http://192.168.0.105",
    film: "/film",
    filmInfo: "/film/:id",
    filmImage: "/film/image",
    filmLink: "/film/link",
    filmLike: "/film/:id/like",
    filmPlayer: "/film/player",
    filmCover: "/film/:id/cover",
    addFilmLink: "/film/:id/link",
    addFilmImage: "/film/:id/image",
    saveFilmImage: "/film/:id/image",
    isPlayer: "/film/:id/isplayer",
    isCollect: "/film/:id/iscollect",
    collect: "/film/:id/collect",
    unCollect: "/film/:id/uncollect",

    actress: "/actress",
    actressInfo: "/actress/:id",
    actressFilm: "/actress/:id/film",
    actressFilms: "/actress/:id/films",
    isFollow: "/actress/:id/isfollow",
    follow: "/actress/:id/follow",
    unfollow: "/actress/:id/unfollow",

    genre: "/genre",
    genreInfo: "/genre/:id",
    genreFilm: "/genre/:id/film",

    login: "/login",
    register: "/register",

    userCollect: "/collect",
    userFollow: "/follow"
}

export const ImagePath = `${APIUri.staticServer}/static/images`
export const LogoPath = `${APIUri.staticServer}/static/logo`
export const FilmPath = `${APIUri.staticServer}/static/movies`

axios.defaults.baseURL = APIUri.server
axios.interceptors.response.use((res: AxiosResponse) => {
        switch (res.data.code) {
            case 200:
                break
            case 401:
                localStorage.clear()
                store.state.username = ""
                alert(res.data.message)
                break
            case 500:
                alert(res.data.message)
        }
        return res.data;
    },
    error => {
        if (error.response.status === 404) {
            // alert("404 not found")
        }
        if (error.response.status === 500) {
            // alert("服务器错误")
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
