import axios from "axios";
import { BEurl } from "../constants/EnvConstants";

export const Api = axios.create({
  baseURL: BEurl,
  timeout: 30000,
});
