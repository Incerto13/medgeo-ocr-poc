import React, { useState } from 'react';
import './ViewFinderOverlayModal.css';


export const ViewFinderOverlayModal = () => {
    return (
<>        <div
            // left
            className='backdrop'
            style={{
                top: '0%',
                position: 'fixed',
                height: '100%',
                width: '30%',
                zIndex: '100',  
            }}
        ></div>
        <div
            // top
            className='backdrop'
            style={{
                top: '0%',
                left: '30%',
                position: 'fixed',
                height: '25%',
                width: '40%',
                zIndex: '50',  
            }}
        >
        </div>
        {/* <div
            // bottom
            className='backdrop'
            style={{
                top: '50%',
                left: '30%',
                position: 'fixed',
                height: '50%',
                width: '40%',
                zIndex: '50',  
            }}
        >
        </div> */}
        <div
            // right
            className='backdrop'
            style={{
                top: '0%',
                left: '70%',
                position: 'fixed',
                height: '100%',
                width: '30%',
                zIndex: '50',  
            }}
        >
        </div>
        <div
            className='focus'
            style={{
                top: '25%',
                left: '30%',
                position: 'fixed',
                borderStyle: 'solid',
                borderColor: 'green',
                borderWidth: '2px',
                height: '25%',
                width: '39.8%',
                zIndex: '100',  
            }}
        >
        </div>
    </>
    )
}