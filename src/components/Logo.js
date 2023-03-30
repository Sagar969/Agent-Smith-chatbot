import logo from '../assets/icons/logo.jpg'

const Logo = () => {
  return (
    <div className='logo-container'>
        <img src={logo} alt="" className='logo-icon'/>
        <p className='logo-text'>Agent Smith</p>
    </div>
  )
}

export default Logo