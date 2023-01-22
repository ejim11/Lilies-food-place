import axios from "axios";

// creating an instance
export const client = axios.create({
  baseURL: "https://lilliesfoodpalace.kazcodez.dev/",
  headers: {
    "content-type": "application/json",
  },
});

export const user = axios.create({
  baseURL: "https://lilliesfoodpalace.kazcodez.dev/",
});
