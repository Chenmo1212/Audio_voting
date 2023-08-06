import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Lists.css";
import slogan from "../../resources/imgs/slogan-yellow.png";
import userInfo from "../../resources/data/userInfo"

const Background = () => {
  return (
    <div className="lists-bg absolute top-0 left-0"></div>
  )
}

const UserList = (props) => {
  console.log(props)
  return (
    <div className="userList">
      {userInfo.map((item, index) => (
        <div
          key={index}
          className={
            "user w-full h-12 text-center cursor-pointer " +
            (props.isActiveIndex === index ? "is-active" : "")
          }
          onClick={() => props.changeUser(index)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

const Left = (props) => {
  console.log("1", props)
  return (
    <div className="left text-center">
      <div className="slogan w-3/5 inline-block mt-8 mb-4">
        <img src={slogan} alt="slogan"/>
      </div>

      <UserList isActiveIndex={props.isActiveIndex}
                changeUser={props.changeUser}/>
    </div>
  )
}

const Right = (props) => {
  const navigate = useNavigate();
  let currentUser = userInfo[props.isActiveIndex]

  const toPlayer = () => {
    navigate("/PlayerList/" + currentUser.id)
  }
  return (
    <div className="right flex w-full relative">
      <div className="info w-2/5">
        <div className="title text-[3rem]">
          {currentUser.name}
        </div>
        <div className="underline h-[5px] w-[6rem] mt-4 ml-0 mb-[4rem]"></div>

        <div className="desc mb-12">
          {currentUser.desc}
        </div>

        <div className="enter text-xl">
          <input type="button" value="查看" className="cursor-pointer" onClick={toPlayer}/>
        </div>
      </div>
      <div className="avatar w-3/5 h-full flex justify-center items-center"
           style={{'backgroundImage': 'url(' + currentUser.avatar + ')'}}>
      </div>
    </div>
  )
}

const Content = () => {
  const [isActiveIndex, setActiveIndex] = useState(0);

  const changeUser = (index) => {
    setActiveIndex(index);
  }
  return (
    <div className="content flex absolute bg-white w-[90%] h-[90%] top-[5%] left-[5%]">
      <Left
        isActiveIndex={isActiveIndex}
        changeUser={changeUser}
      />
      <Right isActiveIndex={isActiveIndex}/>
    </div>
  )
}

const Lists = () => {
  return (
    <div className="lists">
      <Background/>
      <Content/>
    </div>
  );
};

export default Lists;