import axios from 'axios';
import Banner from 'components/Banner';
import b_img from 'images/banner.png';
import React, { useEffect, useState } from 'react';
import './Product.scss';

const Product = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkedName, setCheckedName] = useState([]);
  /* Get  Category */
  const categorysData = async () => {
    const response = await axios.get(`https://toggle-head-api.herokuapp.com/product-category`);
    setCategory(response.data);
  };
  /* Get All Product */
  const productData = async (filter = []) => {
    if (filter.length > 0) {
      const response = await axios.post(`https://toggle-head-api.herokuapp.com/product/filter`, { category_id: filter.join(',') });
      setProduct(response.data);
    } else {
      const response = await axios.get(`https://toggle-head-api.herokuapp.com/product`);
      setProduct(response.data);
    }
  };
  const checkAll = e => {
    if (e.target.checked) {
      setChecked(category.map(item => item._id));
    } else {
      setChecked([]);
    }
    setCheckedName([]);
  };

  const handleToggle = (id, name) => {
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];
    const newCheckedName = [...checkedName];

    if (currentIndex === -1) {
      newChecked.push(id);
      newCheckedName.push(name);
    } else {
      newChecked.splice(currentIndex, 1);
      newCheckedName.splice(currentIndex, 1);
    }
    setCheckedName(newCheckedName);
    setChecked(newChecked);
  };

  useEffect(() => {
    categorysData();
    productData();
  }, []);

  useEffect(() => {
    productData(checked);
  }, [checked]);

  return (
    <>
      <Banner title="Our Product" img_src={b_img} />
      <section className="product-section">
        <div className="container">
          <div className="row g-5">
            <div className="col-11 col-md-4 mx-auto">
              <div className="filter-box">
                <h3 className="head text-danger">FILTER BY</h3>
                <div className="filter-body">
                  <p className="category-label">Categories</p>
                  <div className="category-wrapper">
                    <label className="checkbox-label">
                      <input type="checkbox" name="category" value="" onChange={checkAll} /> <span>All</span>
                    </label>
                    {category.map(item => (
                      <label className="checkbox-label" key={item._id}>
                        <input onChange={() => handleToggle(item._id, item.name)} checked={checked.indexOf(item._id) === -1 ? false : true} type="checkbox" name="category" value={item._id} /> <span>{item.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-11 col-md-8 mx-auto">
              <div className="product-wrapper">
                <h2 className="main-title">
                  <span>{product.length === 0 || checkedName.length !== 0 ? checkedName.join(' & ') : 'All'}</span>({product.length} Product)
                </h2>
                <div className="conatiner">
                  <div className="row g-5">
                    {product.map(item => {
                      return (
                        <div className="col-11 col-md-6 mx-auto" key={item._id}>
                          <div className="product_card">
                            <img src={item.img_src} alt={item.name} />
                            <h2 className="title">{item.name}</h2>
                            <p className="discription">{item.description}</p>
                            <span className="available">Available in {item.available_in.join(', ')}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
