// External Imports
import React, { useState } from 'react'; 
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'; 
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, 
    Typography} from '@mui/material'; 

// Internal Imports
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { DroneForm } from '../DroneForm';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90},
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 150
    }, 
    {
        field: 'price',
        headerName: 'Price',
        width: 110,
        type: 'number'
    },
    {
        field: 'camera_quality',
        headerName: 'Camera Quality',
        width: 150
    },
    {
        field: 'max_speed',
        headerName: 'Max Speed',
        width: 150
    },
    {
        field: 'dimensions',
        headerName: 'Dimensions',
        width: 150
    },
    {
        field: 'weight',
        headerName: 'Weight',
        width: 150
    },
    {
        field: 'cost_of_production',
        headerName: 'Cost of Production',
        width: 150
    },
    {
        field: 'random_joke',
        headerName: 'Random Joke',
        width: 150
    },
    {
        field: 'series',
        headerName: 'Series',
        width: 150
    },
];



  export const DataTable = () => {
    const { droneData, getData } = useGetData()
    const [ open, setOpen ] = useState(false)
    const [ gridData, setData ] = useState<GridRowSelectionModel>([])


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    const myAuth = localStorage.getItem('myAuth')

    if (myAuth === 'true'){
    return (
        <Box sx={{ height: 400, width: '100%'}}>
            <DataGrid
                rows={droneData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(newSelectionModel) => setData(newSelectionModel)}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant='contained' color='warning' onClick={deleteData}>Delete</Button>
            {/* Dialog Popup for Updating a Drone */}
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Update A Drone</DialogTitle>
                <DialogContent>
                    <DialogContentText>Drone id: {gridData[0]}</DialogContentText>
                    <DroneForm id={`${gridData[0]}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='error'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
        )} else {
            return (
                <Box>
                    <Typography variant='h4'>Please Sign In to View your Drones!</Typography>
                </Box>
            )
        }
  }
