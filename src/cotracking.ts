import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';

import verifyOrderCode from './utils/verifyOrderCode';
import formatData from './utils/formatData';

const cotraching = async (code: string) => {
  const isValid = verifyOrderCode(code);

  if (!isValid) {
    throw new Error('The track code is not valid.');
  }

  const response = await fetch(`https://www.linkcorreios.com.br/${code}`);

  const html = await response.text();

  const $ = cheerio.load(html);

  const uls: Array<any> = [];
  $('.linha_status').each((index, element) => {
    uls.push($(element).text().toString().trim());
  });

  uls.map((ul): string[] => {
    const stringUl = ul.toString();

    const formatedData = formatData(stringUl);
    console.log(formatedData);

    return formatedData;
  });
};
cotraching('PM623422856BR');
