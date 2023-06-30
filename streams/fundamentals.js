import { Readable, Writable, Transform } from "node:stream";

class OneToOneHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());
        this.push(buf);
      }
    }, 1000);
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

class MultiplyByMinusOneStream extends Transform {
  _transform(chunk, enconding, callback){
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(transformed.toString()));
  }
}

new OneToOneHundredStream()
  .pipe(new MultiplyByMinusOneStream())
  .pipe(new MultiplyByTenStream())