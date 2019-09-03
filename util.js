const settings = (url, method = "GET") => {
  return {
    async: true,
    dataType: "json",
    data: "application/json",
    crossDomain: true,
    url: url,
    method: method,
    withCredentials: true
  };
};
