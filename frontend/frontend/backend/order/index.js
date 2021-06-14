import API from '../ApiObj';
import APIServerSide from '../ApiServerSide';

export async function findAll(){
    const apiResponse = await API.get("/order");
    return apiResponse.data;
}

export async function findOne(orderId){
    const apiResponse = await API.get("/order/" + orderId);
    return apiResponse;
}

export async function findOneServerSide(orderId){
    const apiResponse = await APIServerSide.get("/order/" + orderId);
    return apiResponse;
}

export async function updateOne(orderId, body){
    const apiResponse = await API.post("/order/" + orderId, body);
    return apiResponse.data;
}