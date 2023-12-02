import '../styles/AllProducts.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://api.webpal/products');
        const productsWithImages = await Promise.all(
          response.data.map(async (product) => {
            const imageResponse = await axios.get(`http://api.webpal/products/${product.product_code}/images`);

            if (imageResponse.data && imageResponse.data.length > 0) {
              // Assuming the API returns an array of image URLs
              return { ...product, image_urls: imageResponse.data.map(image => image.image_name) };
            } else {
              return { ...product, image_urls: [] };
            }
          })
        );

        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='container'>
      <h2>Products</h2>
      {/* <ul>
        {products.map((product) => (
          <li className='product' key={product.id}>
            {product.image_urls && product.image_urls.length > 0 && (
              <div>
                {product.image_urls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={`http://admin.webpal/uploads/${imageUrl}`}
                    alt={`${product.name} - ${index}`}
                    style={{ width: '50px', height: '50px' }}
                  />
                ))}
              </div>
            )}
            {product.name} - ${product.price}
          </li>
        ))}
      </ul> */}
      <div className='row row-cols-1 row-cols-md-4'>
        {products.map((product) => (
          <div className='product col' key={product.id}>
            <div className="card h-100">

              {product.image_urls && product.image_urls.length > 0 && (
                <img
                  src={`http://admin.webpal/uploads/${product.image_urls[0]}`}
                  className="card-img-top" alt={`${product.name}`} />
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">${product.price}</h5>
                <p className="card-text flex-grow-1">{product.name}</p>
                
                <button type="button" className="btn btn-primary add-to-cart">Add to cart</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
