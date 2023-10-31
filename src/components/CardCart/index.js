import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { TIMEALERT, URLSERVER } from "../../Helpers/Constants";
import "./style.css";
import useNavbar from "../../hooks/useNavbar";
import imgLogin from "../../assets/images/login.png";
import imgEliminar from "../../assets/images/eliminarX.png";
import imgEmptyCart from "../../assets/images/emptyCart.png";

var listCart = [{}];
var listProduct = [{
                id: 'idCart',
                idProduct: 'idProduct',
                image: 'data[0].image',
                name: 'data[0].name',
                price: 'data[0].price',
                quan: 'quan',
                total: 'total'
}];

var newQuan = [{
    id: '',
    quantity: '',
    total: '',
}]

export default function CardCart(){
    var totalCart = 0;


    const [isLoading, setIsLoading] = useState(true);
    const { session } = useNavbar();
    const { getAhutorization } = useNavbar();

    const classTr = "w-24";
    const classNameProduct = "w-80";
    //const classPrice = "w-24";
    const classCenter = "flex items-center justify-center";
    //const

    useEffect(() => {
        if(session.fullname !== ""){
            listCart = [{}];
            listProduct = [{
                id: 'idCart',
                idProduct: 'idProduct',
                image: 'data[0].image',
                name: 'data[0].name',
                price: 'data[0].price',
                quan: 'quan',
                total: 'total'
            }];

            newQuan = [{
                id: '',
                quantity: '',
                total: '',
            }]
            fillDataCart();
        }
        if(listProduct.length >= listCart.length){
            console.log("holas")
        }
        //fillDataProduct();
        
    }, []);

    function endFetch(){
        totalCart = 0;
        listCart = [{}];
        listProduct = [{
            id: 'idCart',
            idProduct: 'idProduct',
            image: 'data[0].image',
            name: 'data[0].name',
            price: 'data[0].price',
            quan: 'quan',
            total: 'total'
        }];

        newQuan = [{
            id: '',
            quantity: '',
            total: '',
        }]
        fillDataCart();
      }

    function fillDataCart(){
        fetch(`${URLSERVER}api/cart/getCart`, {
            method: 'GET',
            headers: {
                Authorization: getAhutorization(),
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }, 
            mode: 'cors'
          })
          .then(res => res.json())
          .then(data => {listCart = data;
            //console.log('listCart.length',listCart.length)
            if(listProduct.length <= listCart.length){
                for(let i=0; i < listCart.length; i++) {
                    totalCart = totalCart + listCart[i].total;
                    fillDataProduct(listCart[i].product[0], listCart[i].quantity, listCart[i].total, listCart[i]._id);
                }
            }
            
            //console.log('listProduct.length ',listProduct.length,' listCart.length ',listCart.length,listProduct.length > listCart.length)
            //console.log(listProduct);
            if(listProduct.length > listCart.length){
                listProduct.splice(0,1);
                
                setIsLoading(false);
            }
          })
          .catch(err => alert(err))
          .finally(() => {
            if(listProduct.length > listCart.length){
                listProduct.splice(0,1);
                
                setIsLoading(false);
            }
          });
          //window.location.replace("");
    }

    function fillDataProduct(id, quan, total, idCart){
        const tmpUrl = `${URLSERVER}api/products/getProductId/` + id;
        fetch(tmpUrl, {
            method: 'GET',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            }, 
            mode: 'cors'
          })
          .then(res => res.json())
          .then(data => {

            var product = {id: idCart,
                idProduct: id,
                image: data[0].image,
                name: data[0].name,
                price: data[0].price,
                quan: quan,
                total: total}
                listProduct.push(product);
            
            //console.log(listProduct)
            //onsole.log('listProduct.length ',listProduct.length,' listCart.length ',listCart.length,listProduct.length > listCart.length)
            //console.log(listProduct);
            if(listProduct.length > listCart.length){
                listProduct.splice(0,1);
                
                setIsLoading(false);
            }
            
          })
          .catch(err => alert(err))  
    }

    function deleteProductCart(id, idProduct, quan){
        if(window.confirm("¿Está seguro que quiere eliminar este producto?")){
            setIsLoading(true);
        const url = `${URLSERVER}api/cart/deleteCart/` + id;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: getAhutorization(),
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }, 
                mode: 'cors'
            })
            .then(res => res.json())
            .then((data) => {
                if (data.status === "ok") {
                    alert("Se eliminó el producto correctamente");
                    getProduct(idProduct, quan)
                    //window.location.replace('');
                } else {
                    alert(data.status);
                }
                
            })
            .catch(err => alert(err))
            .finally(() => endFetch());
        }
    }

    function getProduct(id, quan){
        const tmpUrl = `${URLSERVER}api/products/getProductId/` + id;

        fetch(tmpUrl, {
            method: 'GET',
            headers: {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            }, 
            mode: 'cors'
          })
          .then(res => res.json())
          .then(data => {
            editStockProduct(id, data[0].stock + quan)
            
          })
          .catch(err => alert(err))  
    }

    function editStockProduct(id, stock){
        const tmpUrl = `${URLSERVER}api/products/editQuan/` + id;
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
                } else {
                alert(data.status);
                }
                
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }

    function editQuan(idCart, e, price){
        console.log(e.target.value);
        const quan = e.target.value < 0 ? 0: (e.target.value === ''? 0 : e.target.value);
        var isValid = true;
        for(let i=0; i < newQuan.length; i++) {
            if(newQuan[i].id === idCart) {
                isValid = false;
                
                newQuan[i].quantity = quan;
                newQuan[i].total = (quan * price).toFixed(2);
                break
            }
        }
        if(isValid) {
            const tmp = {               
                    id: idCart,
                    quantity: quan,
                    total: (quan * price).toFixed(2)
            }
            newQuan.push(tmp)
        }
        //console.log(newQuan);
    }

    function updatePrices(){
        setIsLoading(true);
        newQuan.splice(0,1);
        //console.log('update ',newQuan);
        const tmpUrl = `${URLSERVER}api/cart/editCart`;
        var update = {
            "newQuan": newQuan
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
                } else {
                    alert(data.status);
                }
                
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => endFetch());
        } catch (error) {
            console.log(error);
        }
    }

    function buy(){
        //console.log('buying...');
        if(window.confirm("¿Está seguro/a que quiere realizar la compra?")){
            setIsLoading(true);
            const tmpUrl = `${URLSERVER}api/cart/buy`;
            var update = {
                "listCart": listCart
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
                        alert("Su pedido se ha realizado\nPor favor acérquese a nuestro local");
                        //window.location.replace('');
                    } else {
                        alert(data.status);
                    }
                    
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => endFetch());
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    if(session.fullname === ""){
        return(<div className="flex flex-col my-8 justify-center items-center">
                <h1 className="font-bold text-4xl">Necesita estar logueado</h1>
                <img className="img-responsive" src={imgLogin} alt="Loguearse"/>
            </div>)
        
    }else{
        if(isLoading){
            return <Loading/>
        }else{
            if(listCart.length > 0){
                return(<div className="flex flex-col my-8 justify-center items-center">
                    <h1 className="font-bold text-4xl">Carrito de compras de {session.fullname}</h1>
                    <div className="lg:flex flex-row my-8">
                        <di className="flex flex-col justify-center items-center">
                            <table className="m-8">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio<br/>Unitario</th>
                                        <th>Cantidad</th>
                                        <th>Total</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                            listProduct.map(product => {
                                                const tmpUrl = `/detail-product/` + product.name;
                                                totalCart += product.total;
                                                return(
                                                    <tr className="odd:bg-[#D0D0D0] h-28 m-4">
                                                        <td className="w-28"><div className={`w-20 h-20 m-2 ${classCenter}`}><img  src={product.image} alt={product.name}/></div></td>
                                                        <td className={classNameProduct}><div className="h1CardCart"><a href={tmpUrl} target="_blank" rel="noopener noreferrer"><h1>{product.name}</h1></a></div></td>
                                                        <td className={classTr}><div className={classCenter}>{product.price}</div></td>
                                                        <td className={classTr}><div className={classCenter}><input placeholder={product.quan} onChange={(e) => editQuan(product.id, e, product.price)} id="price"  type="number" className="w-16 focus:outline-none"/></div></td>
                                                        <td className={classTr}><div className={classCenter}>{product.total}</div></td>
                                                        <td className={classTr}><div className={classCenter}><button onClick={() => deleteProductCart(product.id, product.idProduct, product.quan)}><img className="w-2/5 h-2/5" src={imgEliminar} alt="Eliminar"/></button></div></td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                            <button onClick={() => updatePrices()} className="flex text-white m-8 justify-center items-center w-[140px] h-[40px] border-solid border-2 border-[#2563eb] bg-[#2563eb] rounded-[15px]">Actualizar Precios</button>
                        </di>
                        <div>
                            <div className="flex flex-col w-80 h-80 border-solid border-2 border-black rounded-[15px] justify-around">
                                    <div className={`${classCenter} text-2xl`}><h1>Resumen del Pedido</h1></div>
                                    <div className="bg-[#EAEAEA] h-24 flex flex-row justify-around items-center"><h1>Total</h1><h1 id="total">{totalCart}</h1></div>
                                    <div onClick={() => buy()} className={classCenter}><button className="text-white w-24 border-solid border-2 border-[#2563eb] bg-[#2563eb] rounded-[15px]">Comprar</button></div>
                            </div>
                        </div>
                    </div>
                </div>)
            }else{
                return(<div className="flex flex-col my-8 justify-center items-center">
                    <h1 className="font-bold text-4xl">El carrito está vacío</h1>
                    <img className="img-responsive" src={imgEmptyCart} alt="Loguearse"/>
                </div>)
            }
        }
        
    }
    
}