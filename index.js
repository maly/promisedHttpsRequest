const https = require('https');

const request = (options, data) => new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
        let data = "";

        res.on('data', (d) => {
            data += d.toString()
        });
        res.on('end', (d) => {
            resolve({
                data,
                statusCode: res.statusCode,
                headers: res.headers
            })
        });

    });

    req.on('error', (e) => {
        console.error(e);
        reject(e)
    });
    req.write(data)
    req.end();

})

module.exports = request