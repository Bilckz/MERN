import http from "../http-common";

class apiRequest{
    getAll() {
        return http.get("/categories");
      }
    
    get(id) {
        return http.get(`/categories/${id}`);
    }

    create(data) {
        return http.post("/categories", data);
    }

    update(id, data) {
        return http.put(`/categories/${id}`, data);
    }

    delete(id) {
        return http.delete(`/categories/${id}`);
    }

    //authenticate

    create(data) {
        return http.post("/authenticate", data);
    }



    getAll(header) {
        return http.get("/projects/code", header);
    }

    get(id, header) {
        return http.get(`/projects/code/${id}`, header);
    }
    
    create(data, header) {
        return http.post("/projects/code", data, header);
    }
    
    update(id, data, header) {
        return http.put(`/projects/code/${id}`, data, header);
    }
    
    delete(id, header) {
        return http.delete(`/projects/code/${id}`, header);
    }
    
    

}