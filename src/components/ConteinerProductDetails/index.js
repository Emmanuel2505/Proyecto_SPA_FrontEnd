//Contenedor del detalle del producto
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import React from "react";
import useNavbar from "../../hooks/useNavbar";
import swal from "sweetalert";

import {  TIMEALERT, URLSERVER } from "../../Helpers/Constants";

//var product = [{}];
export default function ConteinerProductDetails({
  title
}) {
  
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useNavbar();
  const { getAhutorization } = useNavbar();
  var [product, setProduct] = useState([{}]);
  
  //const [product, setProduct] = useState({})
  
  var totalPrice = 0;

  

  useEffect(() =>{
    //console.log("*******",title);
    //console.log("*******",title.name);
    getProduct();
    
  })

  function endFetch(){
    setProduct([{}]);
    getProduct();
  }

  function getProduct(){
    //console.log('----------',_id);
    const tmpUrl = `${URLSERVER}api/products/getProduct/` + title.name;
    //console.log(tmpUrl)
    fetch((tmpUrl), {
      method: 'GET',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      }, 
      mode: 'cors'
    })
      .then(res => res.json())
      .then(data => {setProduct(data);
        //console.log('DATA');
        //console.log(data);
        //console.log(data._id);
        //console.log('PRODUCT');
        
        //console.log(product._id);
        ////window.location.replace("");
        setIsLoading(false)
        
      })  
      
  }
  
  

  function quantity(n) {
    var quan = document.getElementById("cant").innerHTML;
    //console.log(quan);
    quan = Number(quan) + n;
    totalPrice = product[0].price;
    if (Number(quan) >= 1) {
      document.getElementById("cant").innerHTML = quan;
      totalPrice = totalPrice * Number(quan);
    } else {
      document.getElementById("cant").innerHTML = 1;
      totalPrice = product[0].price;
    }
    document.getElementById("price").innerHTML =
      "$" + Math.round(totalPrice * 100) / 100;
  }

  function description(id) {
    let buttomDet = document.getElementById("detail");
    let buttomBen = document.getElementById("benefits");
    let buttomUse = document.getElementById("howUse");
    let buttomInf = document.getElementById("moreInf");
    changeColor(buttomDet, buttomBen, buttomUse, buttomInf);
    if (id === "detail") {
      //console.log("1");
      document.getElementById("containerDes").value = (product[0].detail !== 'undefined') ? product[0].detail : ""; 
      buttomDet.style.backgroundColor = "rgb(45 107 162)";
      buttomDet.style.color = "#FFF";
    } else if (id === "benefits") {
      document.getElementById("containerDes").value = (product[0].benefit !== 'undefined') ? product[0].benefit : ""; 
      buttomBen.style.backgroundColor = "rgb(45 107 162)";
      buttomBen.style.color = "#FFF";
    } else if (id === "howUse") {
      document.getElementById("containerDes").value = (product[0].howToUse !== 'undefined') ? product[0].howToUse : ""; 
      buttomUse.style.backgroundColor = "rgb(45 107 162)";
      buttomUse.style.color = "#FFF";
    } else if (id === "moreInf") {
      document.getElementById("containerDes").value = (product[0].moreInfo !== 'undefined') ? product[0].moreInfo : ""; 
      buttomInf.style.backgroundColor = "rgb(45 107 162)";
      buttomInf.style.color = "#FFF";
    }
  }

  function changeColor(buttomDet, buttomBen, buttomUse, buttomInf) {
    buttomDet.style.backgroundColor = "#FFF";
    buttomDet.style.color = "rgb(0 0 0)";
    buttomBen.style.backgroundColor = "#FFF";
    buttomBen.style.color = "rgb(0 0 0)";
    buttomUse.style.backgroundColor = "#FFF";
    buttomUse.style.color = "rgb(0 0 0)";
    buttomInf.style.backgroundColor = "#FFF";
    buttomInf.style.color = "rgb(0 0 0)";
  }

  function addToCart(){
    var quan = document.getElementById("cant").innerHTML;
    if(session.fullname !== ""){
      if(checkStock(quan)){
        setIsLoading(true)
        const cart = {
          "product": product[0]._id,
          "quantity": quan,
          "total": (quan * product[0].price).toFixed(2),
        }
        fetch(`${URLSERVER}api/cart/addCart`, {
          method: 'POST',
          headers: {
            'Authorization': getAhutorization(),
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }, 
          body: JSON.stringify(cart),
          mode: 'cors'
        })
        .then(res => res.json())
        .then((data) => {
            if (data.status === "ok") {
                swal({
                  title: "Carga Exitosa",
                  text: "Se añadio el carrito al producto\nRevise su carrito",
                  icon: "success",
                  buttons: "Aceptar",
                  timer: TIMEALERT,
                });
                //Su pedido se ha realizado\nPor favor acérquese a nuestro local
                editQuan(product[0].stock - quan);
            } else {
                alert(data.status);
            }
        })
        .catch(err => {alert(err);
          setIsLoading(false)})
        .finally(() => endFetch());
      }
    }else{
      alert("Necesito estar logeado");
    }
  }

  function editQuan(stock){
    const tmpUrl = `${URLSERVER}api/products/editQuan/` + product[0]._id;
    var update = {
        "stock": stock
    } 
    try {
        fetch(tmpUrl, {
            method: 'PUT',
            headers: {
                Authorization: getAhutorization(),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(update),
            mode: "cors",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === "ok") {
              //window.location.replace('');
              setIsLoading(false);
            } else {
              alert(data.status);
            }
            
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false)
        })
        .finally(() => endFetch());
    } catch (error) {
        console.log(error);
    }
  }

  function checkStock(quan){
    
    //console.log(quan,'----------------',product[0].stock)
    if(quan <= product[0].stock){
      
      return true;
    }else{
      swal({
        title: "Productos Insuficientes",
        text: "No contamos con suficientes productos\nAlguien de nuestro local se pondrá en contacto con usted",
        icon: "success",
        buttons: "Aceptar",
        timer: TIMEALERT,
      });
      return false;
    }
  }

  if(!isLoading){
    return (
      <div className="lg:flex items-stretch max-w-[1520px] min-w-[320px] h-full my-8">
        <div className="ml-12 flex items-center max-w-[760px] min-w-[160px]">
            <img className="w-full h-full" src={product[0].image} alt="imagen del producto" id="imgBox"></img>
        </div>
        <div className="p-4 m-8 max-w-[760px] min-w-[160px]">
          <h1 id='name' className="text-2xl">
            {product[0].name}
          </h1>
          <div className="flex flex-row">
            <h3>Precio:</h3>
            <h3 id="price" className="text-[#F75C03]">
              ${product[0].price}
            </h3>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <div className="flex justify-center border-2 border-solid border-[#2D6BA2] content-center items-center h-[40px]">
                <h3 id="cant" className="px-3 py-2">
                  1
                </h3>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center border-y-2 border-solid border-[#2D6BA2] content-center items-center h-[20px]">
                  <buttom
                    className="bg-inherit border-none hover:cursor-pointer"
                    onClick={() => {
                      quantity(1);
                    }}
                  >
                    <h3 className="px-3">+</h3>
                  </buttom>
                </div>
                <div className="flex justify-center border-b-2 border-solid border-[#2D6BA2] content-center items-center h-[20px]">
                  <buttom className="bg-inherit border-none hover:cursor-pointer">
                    <h3
                      className="px-3"
                      onClick={() => {
                        quantity(-1);
                      }}
                    >
                      -
                    </h3>
                  </buttom>
                </div>
              </div>
            </div>
            <div
              className="flex justify-center border-y-2 border-x-2 border-solid border-[#2D6BA2] bg-[#2D6BA2] 
                  content-center items-center h-[40px] w-[200px]"
            >
              <buttom className="bg-inherit border-none hover:cursor-pointer" onClick={() => {
                      addToCart();
                    }}>
                <h2 className="text-[#FFFFFF] px-3">AÑADIR AL CARRITO</h2>
              </buttom>
            </div>
          </div>
          <div className="pt-2 min-h-[160px] max-w-[760px] min-w-[160px] flex flex-col">
            <div className="flex flex-row">
              <buttom
                id="detail"
                className="flex justify-center w-[100px] border-2 border-solid border-[#2D6BA2] text-white bg-[#2D6BA2]
                          hover:cursor-pointer"
                onClick={() => {
                  description("detail");
                }}
              >
                DETALLE
              </buttom>
              <buttom
                id="benefits"
                className="flex justify-center w-[100px] border-2 border-solid border-[#2D6BA2] 
                          hover:cursor-pointer"
                onClick={() => {
                  description("benefits");
                }}
              >
                BENEFICIOS
              </buttom>
              <buttom
                id="howUse"
                className="flex justify-center w-[100px] border-2 border-solid border-[#2D6BA2]
                          hover:cursor-pointer"
                onClick={() => {
                  description("howUse");
                }}
              >
                COMO USAR
              </buttom>
              <buttom
                id="moreInf"
                className="flex justify-center w-[100px] border-2 border-solid border-[#2D6BA2]
                          hover:cursor-pointer"
                onClick={() => {
                  description("moreInf");
                }}
              >
                MÁS INF
              </buttom>
            </div>
            <div className="h-[200px] w-[400px] border-2 border-solid border-[#2D6BA2]">
              <textarea
                id="containerDes"
                className="h-[195px] w-[395px] resize-none"
                name="textarea"
                disabled
              >
                {(product[0].detail !== 'undefined') ? product[0].detail : "" }
              </textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <Loading/>
    </div>
  );
  

}
