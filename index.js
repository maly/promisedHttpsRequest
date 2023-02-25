import https from "https";
import {
    StringDecoder
} from 'string_decoder';

const request = (options, data) => new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
        let decoder = new StringDecoder('utf8');
        let data = "";

        res.on('data', (d) => {
            let textChunk = decoder.write(d);
            data += textChunk
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
    req.write(data ? data : "")
    req.end();

})

export default request