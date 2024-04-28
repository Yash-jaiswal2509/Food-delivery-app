import React from 'react'
import './Add.css'
import { assets } from '../../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'



const Add = ({url}) => {

    const [adding, setAdding] = React.useState(false);
    const [image, setImage] = React.useState(false);
    const [data, setData] = React.useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setAdding(true)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('image', image);

        const response = await axios.post(`${url}/api/food/add-food`, formData)
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            });
            setImage(false);
            setAdding(false);
            toast.success(response.data.message);
        }
        else {
            toast.error(response.data.message);
            setAdding(false);
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹200' />
                    </div>
                </div>
                <button type='submit' className='add-button'>{adding ? "Adding..." : "Add Food"}</button>
            </form>
        </div>
    )
}

export default Add