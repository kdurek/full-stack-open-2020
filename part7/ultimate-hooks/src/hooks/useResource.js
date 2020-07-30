import { useState } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return setResources(response.data);
  };

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data]);
  };

  const service = {
    getAll,
    create,
  };

  return [resources, service];
};
