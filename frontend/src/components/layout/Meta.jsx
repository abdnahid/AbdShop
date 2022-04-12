import React from 'react'
import {Helmet} from "react-helmet";

const Meta = ({title,description,keywords}) => {
  return (
    <div className="application">
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    </div>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Abdshop',
    description: 'We sell best tech products and deliver to your doorstep',
    keywords: 'tech, technology, electronics, headphones, laptop, gadgets'
}

export default Meta