import React ,{useState, useEffect} from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

const Section1 = styled.div`
    width : 75vw;
    margin: 4.3em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const SearchBar = styled.div`
    z-index: 10;
    position: relative;
    display: flex;
    border: 1px solid #E5E5E5;
    border-radius: 50px;
    width: 100%;
    height: 11vh;
    margin: 0 auto 5% auto;
    background-color: #FFFFFF;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
`
const Container = styled.div`
    position: relative;
    flex-basis: 35%;
`
const Options = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10%;
    height: 100%;
    width: 100%;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
        background-color: #DDDDDD;
    }
`
const OptionsTitle = styled.div`
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 13px;
`
const KoUnivInput = styled.input`
    outline: none;
    border: none;
    width: 90%;
    padding: 0;
    font-size: 1.1rem;
    color: #444444, 50%;
    background-color: transparent;
    &::placeholder{
        font-size: 1.1rem;
        color:rgba(68, 68, 68, 0.5);
    }
`
const NormalInput = styled.div`
    border: none;
    padding: 0;
    max-width: 65%;
    background-color: transparent;
    font-size: 1.1rem;
    color:rgba(68, 68, 68, 0.5);
`
const Bar = styled.span`
    margin: auto;
    background-color: #E5E5E5;
    width: 1px;
    height: 47px;
`
const PopUp = styled.div`
    position: absolute;
    z-index: 10 !important;
    display: block;
    top: 7rem;
    font-weight: 700;
    background-color: #FFFFFF;
    border-radius: 20px;
    padding: 2em;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    &.koUniv{
        left : 50%;
        transform : translateX(-50%);
    }
    &.continent{
        left : 50%;
        transform : translateX(-50%);
    }
    &.country{
        max-height: 20rem;
        overflow: scroll;
        padding : 2em 1em;
        right : 0;
    }
    & > p {
        font-size : 1.1rem;
        margin-bottom: 2rem;
        text-align : center;
        & > .hl{
            color : #66A6FF;
        }
    }
    & > .koUnivLists {
        width: 18rem;
        & > li {
            display: block;
            font-size: 1.1rem;
            text-align : center;
            border-bottom: 1px solid #D8D8D8;
            height: 3.8rem;
            line-height: 3.8rem;
            padding-bottom: 0.1rem;
            /* margin-bottom: 1rem; */
            cursor: pointer;
            &:hover {
                background-color :#E5E5E5;
                color : #66A6FF;
            }
        }
    }
    &> .continentLists {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        width: 35rem;
        overflow: scroll;
        & > li {
            flex-shrink: 0;
            margin: 0 0.9rem;
            font-size: 1.1rem;
            text-align: center;
            line-height: 7rem;
            width: 7rem;
            height: 7rem;
            border: 3px solid #D1D1D1;
            box-sizing: border-box;
            border-radius: 25px;
            cursor: pointer;
        }
        & .selected {
            transition: all .2s;
            border: 3px solid #66A6FF;
            color: #66A6FF;
        }
    }
    & > .countryLists {
        display: flex;
        width: 30rem;
        flex-wrap: wrap;
        padding: 0 1em;
        overflow: scroll;
        & .selected {
            transition: all .1s;
            color: #66A6FF;
        }
        & > li {
            position: relative;
            text-align: left;
            height: 3rem;
            line-height: 3rem;
            width: 50%;
            border-bottom: 1px solid #D1D1D1;
            cursor: pointer;
            &:hover{
                background-color: #E5E5E5;
                color: #66A6FF;
                border-radius: 10px;
            }
            &::before {
                content: "";
                background-image: url('Images/main_view/location.png');
                background-size: 25px;
                width: 25px;
                height: 25px;
                display: inline-block;
                margin-right: 1em;
                margin-left: 1em;
                transform: translateY(20%);
            }
        }
    }
`
const SearchButton = styled.button`
    display : flex;
    align-items : center;
    justify-content : center;
    position: absolute;
    border: none;
    border-radius: 50px;
    width: 130px;
    height: 84px;
    right: 1%;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(180deg, #89F7FE 0%, #66A6FF 100%);
    color: ghostwhite;
    font-size: 2rem;
    font-weight: bold;
    transition: all .5s;
    cursor: pointer;
`

function Top(){
    const [clickedOptions, setClickedOptions] = useState();
    const [optionData, setOptionData] = useState([]);
    const togglePopup = (name) =>{
        axios.get('/api/getKoUnivs')
        .then((res)=>console.log(res.data))
        return (setClickedOptions(name))
    };

    return (
        <Section1>
            <SearchBar>
                <Container tabIndex="1" className="container" onClick={()=>togglePopup("koUniv")} onBlur={()=>setClickedOptions("")}>
                    <Options className="koUniv">
                        <OptionsTitle>재학 중인 대학교</OptionsTitle>
                        <KoUnivInput className="koUnivInput" type="text" name="koUniv" placeholder="현재 재학 중인 대학을 입력하세요"
                            autoComplete="off" />
                    </Options>
                {clickedOptions === "koUniv" ? <PopUp className="popup koUniv">
                    <p><span className="ignore hl">대학</span>을 선택해주세요</p>
                    <ul className="koUnivLists">
                        <li>경희대학교</li>
                        <li>고려대학교</li>
                        <li>국민대학교</li>
                    </ul>
                </PopUp> : ""}
                </Container>
                <Bar className="bar"></Bar>
                <Container tabIndex="1" className="continent" onClick={()=>togglePopup("continent")} onBlur={()=>setClickedOptions("")}>
                    <Options className="continent">
                        <OptionsTitle>대륙</OptionsTitle>
                        <NormalInput className="continentInput">어느 대륙을 선호하시나요?</NormalInput>
                    </Options>
                    {clickedOptions === "continent" ? 
                    <PopUp className="popup continent">
                        <p><span className="hl">대륙</span>을 선택해주세요</p>
                        <ul className="continentLists">
                            <li>남미</li>
                            <li>북미</li>
                            <li>아시아</li>
                            <li>유럽</li>
                        </ul>
                    </PopUp> : ""}
                </Container>
                <Bar className="bar"></Bar>
                <Container tabIndex="1" className="country" onClick={()=>togglePopup("country")} onBlur={()=>setClickedOptions("")}>
                    <Options className="country">
                        <OptionsTitle>국가</OptionsTitle>
                        <NormalInput className="countryInput">어느 국가를 선호하시나요?</NormalInput>
                    </Options>
                    <SearchButton className='section1_search_button' type="submit" onclick="searchByOptions()">
                        <FiSearch></FiSearch>
                    </SearchButton>
                    {clickedOptions === "country" ? 
                    <PopUp className="popup country">
                        <p><span className='hl'>국가</span>를 선택해주세요</p>
                        <ul className="countryLists">
                            <li>미국</li>
                            <li>말레이시아</li>
                            <li>브라질</li>
                            <li>벨기에</li>
                            <li>스위스</li>
                            <li>스페인</li>
                            <li>이탈리아</li>
                            <li>중국</li>
                        </ul>
                    </PopUp>:""}
                </Container>
            </SearchBar>
        </Section1>
    )
}

export default Top;