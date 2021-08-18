import React from "react";
import styled from "styled-components";
import { Link, HashRouter } from "react-router-dom";

const Head = styled.header`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 7rem;
    border-bottom: 1px solid #D1D1D1D1;
`
const HeadLogo = styled.div`
    width: 15rem;
    margin-left: 12.5%;
`
const HeadNav = styled.ul`
    display: flex;
    justify-content: space-evenly;
    height: 100%;
    flex-basis: 50%;
`
const NavMenu = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: auto;
    width: 15%;
    text-align: center;
    &.dropdown > ul{
        max-height : 20rem;
    }
`
const NavLink = styled(Link)`
    font-size: 1.1rem;
    font-weight: 700;
    padding: 1em;
`
const SubMenu = styled.ul`
    display : flex;
    position: absolute;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    max-height: 0;
    height : 13rem;
    width: 10rem;
    color : #444444;
    font-weight : 700;
    overflow: hidden;
    top: 85%;
    border: none;
    border-radius : 25px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: all .3s;
    background-color : #ffffff;
    z-index : 15;
    & > li {
        display : flex;
        align-items : center;
        justify-content : flex-start;
        transition : all .2s;
        padding-left : 1.5em;
        width : 100%;
        height : 25%;
        cursor: pointer;
        &:hover::before{
            content : "";
            position : absolute;
            left : 0;
            width : 5px;
            height : 20%;
            background-color : #66A6FF;
        }
        &:hover::after{
            content : "▶";
            margin : 0 1.5rem 0 auto;
            font-size : 0.7rem;
            color : #66A6FF;
        }
    }
`
const SignBox = styled.ul`
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items : center;
    height: 100%;
    width: 10%;
    & > li {
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & > li img {
        width : 3rem;
        cursor: pointer;
    }
    & > li ul {
        position: absolute;
        display : flex;
        flex-direction : column;
        align-items : center;
        justify-content : center;
        /* padding: 1em; */
        max-height: 0;
        width : 13rem;
        height : 10rem;
        background-color: #ffff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius : 25px;
        top: 5.5rem;
        overflow: hidden;
        z-index: 15;
        transition : all .3s;
        cursor: pointer;
    }
    & li.dropdown ul {
        max-height : 15rem;
    }
    & > li ul > li {
        display : flex;
        align-items : center;
        justify-content : flex-start;
        padding-left : 1.5em;
        font-weight: 700;
        width: 100%;
        height : 33%;
        &:hover::before{
            content : "";
            position : absolute;
            left : 0;
            width : 5px;
            height : 20%;
            background-color : #66A6FF;
        }
    }
`

function Header() {

    const dropdown = (e) => {
        e.currentTarget.classList.add("dropdown");
    }
    const closeDropdown = (e) => {
        e.currentTarget.classList.remove("dropdown");
    }

    return (
        <HashRouter>
            <Head>
                <HeadLogo>
                    <Link to="/">
                        <img src="Images/logos/logo_horizontal.svg" alt="horizontal_logo" />
                    </Link>
                </HeadLogo>
                <HeadNav className="header_nav">
                    <NavMenu onMouseEnter={dropdown} onMouseLeave={closeDropdown}>
                        <NavLink to="#">커뮤니티</NavLink>
                        <SubMenu>
                            <li>자유 게시판</li>
                            <li>대륙</li>
                            <li>여행</li>
                        </SubMenu>
                    </NavMenu>
                    <NavMenu >
                        <NavLink to="#">해외교 평가</NavLink>
                    </NavMenu>
                    <NavMenu >
                        <NavLink to="#">도움문의</NavLink>
                    </NavMenu>
                </HeadNav>
                <SignBox>
                    <li onMouseEnter={dropdown} onMouseLeave={closeDropdown}>
                        <img src="Images/signup_modal/user_circle.svg" alt="user"/>
                        <ul>
                            <li id="header_signup_login">로그인</li>
                            <li id="header_signup_regist">회원가입</li>
                        </ul>
                    </li>
                </SignBox>
            </Head>
        </HashRouter>
    )
}

export default Header;