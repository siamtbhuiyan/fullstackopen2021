import React from 'react'

const Notification = ({ message, errorMessage }) => {
    const notificationStyle = {
        color: "green",
    }
    const errorStyle = {
        color: "red",
    }  
    return (
        <div>
            <div style={notificationStyle}>
                <h2>{message}</h2>
            </div>
            <div style={errorStyle}>
                <h2>{errorMessage}</h2>
            </div>
        </div>
    )
    
}

export default Notification
