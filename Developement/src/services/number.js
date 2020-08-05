import axios from 'axios'
const baseUrl = '/api/persons';

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(response => response.data)
}

const getInfo = () => {
    const req = axios.get(`${baseUrl}/info`);
    return console.log(`<h3>The phonebooks has ${req.count} people's number. ${new Date()}</h3>`);
    // return req.then(res => console.log(`<h3>The phonebooks has ${res.count} people's number. ${new Date()}</h3>`));
}

const create = (newObject) => {
   const req =  axios.post(baseUrl, newObject)
    return req.then(response => {
        if (typeof response.data === "object")
        {
            return {data: response.data}
        }
        else if (typeof response.data === "string")
        {
            return {error: response.data}
        }
    })
}

const remove = (id) => {
        const req = axios.delete(`${baseUrl}/${id}`);
        return req.then(response => response.status);
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject);
    return req.then(response => {
        if (typeof response.data === "object")
        {
            return {data: response.data}
        }
        else if (typeof response.data === "string")
        {
            return {error: response.data}
        }
    })
}

export default {
    getAll,
    create,
    remove,
    update,
    getInfo
}