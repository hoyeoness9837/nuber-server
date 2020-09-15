// creating notNull object with keys that have been filtered out if any ars[key]==null,
const cleanNullArgs = (args: object): object => {
  const notNull = {};
  Object.keys(args).forEach((key) => {
    if (args[key] !== null) {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
