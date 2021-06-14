import API from '../ApiObj';

export async function findAll(){
    const apiResponse = await API.get("/order");
    return apiResponse.data;
}

export async function findOne(orderId){
    const apiResponse = await API.get("/order/" + orderId);
    return apiResponse;
}

export async function updateOne(orderId, body){
    const apiResponse = await API.post("/order/" + orderId, body);
    return apiResponse.data;
}