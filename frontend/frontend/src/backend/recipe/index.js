import API from '../ApiObj';

export async function findOne(recipeId){
    const apiResponse = await API.get("/recipe/" + recipeId);
    return apiResponse.data;
}

export async function updateOne(recipeId, body){
    const apiResponse = await API.post("/recipe/" + recipeId, body);
    return apiResponse.ok;
}