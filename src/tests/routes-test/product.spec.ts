import supertest from 'supertest'
import app from '../..'


const request = supertest(app)
describe("Test server (product) endpoint responses", () => {
    it("gets index endpoint", async () => {
        const response = await request.get("/api/products")
        expect(response.status).toBe(200)
    })
    it("gets show endpoint", async () => {
        const response = await request.get("/api/products/1")
        expect(response.status).toBe(200)
    })
})