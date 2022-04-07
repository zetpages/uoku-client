import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createStudent = async (student) => {
    const {data} = await $authHost.post('api/student/', student);
    return data;
}

export const fetchStudent = async () => {
    const {data} = await $authHost.get('api/student/');
    return data;
}