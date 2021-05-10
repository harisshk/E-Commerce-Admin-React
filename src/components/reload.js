import React from 'react'

export const Reload = (props) => {
    const {href}=props
    return (
        <div style={{ width: '100%', height: '100px', marginTop: '300px' }} >

            <p style={{
                display: 'block', marginLeft: 'auto',
                marginRight: 'auto', textAlign: 'center'
            }}>Looks like Server Down!!
<br /><a href={href}>
                    Try Reloading the page
</a></p>

        </div>
    )
}
export default Reload