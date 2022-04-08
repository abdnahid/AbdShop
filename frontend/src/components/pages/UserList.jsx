import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Loading from '../layout/Loading';
import Message from '../layout/Message';
import { userDelete, userLists } from '../../actions/userActions';


const UserList = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const loginState = useSelector((state)=>state.userLogin);
  const {userInfo}=loginState
  const deleteState = useSelector((state)=>state.userDelete);
  useEffect(()=>{
      if (!userInfo || !userInfo.isAdmin) {
          console.log("hello")
          navigate("/");
      }else{
          dispatch(userLists());
      }
      //eslint-disable-next-line
  },[userInfo,dispatch]);
  const userListState = useSelector((state)=>state.userList);
  const {loading,users,error}=userListState;
  const handleDelete=(id)=>{
      if (window.confirm('Are you sure?')) {
        dispatch(userDelete(id));
      }
  }
  return (
      <div className="container">
        <section className="my-orders">
            {loading?
            <Loading /> : error ?
            <Message type="danger" message={error}/> : (
                <div className='col-12 py-5'>
                    <h3 className='text-start'>Users</h3>
                    <table className="table table-light table-striped">
                        <thead>
                            <tr className='text-center'>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Admin</th>
                            <th scope="col">Edit & Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,index)=>(
                                <tr key={index} className='text-center'>
                                    <th scope="row">{(user._id.slice(19,24))}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin?<i className="fas fa-check text-success" />:<i className="fa-solid fa-xmark text-danger" />}</td>
                                    <td>
                                        <div className='d-flex justify-content-center'>
                                            <button className='btn mx-1 btn-outline-danger' type='button' onClick={()=>handleDelete(user._id)}><i className="fa-solid fa-trash-can" /></button>
                                            <Link to={`/admin/user/${user._id}`}><i className="fa-solid fa-pen-to-square" /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
        </section>
      </div>
  )
};

export default UserList;
