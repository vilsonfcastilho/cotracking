const formatData = (data: string): string[] => {
  const replaceData = data.replace(/\n|\t/g, '#');
  const newData = replaceData.split('#').filter(dt => dt !== '');

  return newData;
};

export default formatData;
