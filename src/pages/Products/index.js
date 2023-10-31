import { useState, useEffect } from "react";
import React from "react";
import CardProduct from "../../components/CardProduct";
import List from "../../components/List";
import Loading from "../../components/Loading";
import imgEmpty from "../../assets/images/empty.png";

import { URLSERVER } from "../../Helpers/Constants";

var listProduct = [{}];


export default function Products() {  

  const [isLoading, setIsLoading] = useState(true);
  const [isProduct, setIsProduct] = useState(false);

  useEffect(() => {
    fetch(`${URLSERVER}api/products/`, {
      method: 'GET',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }, 
      mode: 'cors'
    })
    .then(res => res.json())
    .then(data => {listProduct = data;
      setIsLoading(false);
      setIsProduct(true);
    })
    .catch(err => alert(err)) 
  }, []);

  
  if (isLoading) {
    return (
      <div className="App">
        <Loading/>
      </div>
    );
  }else{
    if(isProduct){
      return (
        <div>
            <List 
              title={"Productos"}
              products={listProduct.map((products, i) => (
                <CardProduct
                  key={i}
                  product={products.image}
                  price={products.price}
                  name={products.name}
                />
              ))}
            />
          </div>
      );
    }else{
      return (
        <div className="flex flex-col my-8 justify-center items-center">
            <h1 className="font-bold text-4xl">Necesita estar logueado</h1>
            <img className="img-responsive" src={imgEmpty} alt="Loguearse"/>
        </div>
      );
    }
  }
  
}
