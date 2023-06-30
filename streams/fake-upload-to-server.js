import {Readable} from 'node:stream';

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

fetch('http://localhost:3333', {
  method: 'POST',
  body: new OneToOneHundredStream(),
  duplex: 'half' // adicione essa linha
});