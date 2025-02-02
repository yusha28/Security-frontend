import React from 'react'

const NotFound = () => {
  return (
    <section className='page notfound'>
        <div className='content'>
            <img src='/notfound.png' alt='notfound'></img>
            <Link to={"/"}>Return To Home</Link>
        </div>
    </section>
  )
}

export default NotFound