import React, { useState, useEffect } from 'react'; 
import { serverCalls } from '../api';
import { DroneState } from '../redux/slices/rootSlice';
// import our Drone Interface 


export const useGetData = () => {
    const [droneData, setData] = useState<DroneState[]>([]); 

    async function handleDataFetch(){
        const result = await serverCalls.get();
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {droneData, getData: handleDataFetch}

}