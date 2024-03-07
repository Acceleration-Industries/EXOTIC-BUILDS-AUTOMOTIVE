import { ShopProps } from "../customHooks";
import { CreateOrderProps } from "../components";
let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTE1OTYzNywianRpIjoiODk0MGRkNDQtMjg0Mi00NGJhLTgzZTctM2U3OTRmM2ZlY2I5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkV4b3RpYyBCdWlsZHMgR2FyYWdlIiwibmJmIjoxNzA5MTU5NjM3LCJjc3JmIjoiYzdkZTAwYWYtMjg2Ny00Njg1LTkyYjctMzEzYzBiNTVmY2VlIiwiZXhwIjoxNzQwNjk1NjM3fQ.bZ1-RUAQ4B508tXCHzTzgJ8Y0_X5vT9RyJqCiZDp0Q8"
let userId = localStorage.getItem('uuid')
type PartialShopProps = Partial<ShopProps>
export const serverCalls = {  
    getShop: async () => {
        const response = await fetch(`https://exoticbuildsautomotive.onrender.com/api/shop`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
        return await response.json()
    },
    getOrder: async () => {
        const response = await fetch(`https://exoticbuildsautomotive.onrender.com/api/order/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data'), response.status
        }
        return await response.json()
    },
    createOrder: async (data: CreateOrderProps ) => {
        const response = await fetch(`https://exoticbuildsautomotive.onrender.com/api/order/create/${userId}`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error('Failed to create data'), response.status
        }
        return await response.json()
    },
    updateOrder: async (orderId: string, data: PartialShopProps) => {
        const response = await fetch(`https://exoticbuildsautomotive.onrender.com/api/order/update/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error('Failed to update data'), response.status
        }
        return await response.json()
    },
    deleteOrder: async(orderId: string, data: PartialShopProps) => {
        const response = await fetch(`https://exoticbuildsautomotive.onrender.com/api/order/delete/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
                },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error('Failed to delete data'), response.status
        }
        return await response.json()
    }
}