const objectToQueryString = (object) => {
  return Object.entries(object)
    .map((q) => {
      if (q[1] === undefined) {
        return null;
      }
      return q[0] + "=" + String(q[1]);
    })
    .filter(Boolean)
    .join("&");
};

export default objectToQueryString;
