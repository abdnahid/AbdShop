import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productUpdate,fetchProduct } from '../../actions/productListActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductEditAdmin = () => {
    const dispatch = useDispatch();
    const {id}=useParams();
    const navigate = useNavigate();
    const [name,setName]= useState("");
    const [image,setImage]= useState("");
    const [description,setDescription]= useState("");
    const [brand,setBrand]= useState("");
    const [category,setCategory]= useState("");
    const [price,setPrice]= useState(0);
    const [countInStock,setCountInStock]= useState(0);
    const [uploading,setUploading]= useState(false);
    const productState = useSelector((state)=>state.productList.currentProduct);
    const loginState = useSelector((state)=>state.userLogin);
    const {userInfo}=loginState;
    const productUpdateState = useSelector(state=>state.productUpdate);
    useEffect(()=>{
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/");
        }else if(!productState.name){
            dispatch(fetchProduct(id));
        }else{
            setName(productState.name);
            setImage(productState.image);
            setDescription(productState.description);
            setBrand(productState.brand);
            setCategory(productState.category);
            setPrice(productState.price);
            setCountInStock(productState.countInStock);
        }
        if (productUpdateState.updatedProduct) {
            navigate("/admin/productList");
        }
        //eslint-disable-next-line
    },[userInfo,productUpdateState,productState]);
    const handleUpdate=(e)=>{
        e.preventDefault();
        dispatch(productUpdate({id,name,image,description,brand,category,price,countInStock}));
    }
    const fileUploadHandler= async(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image',file)
        setUploading(true)
        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            }
            const {data} = await axios.post('/api/uploads',formData,config);
            setImage(data)
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false)
        }
        
    }
  return <>
            <div className="container my-40" style={{minHeight:'80vh'}}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 py-20">
                        <h2 className='text-center'>Update Product Information</h2>
                        <form onSubmit={handleUpdate} className='update-form my-5'>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updateName">
                                        <i className="fas fa-user" />
                                    </label>
                                </div>
                                <div className="input-field column-90">
                                    <input id="updateName" type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updateImage">
                                    <i className="fas fa-envelope" />
                                    </label>
                                </div>
                                <div className="input-field column-90">
                                    <input id="updateImage" type="text" placeholder="Upload product image" value={image} onChange={(e)=>setImage(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-field">
                                    <input className="uploadImage" type="file" onChange={fileUploadHandler}/>
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updateDescription">
                                    <i className="fas fa-envelope" />
                                    </label>
                                </div>
                                <div className="input-field column-90">
                                    <input id="updateDescription" type="text" placeholder="Detailed info of the product" value={description} onChange={(e)=>setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updateBrand">
                                    <i className="fas fa-envelope" />
                                    </label>
                                </div>
                                <div className="input-field column-90">
                                    <input id="updateBrand" type="text" placeholder="Product Brand" value={brand} onChange={(e)=>setBrand(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updateCategory">
                                    <i className="fas fa-envelope" />
                                    </label>
                                </div>
                                <div className="input-field column-90">
                                    <input id="updateCategory" type="text" placeholder="Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updatePrice">
                                    <i className="fas fa-envelope" />
                                    </label>
                                </div>
                                <div className="input-field column-90">
                                    <input id="updatePrice" type="text" placeholder="Price for the product" value={price} onChange={(e)=>setPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="input-box flexbox">
                                <div className="input-icon column-10">
                                    <label htmlFor="updateCountInStock">
                                    <i className="fas fa-envelope" />
                                    </label>
                                </div>
                                <div className="input-field column-90">
                                    <input id="updateCountInStock" type="text" placeholder="Product count in stock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} />
                                </div>
                            </div>
                            <div className="button-submit">
                                <button type="submit" className="block">Update Product</button>
                            </div>
                            <ToastContainer position="bottom-right" autoClose={2000}/>
                        </form>       
                    </div>
                </div>
            </div>
        </>;
};

export default ProductEditAdmin;

