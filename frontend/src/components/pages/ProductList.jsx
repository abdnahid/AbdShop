import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Loading from '../layout/Loading';
import Message from '../layout/Message';
import { fetchProducts, productCreate, productDelete } from '../../actions/productListActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PRODUCT_CREATE_RESET } from '../../actions/types';


const ProductList = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const loginState = useSelector((state)=>state.userLogin);
    const {userInfo}=loginState;
    const productDeleteState = useSelector((state)=>state.productDelete);
    const {message,error:deleteError,loading:deleteLoading} = productDeleteState
    const productCreateState = useSelector((state)=>state.productCreate);
    const {product,error:createError,loading:createLoading} = productCreateState
    useEffect(()=>{
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/");
        }else{
            dispatch(fetchProducts());
        }
        //eslint-disable-next-line
    },[userInfo]);
    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if (message) {
            toast.success(message);
        }else if (product) {
            navigate(`/admin/products/${product._id}`);
        }
        //eslint-disable-next-line
    },[message,product]);
    const productListState = useSelector((state)=>state.productList);
    const {loading,products,error} = productListState;
    const handleDelete=(id)=>{
        if (window.confirm('Are you sure?')) {
        dispatch(productDelete(id));
        dispatch(fetchProducts());
        }
    }
    const handleCreate=()=>{
        dispatch(productCreate());
    }
  return (
      <div className="container">
        <section className="my-orders">
            <ToastContainer position="bottom-right" autoClose={2000}/>
            {loading?
            <Loading /> : error ?
            <Message type="danger" message={error}/> : (
                <>
                    <div className="row row-no-padding my-30">
                        <div className='col'>
                            <h2>Products</h2>
                        </div>
                        <div className='col text-end'>
                            {createLoading ? <Loading/> : <button className='btn btn-dark' onClick={handleCreate}><i className="fa-solid fa-plus" /> Create Product</button>}
                        </div>
                    </div>
                    <div className="product-list my-50">
                        <table className="table table-light table-striped">
                            <thead>
                                <tr className='text-center'>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Inventory</th>
                                <th scope="col">Manage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product,index)=>(
                                    <tr key={index} className='text-center'>
                                        <th scope="row">{(product._id.slice(19,24))}</th>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>$ {product.price}</td>
                                        <td>{product.countInStock}</td>
                                        <td>
                                            <div className='d-flex justify-content-center'>
                                                {deleteLoading ? <Loading/> : (
                                                    <button className='btn mx-1 btn-outline-danger' onClick={()=>handleDelete(product._id)}>
                                                        <i className="fa-solid fa-trash-can" />
                                                    </button>
                                                )}
                                                <Link to={`/admin/products/${product._id}`}><i className="fa-solid fa-pen-to-square" /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
                )}
        </section>
      </div>
  )
};

export default ProductList;
