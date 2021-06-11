const request = require("supertest");
const app = require("./index");

describe("Orderservice api tests", _ => {
    it('should GET all orders', function(done) {
          request(app)
          .get('/')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            name : expect.any(String),
                            photo : expect.any(String),
                            description : expect.any(String),
                            ingredients : expect.arrayContaining([
                                expect.any(String)
                            ]),
                            steps : expect.arrayContaining([
                                expect.any(String)
                            ])
                        })
                    ])
                );
              done();
          })
          .catch(err => done(err))
      });
});