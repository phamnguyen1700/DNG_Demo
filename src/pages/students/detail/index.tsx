import React from 'react'
import {  useParams } from 'react-router-dom';
const Detail: React.FC = () => {
  const params = useParams();
  console.log(params)
  return (
      <div>
        detail = {params?.id}
      </div>
  )
}

export default Detail;

