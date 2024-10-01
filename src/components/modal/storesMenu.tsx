import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchStoreAction } from "../../redux/actions/storeActions";
import { IStore } from "../../typing/storeType"; 
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';


const StoresMenu: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [curStore, setCurStore] = useState<null | HTMLElement>();
    const [selectedStore, setSelectedStore] = useState<IStore | null>(() => {
        const storedStore = localStorage.getItem('selectedStore');
        return storedStore ? JSON.parse(storedStore) : null;
    });
    const [stores, setStores] = useState<IStore[]>(() => {
        const storedList = localStorage.getItem('storeList');
        return storedList ? JSON.parse(storedList) : [];
    });


    const storeListAPI = useSelector((state: RootState) => state.store.stores);
    const isLoading = useSelector((state: RootState) => state.store.status === 'loading'); 

    useEffect(() => {
        if (stores.length === 0 && !isLoading) {
            dispatch(fetchStoreAction());
        }

        if (stores.length !== storeListAPI.length) {
            setStores(storeListAPI);
            localStorage.setItem('storeList', JSON.stringify(storeListAPI));
        }

        if (!selectedStore) {
            setSelectedStore(stores[0]);
            localStorage.setItem('selectedStore', JSON.stringify(stores[0]));
        }
    }, [stores.length,storeListAPI.length, selectedStore, isLoading]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setCurStore(event.currentTarget);
    }
//note
    const handleClose = () => {
        setCurStore(null);
    }

    const handleSelectStore = (store: IStore) => {
        setSelectedStore(store);
        localStorage.setItem('selectedStore',  JSON.stringify(store));
        handleClose();
    }

    return (
        <div>
        <Button
            aria-controls="location-menu"
            aria-haspopup="true"
            onClick={handleClick}
            endIcon={<ArrowDropDownIcon style={{ color: 'white'}}/>}
            style={{ display: 'flex', alignItems: 'center' }}     
            >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '8px' }}>
                <Typography style={{ color: 'white'}} variant="subtitle1">Seoul Academy</Typography>
                <Typography style={{ color: 'white'}} variant="body2">{selectedStore?.name}</Typography>
            </div>

        </Button>
        <Menu
            id="location-menu"
            anchorEl={curStore}
            keepMounted
            open={Boolean(curStore)}
            onClose={handleClose}
            PaperProps={{
                style: {
                    width: '200px'
                },
            }}
        >
            {stores?.map((store) => (
                <MenuItem key={store.id} onClick={() => handleSelectStore(store)}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {store.name}
                        {selectedStore?.id === store.id && 
                        <AddLocationOutlinedIcon 
                        style={{ color: 'black', textAlign: 'right', marginLeft: 'auto' }}
                        />}
                    </div>
                </MenuItem>
            ))}
        </Menu>
    </div>
    );


}

export default StoresMenu;