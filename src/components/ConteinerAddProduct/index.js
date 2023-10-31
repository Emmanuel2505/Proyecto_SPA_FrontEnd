import { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import LoadingText from "../../components/LoadingText";
import Loading from "../../components/Loading";
import Input from "../../components/Input";
import InputImage2 from "../../components/InputImage2";
import { TIMEALERT, URLSERVER } from "../../Helpers/Constants";
import imgEditar from "../../assets/images/editar.png";
import imgEliminar from "../../assets/images/eliminar.png";
import useNavbar from "../../hooks/useNavbar";
import swal from "sweetalert";

//var listProduct = [{}];
var varProduct = [{}];

export default function ConteinerAddProduct() {
  const trClass = `text-center m-4`;
  const inputClass = `border border-black rounded-[33px] px-4`;
  
  const [message, setMessage] = useState('')

  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  var [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [fileEdit, setFileEdit] = useState(null);
  const navigate = useNavigate();
  const { getAhutorization, isSessionAdmin } = useNavbar();
  var [listProduct, setListProduct] = useState([{}])

  function endFetch(){
      setListProduct([{}]);
      setData({});
      uploadProduct();
      setIsEditing(false);
      setIsEdit(false);
      setFileEdit(false);
  }

  useEffect(() => {
    if (!isSessionAdmin()) {
      console.log("si ingresas esta cosa");
      navigate("/login");
    }
    uploadProduct();
    //.catch(err => alert(err))
  }, []);

  function uploadProduct() {
    fetch(`${URLSERVER}api/products/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setListProduct(data);
        setIsLoading(false);
        //console.log(listProduct)
      });
  }

  function uploadService() {
    setMessage("Subiendo Producto, por favor espere.");
    
    const { name, price, stock, detail, benefit, howToUse, moreInfo } = data;
    if (name) {
      if (price) {
        if (stock) {
          if (file) {
            setIsEditing(true);
            setIsEdit(true);
            const formData = new FormData();
            formData.append("name", name.replaceAll("/", "-"));
            formData.append("price", price);
            formData.append("detail", detail);
            formData.append("benefit", benefit);
            formData.append("howToUse", howToUse);
            formData.append("moreInfo", moreInfo);
            formData.append("stock", stock);
            formData.append("image", file);
            formData.append("nameImage", file.name);
            try {
              fetch(`${URLSERVER}api/products/addProduct`, {
                method: "POST",
                body: formData,
                headers: {
                  Authorization: getAhutorization(),
                },
                mode: "cors",
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status === "ok") {
                    swal({
                      title: "Carga Exitosa",
                      text: "El producto se ha cargado exitosamente en el servidor",
                      icon: "success",
                      buttons: "Aceptar",
                      timer: TIMEALERT,
                    });
                    //window.location.replace("");
                    alert("Se subió correctamente el producto");
                  } else {
                    swal({
                      title: "Mensaje de error",
                      text: data.status,
                      icon: "error",
                      buttons: "Aceptar",
                      timer: TIMEALERT,
                    });
                  }
                  
                })
                .catch((err) => {
                  alert("Ocurrió un error");
                  console.log(err);
                })
                .finally(() => endFetch());
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Debe selecionar la imagen del producto");
          }
        } else {
          alert("Debe escribir el stock del producto");
        }
      } else {
        alert("Debe escribir el precio del producto");
      }
    } else {
      alert("Debe escribir el nombre del producto");
    }
  };

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  /*function replaceCharter(text){
        return 
    }*/

  function check(e) {
    const tecla = e.which ? e.which : e.keyCode;
    //console.log(tecla);
    if (tecla === 47 || tecla === 92) {
      e.preventDefault();
    }
  }

  function fillData(tmp) {
    window.scroll({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
    //console.log(tmp.name);
    varProduct = tmp;
    //console.log(varProduct)
    setIsEdit(true);
    document.getElementById("imageProduct").src = varProduct.image;
    document.getElementById("name").placeholder = varProduct.name;
    document.getElementById("price").placeholder = varProduct.price;
    document.getElementById("stock").placeholder = varProduct.stock;
    document.getElementById("detail").placeholder =
      varProduct.detail !== "undefined" ? varProduct.detail : "";
    document.getElementById("benefit").placeholder =
      varProduct.benefit !== "undefined" ? varProduct.benefit : "";
    document.getElementById("howToUse").placeholder =
      varProduct.howToUse !== "undefined" ? varProduct.howToUse : "";
    document.getElementById("moreInfo").placeholder =
      varProduct.moreInfo !== "undefined" ? varProduct.moreInfo : "";
  }

  function editData() {
    setMessage("Editando Producto, por favor espere.");
    
    const name =
      document.getElementById("name").value.length > 0
        ? document.getElementById("name").value
        : document.getElementById("name").placeholder;
    const price =
      document.getElementById("price").value.length > 0
        ? document.getElementById("price").value
        : document.getElementById("price").placeholder;
    const stock =
      document.getElementById("stock").value.length > 0
        ? document.getElementById("stock").value
        : document.getElementById("stock").placeholder;
    const detail =
      document.getElementById("detail").value.length > 0
        ? document.getElementById("detail").value
        : document.getElementById("detail").placeholder;
    const benefit =
      document.getElementById("benefit").value.length > 0
        ? document.getElementById("benefit").value
        : document.getElementById("benefit").placeholder;
    const howToUse =
      document.getElementById("howToUse").value.length > 0
        ? document.getElementById("howToUse").value
        : document.getElementById("howToUse").placeholder;
    const moreInfo =
      document.getElementById("moreInfo").value.length > 0
        ? document.getElementById("moreInfo").value
        : document.getElementById("moreInfo").placeholder;
    if (name) {
      if (price) {
        if (stock) {
          var tmpUrl;
          setIsEditing(true);
          console.log(fileEdit);
          if (fileEdit) {
            tmpUrl =
              `${URLSERVER}api/products/updateProductWithImage/` +
              varProduct._id;
            const formData = new FormData();
            formData.append("name", name.replaceAll("/", "-"));
            formData.append("price", price);
            formData.append("detail", detail);
            formData.append("benefit", benefit);
            formData.append("howToUse", howToUse);
            formData.append("moreInfo", moreInfo);
            formData.append("stock", stock);
            formData.append("image", fileEdit);
            formData.append("nameImage", fileEdit.name);
            try {
              fetch(tmpUrl, {
                method: "PUT",
                headers: {
                  Authorization: getAhutorization(),
                  //'Accept' : 'application/json',
                  //'Content-Type' : 'application/json'
                },
                body: formData,
                mode: "cors",
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status === "ok") {
                    swal({
                      title: "Carga Exitosa",
                      text: "Se editó correctamente el producto",
                      icon: "success",
                      buttons: "Aceptar",
                      timer: TIMEALERT,
                    });
                    //window.location.replace("");
                  } else {
                    swal({
                      title: "Mensaje de error",
                      text: data.status,
                      icon: "error",
                      buttons: "Aceptar",
                      timer: TIMEALERT,
                    });
                  }
                  
                })
                .catch((err) => {
                  alert("Ocurrió un error");
                  setIsEditing(false);
                  console.log(err);
                })
                .finally(() => endFetch());;
            } catch (error) {
              console.log(error);
            }
          } else {
            tmpUrl =
              `${URLSERVER}api/products/updateProductWithoutImage/` +
              varProduct._id;
            var update = {
              name: name.replaceAll("/", ""),
              price: price,
              detail: detail,
              benefit: benefit,
              howToUse: howToUse,
              moreInfo: moreInfo,
              stock: stock,
              image: varProduct.image,
            };
            try {
              fetch(tmpUrl, {
                method: "PUT",
                headers: {
                  Authorization: getAhutorization(),
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(update),
                mode: "cors",
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status === "ok") {
                    swal({
                      title: "Carga Exitosa",
                      text: "Se editó correctamente el producto",
                      icon: "success",
                      buttons: "Aceptar",
                      timer: TIMEALERT,
                    });
                    //window.location.replace("");
                  } else {
                    swal({
                      title: "Mensaje de error",
                      text: data.status,
                      icon: "error",
                      buttons: "Aceptar",
                      timer: TIMEALERT,
                    });
                  }
                  
                })
                .catch((err) => {
                  setIsEditing(false);
                  alert("Ocurrió un error");
                  console.log(err);
                })
                .finally(() => endFetch());;
            } catch (error) {
              console.log(error);
            }
          }

          //console.log(tmpUrl);
          //console.log(JSON.stringify(update));
        } else {
          alert("Debe escribir el stock del producto");
        }
      } else {
        alert("Debe escribir el precio del producto");
      }
    } else {
      alert("Debe escribir el nombre del producto");
    }
  }
  function deleteProduct(id) {
    setMessage("Eliminando Producto, por favor espere.");
    
    if (id != null) {
      if (window.confirm("¿Está seguro que quiere eliminar este producto?")) {
        setIsEditing(true);
        setIsEdit(true);
        //console.log("eliminar", id);
        const tmpUrl = `${URLSERVER}api/products/deleteState/` + id;
        try {
          fetch(tmpUrl, {
            method: "PUT",
            headers: {
              Authorization: getAhutorization(),
            },
            mode: "cors",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "ok") {
                swal({
                  title: "Carga Exitosa",
                  text: "Se eliminó correctamente el producto",
                  icon: "success",
                  buttons: "Aceptar",
                  timer: TIMEALERT,
                });
                //window.location.replace("");
              } else {
                swal({
                  title: "Mansaje de error",
                  text: data.status,
                  icon: "error",
                  buttons: "Aceptar",
                  timer: TIMEALERT,
                });
              }
              
            })
            .catch((err) => {
              alert("Ocurrió un error");
              setIsEditing(false);
              console.log(err);
            })
            .finally(() => endFetch());;
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  if (isLoading) {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  } else {
    if (isEdit) {
      if(isEditing) {
        return <LoadingText text={message} />;
      }else{
        return (
          <main className="mb-8 h-full">
            <div>
              <h2 className="text-center text-[56px] mb-8 font-semibold">
                Agregar Producto
              </h2>
              <div className="lg:flex flex-row justify-between px-[111px] h-full">
                <div className="h-[480px] w-[480px] border rounded-[15px] border-black p-8 overflow-y-scroll overflow-x-hidden">
                  <img
                    id="imageProduct"
                    className="h-52 w-52"
                    src={varProduct.image}
                    alt=""
                  ></img>
                  <div className="flex flex-col mb-4">
                    <span className="h-8 font-medium text-lg mb-4">
                      Nombre del Producto
                    </span>
                    <input
                      placeholder={varProduct.name}
                      id="name"
                      className={`h-12 ${inputClass}`}
                      type="text"
                      onKeyPress={(e) => check(e)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="h-8 font-medium text-lg mb-4">
                      Precio del Producto
                    </span>
                    <input
                      placeholder={varProduct.price}
                      id="price"
                      className={`h-12 ${inputClass}`}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="h-8 font-medium text-lg mb-4">Stock</span>
                    <input
                      placeholder={varProduct.stock}
                      id="stock"
                      className={`h-12 ${inputClass}`}
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="h-8 font-medium text-lg mb-4">
                      Detalle del Producto
                    </span>
                    <textarea
                      placeholder={
                        varProduct.detail !== "undefined" ? varProduct.detail : ""
                      }
                      id="detail"
                      className={`h-24 py-4  ${inputClass}`}
                    ></textarea>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="h-8 font-medium text-lg mb-4">
                      Beneficios del Producto
                    </span>
                    <textarea
                      placeholder={
                        varProduct.benefit !== "undefined"
                          ? varProduct.benefit
                          : ""
                      }
                      id="benefit"
                      className={`h-24 py-4  ${inputClass}`}
                    ></textarea>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="h-8 font-medium text-lg mb-4">
                      Como usar el Producto
                    </span>
                    <textarea
                      placeholder={
                        varProduct.howToUse !== "undefined"
                          ? varProduct.howToUse
                          : ""
                      }
                      id="howToUse"
                      className={`h-24 py-4  ${inputClass}`}
                    ></textarea>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="h-8 font-medium text-lg mb-4">
                      Más Información acerca del Producto
                    </span>
                    <textarea
                      placeholder={
                        varProduct.moreInfo !== "undefined"
                          ? varProduct.moreInfo
                          : ""
                      }
                      id="moreInfo"
                      className={`h-24 py-4  ${inputClass}`}
                    ></textarea>
                  </div>
                  <div className="flex justify-center items-center w-full m-2">
                    <button
                      className="m-2 flex justify-center items-center w-24 h-10 rounded-[15px] border-2 border-solid border-[#2D6BA2] bg-[#2D6BA2] text-white"
                      onClick={() => editData()}
                    >
                      Enviar
                    </button>
                    <button
                      className="m-2 flex justify-center items-center w-24 h-10 rounded-[15px] border-2 border-solid border-[#2D6BA2] bg-[#2D6BA2] text-white"
                      onClick={() => {
                        setIsEdit(false);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
                <div className="w-[480px] h-[480px]">
                  <div className="w-full h-full">
                    <InputImage2 file={fileEdit} setFile={setFileEdit} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-8 ">
              <table>
                <thead>
                  <tr className="bg-[#2D6BA2] text-white">
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {listProduct.map((product) => {
                    return (
                      <tr className="odd:bg-[#D0D0D0]">
                        <td className={`w-[700px] m-4`}>
                            {product.name}
                        </td>
                        <td className={`w-[70px] ${trClass}`}>{product.price}</td>
                        <td className={`w-[70px] ${trClass}`}>{product.stock}</td>
                        <td className={`w-[70px] ${trClass}`}>
                          <button
                            onClick={() => fillData(product)}
                            className="w-full h-full"
                          >
                            <img
                              className="w-2/4 h-2/4"
                              src={imgEditar}
                              alt="Editar"
                            />
                          </button>
                        </td>
                        <td className={`w-[70px] ${trClass}`}>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="w-full h-full"
                          >
                            <img
                              className="w-2/4 h-2/4"
                              src={imgEliminar}
                              alt="Eliminar"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </main>
        );
      }
    } else {
      return (
        <main className="mb-8 h-full">
          <div>
            <h2 className="text-center text-[56px] mb-8 font-semibold">
              Agregar Producto
            </h2>
            <div className="lg:flex flex-row justify-between px-[111px] h-full">
              <div className="h-[480px] w-[480px] border rounded-[15px] border-black p-8 overflow-y-scroll overflow-x-hidden">
                <Input
                  name="name"
                  title="Nombre del Producto"
                  placeholder="Nombre del Producto"
                  onChange={handleData}
                  onKeyPress={(e) => check(e)}
                />
                <Input
                  name="price"
                  title="Precio del Producto"
                  type="number"
                  placeholder="0.00"
                  onChange={handleData}
                />
                <Input
                  name="stock"
                  title="Stock"
                  type="number"
                  placeholder="0"
                  onChange={handleData}
                />
                <Input
                  name="detail"
                  title="Detalle del Producto"
                  placeholder="Descripción"
                  input={false}
                  onChange={handleData}
                />
                <Input
                  name="benefit"
                  title="Beneficios del Producto"
                  placeholder="Descripción"
                  input={false}
                  onChange={handleData}
                />
                <Input
                  name="howToUse"
                  title="Como usar el Producto"
                  placeholder="Descripción"
                  input={false}
                  onChange={handleData}
                />
                <Input
                  name="moreInfo"
                  title="Más Información acerca del Producto"
                  placeholder="Descripción"
                  input={false}
                  onChange={handleData}
                />
                <div className="flex justify-center items-center w-full m-2">
                  <button
                    className="flex justify-center items-center w-24 h-10 rounded-[15px] border-2 border-solid border-[#2D6BA2] bg-[#2D6BA2] text-white"
                    onClick={() => uploadService()}
                  >
                    Enviar
                  </button>
                </div>
              </div>
              <div className="w-[480px] h-[480px]">
                <div className="w-full h-full">
                  <InputImage2 file={file} setFile={setFile} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-8 ">
            <table>
              <thead>
                <tr className="bg-[#2D6BA2] text-white">
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {listProduct.map((product) => {
                  return (
                    <tr className="odd:bg-[#D0D0D0] h-[50px]">
                      <td className={`w-[700px] m-4`}>
                          {product.name}
                      </td>
                      <td className={`w-[70px] ${trClass}`}>{product.price}</td>
                      <td className={`w-[70px] ${trClass}`}>{product.stock}</td>
                      <td className={`w-[70px] ${trClass}`}>
                        <button
                          onClick={() => fillData(product)}
                          className="w-full h-full"
                        >
                          <img
                            className="w-2/4 h-2/4"
                            src={imgEditar}
                            alt="Editar"
                          />
                        </button>
                      </td>
                      <td className={`w-[70px] ${trClass}`}>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="w-full h-full"
                        >
                          <img
                            className="w-2/4 h-2/4"
                            src={imgEliminar}
                            alt="Eliminar"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      );
    }
  }
}
