import {useNavigate} from "react-router-dom";
import "./Homepage.css";
import logo from "../../resources/imgs/logo.png";
import kids from "../../resources/imgs/kids.png";
import slogan from "../../resources/imgs/slogan.png";
import qrcode from "../../resources/imgs/qrcode.png";


const Logo = () => {
  return (
    <div id="logo" className="absolute top-10 left-10">
      <img src={logo} alt="logo"/>
    </div>
  )
}

const Kids = () => {
  return (
    <div id="kids" className="absolute bottom-10 left-[3rem] w-[200px]">
      <img src={kids} alt="kids"/>
    </div>
  )
}

const Slogan = () => {
  return (
    <div id="Slogan" className="absolute top-[18%] left-[35%] w-[50%]">
      <img src={slogan} alt="slogan"/>
    </div>
  )
}

const Qrcode = () => {
  return (
    <div id="qrcode" className="absolute bottom-[18%] right-[10%] w-24">
      <img src={qrcode} alt="qrcode"/>
    </div>
  )
}
const Homepage = () => {
  const navigate = useNavigate();

  const enterEvent = () => {
    navigate("/Lists");
  }

  return (
    <div className="homepage">
      <div className="home relative">
        <Logo/>
        <Kids/>
        <Slogan/>
        <Qrcode/>

        <div className="enter absolute bottom-[26%] right-[30%] text-3xl text-center">
          <span className="container bg-white inline-block text-center">
            <input type="button" value="点击进入" onClick={enterEvent} className="cursor-pointer"/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;