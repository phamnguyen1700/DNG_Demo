import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchStoreAction } from "../../redux/actions/storeActions";
import { IStore } from "../../typing/storeType";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import { setStoreDefault } from "../../redux/reducers/storeReducer";

const StoresMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [curStore, setCurStore] = useState<null | HTMLElement>();
  const { stores: storeListAPI, storeSelected } = useSelector(
    (state: RootState) => state.store
  );
  const getAPIStore = async () => {
    const storeList = await dispatch(fetchStoreAction()).unwrap();
    const storeStr = localStorage.getItem("selectedStore");

    let storeDefault = null;
    const storeLocalSelected: IStore | null = storeStr
      ? JSON.parse(storeStr)
      : null;
    if (storeLocalSelected) {
      //có mặc định
      const defaultStore = storeList.find(
        (i) => i.id === storeLocalSelected.id
      );
      if (defaultStore) {
        //set default lại
        storeDefault = defaultStore;
      } else {
        storeDefault = storeList[0];
      }
    } else {
      storeDefault = storeList[0];
    }
    localStorage.setItem("selectedStore", JSON.stringify(storeDefault));
    dispatch(setStoreDefault(storeDefault));
  };
  useEffect(() => {
    if (storeListAPI.length === 0) {
      getAPIStore();
    }
  }, [storeListAPI]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setCurStore(event.currentTarget);
  };
  //note
  const handleClose = () => {
    setCurStore(null);
  };

  const handleSelectStore = (store: IStore) => {
    handleClose();
    localStorage.setItem("selectedStore", JSON.stringify(store));
    dispatch(setStoreDefault(store));
  };

  return (
    <div>
      <Button
        aria-controls="location-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon style={{ color: "white" }} />}
        style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: "8px",
          }}>
          <Typography style={{ color: "white" }} variant="subtitle1">
            Seoul Academy
          </Typography>
          <Typography style={{ color: "white" }} variant="body2">
            {storeSelected?.name}
          </Typography>
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
            width: "200px",
          },
        }}>
        {storeListAPI?.map((store) => (
          <MenuItem key={store.id} onClick={() => handleSelectStore(store)}>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}>
              {store.name}
              {storeSelected?.id === store.id && (
                <AddLocationOutlinedIcon
                  style={{
                    color: "black",
                    textAlign: "right",
                    marginLeft: "auto",
                  }}
                />
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default StoresMenu;
