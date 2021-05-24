import axios from 'axios';
import CustomDrawer from 'components/Drawer/CustomDrawer';
import { CustomInput, CustomTextArea, CustomDropdown } from 'components/Input/CustomInput';
import React, { useEffect, useState } from 'react';

const Product = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState({
    p_category_id: '',
    p_img_src: '',
    p_name: '',
    p_description: '',
    p_available_in: '',
    p_active: true,
  });
  const [message, setMessage] = useState('');

  const inputChange = e => {
    const { name, value } = e.target;
    setAddProduct(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:8000/product', addProduct);
      console.log(result);
      setMessage(result.data.message);
      productData();
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage('Somthing Went Wrong!');
    }
  };

  /* Get All Dropdown Category */
  const categorysData = async () => {
    const response = await axios.get(`http://localhost:8000/product-category`);
    setCategory(response.data);
  };
  /* Get All Product */
  const productData = async () => {
    const response = await axios.get(`http://localhost:8000/product`);
    setProduct(response.data);
  };
  useEffect(() => {
    categorysData();
    productData();
  }, []);

  return (
    <section className="data-table-section">
      <div className="head-wrapper">
        <h2 className="title">Products</h2>
        <CustomDrawer btnText="ADD PRODUCT" label="ADD PRODUCT">
          <form method="post" onSubmit={formSubmit}>
            <CustomDropdown defaultValue="" name="p_category_id" label="Select Category" onChange={inputChange}>
              {category.map(item => {
                return (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </CustomDropdown>
            <CustomInput type="text" name="p_name" label="Product Name" onChange={inputChange} />
            <CustomTextArea type="text" name="p_description" label="Description" onChange={inputChange} />
            <CustomInput type="text" name="p_img_src" label="Image URL" onChange={inputChange} />
            <CustomInput type="text" name="p_available_in" label="Comma Separated Available In" onChange={inputChange} />
            <CustomDropdown defaultValue={'true'} name="p_active" label="Active Status" label_option={false} onChange={inputChange}>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </CustomDropdown>
            {message && <div className="message">{message}</div>}
            <button type="submit" className="submit-btn mt-3">
              ADD PRODUCT
            </button>
          </form>
        </CustomDrawer>
      </div>
      <div className="table-wrapper">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Available In</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="table-data">
            {product.map((item, idx) => {
              return (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <img className="p_image" src={item.img_src} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <div className="text-wrap"> {item.description}</div>
                  </td>
                  <td>{item.available_in.join(', ')}</td>
                  <td>{item.active ? 'Active' : 'Inactive'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Product;
