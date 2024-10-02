import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const Home: React.FC = () => {
  const { storeSelected } = useSelector((state: RootState) => state.store);

  return (
    <div>
      <div>Chi nhánh hiện tại : {storeSelected?.name}</div>
    </div>
  );
};

export default Home;
