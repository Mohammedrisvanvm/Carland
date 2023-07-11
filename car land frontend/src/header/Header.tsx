import './header.css'
function Header():JSX.Element {
  return (
   <>
  
  <div className="box">
        <div className="header-wrapper">
          <header className="header">
            <div className="text-wrapper">menu</div>
            <img className="link" alt="Link" src="" />
            <div className="nav-list">
              <div className="item-link">
                <img className="img" alt="Img" src="" />
                <div className="div">Become a Host</div>
              </div>
              <div className="item-link-login">Login/Signup</div>
            </div>
          </header>
        </div>
      </div>

   </>
  )
}

export default Header
