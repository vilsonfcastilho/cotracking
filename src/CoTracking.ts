import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';

import Track from './entities/Track';
import Order from './entities/Order';

interface ITrack {
  [key: string]: string;
}

class CoTracking {
  private verifyOrderCode = (code: string): boolean =>
    /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(code);

  private formatTrack = (data: string): ITrack => {
    const replaceData = data.replace(/\n|\t|\|/g, '#');
    const newData = replaceData.split('#').filter(dt => dt !== '');

    const lis = newData.reduce((acc, cur) => {
      const [key, value] = cur.split(': ');

      const index = key.trim().toLowerCase();
      acc[index] = value.trim();

      return acc;
    }, {} as ITrack);

    return lis;
  };

  public track = async (code: string | string[]): Promise<Order | Order[]> => {
    if (Array.isArray(code)) {
      const promises = code.map(async cd => {
        const isValid = this.verifyOrderCode(cd);

        if (!isValid) {
          throw new Error(`Code ${cd} is invalid.`);
        }

        const response = await fetch(`https://www.linkcorreios.com.br/${cd}`);

        const html = await response.text();

        const $ = cheerio.load(html);

        const uls: Array<string> = [];
        $('.linha_status').each((index, element) => {
          uls.push($(element).text().toString().trim());
        });

        const tracks = uls.map(
          (ul): Track => {
            const stringUl = ul.toString();

            const trackUl = this.formatTrack(stringUl);

            const track = new Track(
              trackUl.status,
              trackUl.origem,
              trackUl.destino,
              trackUl.data,
              trackUl.hora,
            );

            return track;
          },
        );

        const order = new Order(cd, tracks);

        return order;
      });

      const orders = await Promise.all(promises);

      return orders;
    }

    const isValid = this.verifyOrderCode(code);

    if (!isValid) {
      throw new Error('Invalid code.');
    }

    const response = await fetch(`https://www.linkcorreios.com.br/${code}`);

    const html = await response.text();

    const $ = cheerio.load(html);

    const uls: Array<string> = [];
    $('.linha_status').each((index, element) => {
      uls.push($(element).text().toString().trim());
    });

    const tracks = uls.map(
      (ul): Track => {
        const stringUl = ul.toString();

        const trackUl = this.formatTrack(stringUl);

        const track = new Track(
          trackUl.status,
          trackUl.origem,
          trackUl.destino,
          trackUl.data,
          trackUl.hora,
        );

        return track;
      },
    );

    const order = new Order(code, tracks);

    return order;
  };
}

export default CoTracking;
