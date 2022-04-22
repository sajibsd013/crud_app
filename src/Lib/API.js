import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const API = {
    get: (API_URL, onEventsChange) => {
        const url = BASE_URL + API_URL;
        onEventsChange([], true, 0);
        axios.get(url)
            .then(res => {
                const events = res.data.results;
                const count = res.data.count;
                onEventsChange(events, false, count);
            })

    },
    getOne: (API_URL, setFormState) => {
        const url = BASE_URL + API_URL;
        axios.get(url)
            .then(res => {
                const event = res.data;
                setFormState(event)
            })

    },
    post: (API_URL, form_data) => {
        const url = BASE_URL + API_URL;
        axios.post(url, form_data, {
            Headers: {
                "content-type": "application/json",
            }
        })
            .then(res => {
                console.log(res)
            })

    },
    put: (API_URL, form_data) => {
        const url = BASE_URL + API_URL;
        axios.put(url, form_data, {
            Headers: {
                "content-type": "application/json",
            }
        })
            .then(res => {
                console.log(res)
            })

    },
    delete: (API_URL, onDelete) => {
        const url = BASE_URL + API_URL;
        onDelete(true);
        axios.delete(url)
            .then(res => {
                // console.log(res)
                onDelete(false);
            })


    }

}

export default API;