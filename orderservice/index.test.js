const request = require("supertest");
const app = require("./index");

describe("Orderservice api tests", _ => {
    test("should GET all orders", _ => {
        return request(app).get("/").then(response => {
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
        });
    }, 1000000);
});