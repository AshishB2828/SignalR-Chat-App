import React from 'react'

const ConnectedUsers = ({ users }) => {
    return (
        <div className='user-list'>
            <h4>Connected Users</h4>
            {
                users && users.map((user, i) => <h6 key={i}>{ user }</h6>)
            }
        </div>
    )
}

export default ConnectedUsers