import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({pages,page,isAdmin=false,keyword}) => {
  return pages>1 && (
    <nav>
        <ul className="pagination">
            <li className={`page-item ${page===1 && "disabled"}`}>
                <Link className="page-link" to={(keyword)?`/search/${keyword}/page/${page-1}`:`/page/${page-1}`} tabIndex={-1} >Previous</Link>
            </li>
            {[...Array(pages).keys()].map(x=>(
                <li className={`page-item ${(x+1)===page && "active"}`} key={x+1}>
                    <Link 
                      className="page-link" 
                      to={!isAdmin ? (x+1)===1? "/":((x+1)>1 && keyword)?`/search/${keyword}/page/${(x+1)}`:`/page/${(x+1)}`:`/admin/productList/page/${(x+1)}`}>
                        {(x+1)}
                    </Link></li>
            ))}
        <li className={`page-item ${page===pages && "disabled"}`}>
            <Link className="page-link" to={(keyword)?`/search/${keyword}/page/${page+1}`:`/page/${page+1}`} disabled={page===pages?true:false}>Next</Link>
        </li>
        </ul>
    </nav>  
  )
}

export default Paginate