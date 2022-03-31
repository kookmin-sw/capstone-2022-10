const parseId = (path: string) => {
  const USER_ID_REGEX = /(?<userId>\d+)/;
  const parseResult = USER_ID_REGEX.exec(path)!;
  return Number(parseResult[0]);
};

export { parseId };
