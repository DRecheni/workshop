const axios = require('axios');

module.exports = function (Parse) {
    return async function (request, response) {

        axios.get('https://randomfox.ca/floof')
            .then(res => {
                console.log(res.data)
                response.success(res.data)
                // response.success(res)
            })
            .catch(error => {
                // response.error(error)
                console.log(`error: ${error}`)
            });

    }
}