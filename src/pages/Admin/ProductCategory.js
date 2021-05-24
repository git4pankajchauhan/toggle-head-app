import axios from 'axios';
import CustomDrawer from 'components/Drawer/CustomDrawer';
import { CustomDropdown, CustomInput } from 'components/Input/CustomInput';
import React, { useEffect, useState } from 'react';

const ProductCategory = () => {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState([]);
  const [addCategory, setAddCategory] = useState({
    c_name: '',
    c_active: true,
  });

  const inputChange = e => {
    const { name, value } = e.target;
    setAddCategory(preVal => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const formSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post('https://toggle-head-api.herokuapp.com/product-category', addCategory);
      setMessage(result.data.message);
      categorysData();
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage('Somthing Went Wrong!');
    }
  };

  /* Fetch posts From API */
  const categorysData = async () => {
    const response = await axios.get(`https://toggle-head-api.herokuapp.com/product-category`);
    setCategory(response.data);
  };
  useEffect(() => {
    categorysData();
  }, []);

  return (
    <section className="data-table-section">
      <div className="head-wrapper">
        <h2 className="title">Products Category</h2>
        <CustomDrawer btnText="ADD CATEGORY" label="ADD CATEGORY">
          <form method="post" onSubmit={formSubmit}>
            <CustomInput type="text" name="c_name" label="Product Name" onChange={inputChange} />
            <CustomDropdown defaultValue={'true'} name="c_active" label="Active Status" label_option={false} onChange={inputChange}>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </CustomDropdown>
            {message && <div className="message">{message}</div>}
            <button type="submit" className="submit-btn mt-3">
              ADD CATEGORY
            </button>
          </form>
        </CustomDrawer>
      </div>
      <div className="table-wrapper">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Active Status</th>
            </tr>
          </thead>
          <tbody className="table-data">
            {category.map((item, idx) => {
              return (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
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

export default ProductCategory;
