import React from 'react'

const Buttons = (props) => {
    return (
        <div>
            <div className='flex justify-center gap-10 self-center mt-3'>
                <button className='bg-amber-500 px-4 p-1 rounded active:scale-90'
                    id='prev'
                    onClick={() => {
                        if (props.index > 1) {
                            props.setUserData([]);
                            props.setIndex(props.index - 1)
                        }
                    }}
                >Prev</button>
                <h1 className='bg-gray-500 inline-block px-2 rounded opacity-70'>Page - {props.index}</h1>
                <button className='bg-amber-500 px-4 p-1 rounded active:scale-90'
                    onClick={() => {
                        props.setUserData([]);
                        props.setIndex(props.index + 1)
                    }}
                >Next</button>
            </div>
        </div>
    )
}

export default Buttons