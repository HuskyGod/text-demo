export const GLOBAL_START = '/api';

export function get(url) {
        return fetch(`${GLOBAL_START}/${url}`)
            .then(response => response.json())
            .then(data => {
                return Promise.resolve(data)
            }).catch(err => {
                return Promise.reject(err)
            })
}

export function post(url,body) {
        return fetch(`${GLOBAL_START}/${url}`,{
              headers: {
                "Cache-Control": "no-cache",
                "Accept": "application/json",
                "Content-Type": "application/json"
             },
             method: "post",
              body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                return Promise.resolve(data)
            }).catch(err => {
                return Promise.reject(err)
            })
}