import axios from "axios";

const request = (method, url, data, headers) => {
	const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
	return axios({
		method,
		credentials: "include",
		url: "http://localhost:3000/api" + url,
		[dataOrParams]: data,
		headers,
	});
};

const getDefaultHeaders = () => ({
	credentials: "include",
});

const get = (url, params) => request("GET", url, params, getDefaultHeaders());

const post = (url, data) => request("POST", url, data, getDefaultHeaders());

const put = (url, data) => request("PUT", url, data, getDefaultHeaders());

const _delete = (url, params) =>
	request("DELETE", url, params, getDefaultHeaders());

export { get, put, post, _delete };
