// const request = require("supertest");
// const app = require("./index");
// const { create } = require("apisauce");

// const API = create({
//     baseURL : "http://localhost:3001"
// });

// describe("Orderservice api tests", _ => {
//     it('should GET one recibe by id', async function(done) {
//         const allOrders = await API.get('/order');
//         request(app)
//         .get('/recipe/' + allOrders.data[0].recipeId)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .then(response => {
            
//         });
//     })
//     it('should GET all orders', function(done) {
//           request(app)
//           .get('/order')
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(200)
//           .then(response => {
//                 expect(response.body).toEqual(
//                     expect.arrayContaining([
//                         expect.objectContaining({
//                             name : expect.any(String),
//                             photo : expect.any(String),
//                             description : expect.any(String),
//                             ingredients : expect.arrayContaining([
//                                 expect.any(String)
//                             ]),
//                             steps : expect.arrayContaining([
//                                 expect.any(String)
//                             ])
//                         })
//                     ])
//                 );
//               done();
//           })
//           .catch(err => done(err))
//       });
// });