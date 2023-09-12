const parseEthResult = (data: any) => {
  const keys = Object.keys(data).filter((key) => isNaN(Number(key)));
  let result = data;

  if (keys.length) {
    result = keys.reduce(
      (o, key) => Object.assign(o, { [key]: data[key] }),
      {}
    );

    Object.keys(result).forEach((key) => {
      if (typeof result[key] === 'object') {
        result[key] = parseEthResult(result[key]);
      }
    });
  }

  return result;
};

export default parseEthResult;
