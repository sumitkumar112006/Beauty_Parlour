import React from 'react'

const Cards = (props) => {
    console.log(props);
    
    return (
        <div>
            <a href={props.elem.url} target='_blank'>
                <div className='h-60 w-74 rounded-2xl overflow-hidden'>
                    <img className='h-full w-full object-cover' src={props.elem.download_url} alt="" />
                </div>
                <h1>{props.elem.author}</h1>
            </a>
        </div>
    )
}

export default Cards