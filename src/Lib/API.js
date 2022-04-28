import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const API = {
    get: (API_URL, onEventsChange, setShowAlert) => {
        const url = BASE_URL + API_URL;
        onEventsChange([], true, 0);

        axios.get(url)
            .then(res => {
                const events = res.data.results;
                const count = res.data.count;
                onEventsChange(events, false, count);

            })
            .catch(err => {
                onEventsChange([], false, 0);
                setShowAlert({
                    type: "danger",
                    show: true,
                    msg: `${err}`,
                });

            })

    },
    getOne: (API_URL, setFormState, setShowAlert) => {
        const url = BASE_URL + API_URL;
        axios.get(url)
            .then(res => {
                const event = res.data;
                setFormState(event)
            })
            .catch(err => {
                setShowAlert({
                    type: "danger",
                    show: true,
                    msg: `${err}`,
                });
            })


    },
    post: (API_URL, form_data, setShowAlert, handleReset) => {
        const url = BASE_URL + API_URL;
        axios.post(url, form_data, {
            Headers: {
                "content-type": "application/json",
            }
        })
            .then(data => {
                // console.log(res)
                setShowAlert({
                    type: 'success',
                    show: true,
                    msg: "Event Created",
                });
                setTimeout(() => setShowAlert({
                    type: "",
                    show: false,
                    msg: "",
                }), 3000);
                handleReset();


            })
            .catch(err => {
                setShowAlert({
                    type: "danger",
                    show: true,
                    msg: `${err}`,
                });
                setTimeout(() => setShowAlert({
                    type: "",
                    show: false,
                    msg: "",
                }), 3000);
            })

    },
    put: (API_URL, form_data, setShowAlert) => {
        const url = BASE_URL + API_URL;
        axios.put(url, form_data, {
            Headers: {
                "content-type": "application/json",
            }
        })
            .then(res => {
                setShowAlert({
                    type: 'success',
                    show: true,
                    msg: "Event Updated",
                });
                setTimeout(() => setShowAlert({
                    type: "",
                    show: false,
                    msg: "",
                }), 3000);
            })
            .catch(err => {
                setShowAlert({
                    type: "danger",
                    show: true,
                    msg: `${err}`,
                });
                setTimeout(() => setShowAlert({
                    type: "",
                    show: false,
                    msg: "",
                }), 3000);
            })

    },
    delete: (API_URL, onDelete, setShowAlert) => {
        const url = BASE_URL + API_URL;
        onDelete(true);
        axios.delete(url)
            .then(res => {
                onDelete(false);
                setShowAlert({
                    type: "danger",
                    show: true,
                    msg: "Event Deleted",
                });
                setTimeout(() => setShowAlert({
                    type: "",
                    show: false,
                    msg: "",
                }), 3000);
            })

            .catch(err => {
                setShowAlert({
                    type: "danger",
                    show: true,
                    msg: `${err}`,
                });
                setTimeout(() => setShowAlert({
                    type: "",
                    show: false,
                    msg: "",
                }), 3000);
            })

    }

}

export default API;