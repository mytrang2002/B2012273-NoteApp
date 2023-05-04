import request from "../utils/request"

class NoteService {
    static create(payload) {
        return request.post('note', payload)
    }

    static getAll() {
        return request.get('note')
    }
    static get(id) {
        return (request.get(`note/${id}`));
    }
    static update(id, data) {
        return (request.put(`note/${id}`, data));
    }
    static delete(id) {
        return request.delete(`note/${id}`);
    }
    static deleteAll() {
        return (request.delete("/"));
    }
}

export default NoteService