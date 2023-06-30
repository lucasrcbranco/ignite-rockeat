import http from 'node:http'
import { Transform } from 'node:stream';

class MultiplyByMinusOneStream extends Transform {
  _transform(chunk, enconding, callback){
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(transformed.toString()));
  }
}

const server = http.createServer((req, res) => {
  req.pipe(new MultiplyByMinusOneStream()).pipe(res);
});

server.listen(3333);