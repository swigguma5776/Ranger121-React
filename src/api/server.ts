let token = '003fc1e33fd13daa3e712c3a6b20bdb0a4202a187902f087'
import { DroneState } from "../redux/slices/rootSlice";



export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://alexsrangerdrones121.glitch.me/api/drones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data'), response.status
        }

        return await response.json()
    },
    create: async(data: DroneState) => { 
        const response = await fetch(`https://alexsrangerdrones121.glitch.me/api/drones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to create data on server'), response.status 
        }

        return await response.json()
    },
    update: async(id: string, data: DroneState) => { 
        const response = await fetch(`https://alexsrangerdrones121.glitch.me/api/drones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },

            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to create data on server'), response.status 
        }

        return await response.json()
    },
    delete: async(id: string) => {
        const response = await fetch(`https://alexsrangerdrones121.glitch.me/api/drones/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to delete data'), response.status
        }

    }
}