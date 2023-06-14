import axios from "axios";
import { authStore } from "../Redux/AuthState";

class Interceptors {

    public create(): void {

        axios.interceptors.request.use(requestObject => {

            if (authStore.getState().token) {

                requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
            }

            return requestObject;

        });

        axios.interceptors.response.use(responseObject => {
            if (responseObject.status === 401 || responseObject.status === 403) {
                window.location.href = "/Login";
            }
            return responseObject;
        });

    }

}

const interceptors = new Interceptors();

export default interceptors;