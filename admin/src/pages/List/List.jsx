import React from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url }) => {

  const [list, setList] = React.useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list-food`);
    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error(response.data.message)
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove-food`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }

  React.useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col'>
      <p>List of foods</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p><span>&#8377;</span> {item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List