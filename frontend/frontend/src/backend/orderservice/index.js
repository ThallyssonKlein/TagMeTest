import API from './ApiObj';

export async function findAll(){
    const apiResponse = await API.get("/");
    return apiResponse.data;
}