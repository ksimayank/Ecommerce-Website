import React,{useRef,useEffect} from "react";
import "./header.css";
import logo from "../../assets/images/eco-logo.png";
import { Container, Nav, Row } from "reactstrap";
import { NavLink ,useNavigate} from "react-router-dom";
import userIcon from "../../assets/images/user-icon.png";

import { useSelector } from "react-redux";

import { motion } from "framer-motion";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {

  
  const headerRef=useRef(null)
  const totalQuantity=useSelector(state=>state.cart.totalQuantity)
  const menuRef=useRef(null)
  const navigate=useNavigate()


  const stickyHeaderFunc=()=>{
    window.addEventListener('scroll',()=>{
      if (document.body.scrollTop>80 || document.documentElement.scrollTop>80){
        headerRef.current.classList.add('sticky_header')
      }else{
        headerRef.current.classList.remove('sticky_header')

      }
    })
  }

  useEffect(()=>{

    stickyHeaderFunc()
    return()=>window.removeEventListener('scroll',stickyHeaderFunc)

  })

const menuToggle=()=>menuRef.current.classList.toggle('active_menu')

const navigateToCart=()=>{
  navigate('/cart')

}

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="" />
              <div>
                <h1>Split Essential</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_icons">
              <span className="fav_icon">
                <i class="ri-heart-fill"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart_icon" onClick={navigateToCart}>
                <i class="ri-shopping-cart-2-fill"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <span>
                <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
              </span>
              <div className="mobile_menu">
              <span onClick={menuToggle}>
                <i class="ri-menu-fill"></i>
              </span>
            </div>
            </div>
           
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
