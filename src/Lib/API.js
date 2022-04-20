import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const API = {
    get: (currentPage, pageSize, onEventsChange) => {
        const url = BASE_URL + `/api/events/?page=${currentPage}&size=${pageSize}`;
        onEventsChange([], true, 0);
        axios.get(url)
            .then(res => {
                const events = res.data.results;
                const count = res.data.count;
                onEventsChange(events, false, count);
            })

    },
}

export default API;