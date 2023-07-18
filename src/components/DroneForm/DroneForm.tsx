//External imports
import React from 'react'; 
import { useDispatch, useStore } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form'; 
import { Button } from '@mui/material'; 

//Internal imports 
import {
    chooseName,
    choosePrice,
    chooseDescription,
    chooseCamera,
    chooseFlight,
    chooseSpeed,
    chooseProdCost,
    chooseDimension,
    chooseWeight,
    chooseSeries } from '../../redux/slices/rootSlice'; 
import { DroneState } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks/FetchData'; 


interface DroneFormProps {
    id?: string;
    data?: DroneState
}


export const DroneForm = (props: DroneFormProps) => {
    const dispatch = useDispatch();
    // const { droneData, getData } = useGetData()
    const store = useStore()
    const { register, handleSubmit } = useForm<DroneState>({})


    const onSubmit: SubmitHandler<DroneState> = async(data, event) => {
        if (event) event.preventDefault(); 
    
        if (props.id){
            console.log(props.id)
            await serverCalls.update(props.id, data);
            console.log(`Updated drone: ${data.name}`);
            window.location.reload()
            if (event) event.currentTarget.reset()
        } else {
            dispatch(chooseName(data.name))
            dispatch(choosePrice(data.price))
            dispatch(chooseDescription(data.description))
            dispatch(chooseCamera(data.camera_quality))
            dispatch(chooseProdCost(data.cost_of_production))
            dispatch(chooseDimension(data.dimensions))
            dispatch(chooseWeight(data.weight))
            dispatch(chooseFlight(data.flight_time))
            dispatch(chooseSeries(data.series))
            dispatch(chooseSpeed(data.max_speed))

            console.log(store.getState())

            await serverCalls.create(store.getState() as DroneState)
            window.location.reload()
            if (event) event.currentTarget.reset()
        }
    }
    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='name'>Drone Name</label>
                    <Input {...register('name')} name='name' placeholder='Name Here' />
                </div>
                <div>
                    <label htmlFor='price'>Price</label>
                    <Input {...register('price')} name='price' placeholder='Price Here' />
                </div>
                <div>
                    <label htmlFor='camera_quality'>Camera Quality</label>
                    <Input {...register('camera_quality')} name='camera_quality' placeholder='Camera Quality Here' />
                </div>
                <div>
                    <label htmlFor='flight_time'>Flight Time</label>
                    <Input {...register('flight_time')} name='flight_time' placeholder='Flight Time Here' />
                </div>
                <div>
                    <label htmlFor='description'>Description </label>
                    <Input {...register('description')} name='description' placeholder='Description Here' />
                </div>
                <div>
                    <label htmlFor='dimensions'>Dimensions</label>
                    <Input {...register('dimensions')} name='dimensions' placeholder='Dimensions Here' />
                </div>
                <div>
                    <label htmlFor='max_speed'>Max Speed</label>
                    <Input {...register('max_speed')} name='max_speed' placeholder='Max Speed Here' />
                </div>
                <div>
                    <label htmlFor='weight'>Weight</label>
                    <Input {...register('weight')} name='weight' placeholder='Weight Here' />
                </div>
                <div>
                    <label htmlFor='cost_of_production'>Cost of Production</label>
                    <Input {...register('cost_of_production')} name='cost_of_production' placeholder='Cost of Production Here' />
                </div>
                <div>
                    <label htmlFor='series'>Series</label>
                    <Input {...register('series')} name='series' placeholder='Series Here' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}