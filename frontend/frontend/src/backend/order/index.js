import API from '../ApiObj';

export async function findAll(){
    const apiResponse = await API.get("/order");
    return apiResponse.data;
}

export async function findOne(orderId){
    const apiResponse = await API.get("/order/" + orderId);
    return apiResponse.data;
}