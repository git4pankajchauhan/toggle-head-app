import axios from 'axios';
import AlertMessage from 'components/AlertMessage';
import CustomDrawer from 'components/Drawer/CustomDrawer';
import { CustomInput, CustomTextArea, CustomDropdown } from 'components/Input/CustomInput';
import React, { useEffect, useState } from 'react';

const Product = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [addProduct, setAddProduct] = useState({
    p_category_id: '',
    p_name: '',
    p_description: '',
    p_available_in: '',
    p_active: true,
    p_image: '',
  });
  const [result, setResult] = useState({
    message: '',
    status: false,
  });

  const inputChange = e => {
    const { name, value } = e.target;
    setAddProduct(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const uploadFile = e => {
    setAddProduct(preVal => {
      return {
        ...preVal,
        p_image: e.target.files[0],
      };
    });
  };

  const formSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('p_category_id', addProduct.p_category_id);
      formData.append('p_name', addProduct.p_name);
      formData.append('p_description', addProduct.p_description);
      formData.append('p_available_in', addProduct.p_available_in);
      formData.append('p_active', addProduct.p_active);
      formData.append('p_image', addProduct.p_image);

      const data = await axios.post('https://toggle-head-api.herokuapp.com/product', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      setResult({ ...data.data });

      productData();
    } catch (error) {
      setResult({ status: false, message: 'Somthing Went Wrong!' });
    }
  };

  const abortController = new AbortController();
  const signal = abortController.signal;
  /* Get All Dropdown Category */
  const categorysData = async () => {
    const response = await axios.get(`https://toggle-head-api.herokuapp.com/product-category`, { signal: signal });
    setCategory(response.data);
  };
  /* Get All Product */
  const productData = async () => {
    const response = await axios.get(`https://toggle-head-api.herokuapp.com/product`, { signal: signal });
    setProduct(response.data);
  };

  useEffect(() => {
    categorysData();
    productData();

    return function cleanup() {
      abortController.abort();
    };
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
            <CustomInput type="file" name="p_image" label="Image URL" onChange={uploadFile} />
            <CustomInput type="text" name="p_available_in" label="Comma Separated Available In" onChange={inputChange} />
            <CustomDropdown defaultValue={'true'} name="p_active" label="Active Status" label_option={false} onChange={inputChange}>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </CustomDropdown>
            {result.message && <AlertMessage type={result.status ? 'success' : 'danger'} message={result.message} />}
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
