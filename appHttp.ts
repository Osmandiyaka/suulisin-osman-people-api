import axios from "axios";

export class AppHttp {

    public get(url: string) {
        return axios.get(url);
    }


}