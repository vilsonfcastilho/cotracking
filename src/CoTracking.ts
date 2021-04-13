import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';

import Track from './entities/Track';

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
      const [key, value] = cur.split(':');

      const index = key.trim().toLowerCase();
      acc[index] = value.trim();

      return acc;
    }, {} as ITrack);

    return lis;
  };

  public track = async (code: string): Promise<Track[]> => {
    const isValid = this.verifyOrderCode(code);

    if (!isValid) {
      throw new Error('The track code is not valid.');
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
          trackUl.hora,
          trackUl.destino,
          trackUl.data,
        );

        return track;
      },
    );

    return tracks;
  };
}

export default CoTracking;
