import React, { useEffect, useState } from "react"
import {
  Menu,
  MenuItem,
  ProSidebarProvider,
  Sidebar,
  useProSidebar
} from "react-pro-sidebar"
import Image from "../Image"
import { Images } from "../../theme/Images"

// Routing
import { useLocation } from "react-router-dom"
import { routes } from "../../Router"

// Redux
import { logOut } from "../../pages/AuthScreens/Login/redux/action"
import { history } from "../../reduxStore/store"
import { connect } from "react-redux"

// Style
import "./style.scss"

const SidebarLayout = props => {
  const { loginInfo, cardFlex, setCardFlex } = props
  const { collapseSidebar, toggleSidebar } = useProSidebar()
  const [activeElement, setActiveElement] = useState("")
  const location = useLocation()

  useEffect(() => {
    setActiveElement(location.pathname)
  }, [location.pathname])

  const logOut = () => {
    props.logOut()
    localStorage.clear()
  }

  // const onPush = () => {
  //   if (loginInfo?.user?.user_type === "admin") {
  //     history.push("/recruiter/support/")
  //   } else {
  //     history.push(`/${loginInfo?.user?.user_type}/feedback/`)
  //   }
  // }

  // const feedbackPath = `/${loginInfo?.user?.user_type}/feedback/`
  // const supportPath = `/${loginInfo?.user?.user_type}/support/`

  return (
    <>
      <Sidebar customBreakPoint="992px" className="sidebar">
        <div className="top-menu">
          <Menu>
            {routes.map(
              item =>
                item.isShow === 'admin' && (
                  <MenuItem
                    className={`menu-item ${item.layout + item.path === activeElement
                      ? "active-menu-item"
                      : ""
                      }`}
                    onClick={() => {
                      history.push(item.layout + item.path)
                    }}
                  >
                    <div className="icon-text">
                      <Image src={item.iconSrc} />
                      <div className="text">{item.name}</div>
                    </div>
                  </MenuItem>
                )
            )}
          </Menu>
        </div>
        {/* <div className="bottom-menu">
          <Menu>
            <MenuItem className="menu-item">
              <div className="icon-text">
                <Image src={Images.supportIcon} />
                <div className="text">{"Support"}</div>
              </div>
            </MenuItem>
          </Menu>
        </div> */}
      </Sidebar>
      {/* <main className="toggle-sidebar-icon">
        <img src={toggleIcon} alt="" onClick={() => toggleSidebar()} />
      </main> */}
    </>
  )
}

const SidebarMenu = ({ logOut, loginInfo, cardFlex, setCardFlex }) => {
  return (
    <ProSidebarProvider>
      {
        <SidebarLayout
          cardFlex={cardFlex}
          setCardFlex={setCardFlex}
          logOut={logOut}
          loginInfo={loginInfo}
        />
      }
    </ProSidebarProvider>
  )
}
const mapStateToProps = state => ({
  loginInfo: state.login.loginInfo
})

const mapDispatchToProps = dispatch => ({
  logOut: data => dispatch(logOut(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)
