import supertest from 'supertest'
import app from '../..'


const request = supertest(app)
describe("Test server (order) endpoint responses", () => {
    it("gets create endpoint", async () => {
        const response = await request.get("/api/order-products")
        expect(response.status).toBe(200)
    })
    it("gets show endpoint", async () => {
        const response = await request.get("/api/order-products/1")
        expect(response.status).toBe(200)
    })
    it("gets addProduct endpoint", async () => {
        const response = await request.post("/api/order-products")
        expect(response.status).toBe(200)
    })
})