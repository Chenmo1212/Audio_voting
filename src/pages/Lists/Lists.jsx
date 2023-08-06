import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Lists.css";
import slogan from "../../resources/imgs/slogan-yellow.png";

const Background = () => {
  return (
    <div className="lists-bg absolute top-0 left-0"></div>
  )
}

const userInfo = [
  {
    "name": "王清竹",
    "id": "001",
    "desc": "一个聪明可爱的小朋友\n拥有着灿烂的笑容和友善的个性\n喜欢阅读 探索自然 善于与人沟通",
    "url": "https://chenmo1212.cn",
    "avatar": "https://img.btstu.cn/api/images/5a2f88928b264.jpg"
  },
  {
    "name": "张晓",
    "id": "002",
    "desc": "喜欢音乐和绘画\n热爱大自然\n热心助人",
    "url": "https://zhangxiao.com",
    "avatar": "https://img.btstu.cn/api/images/5b57f2f78c206.jpg"
  },
  {
    "name": "李明",
    "id": "003",
    "desc": "爱读书 爱旅行\n喜欢尝试新鲜事物\n积极向上",
    "url": "https://liming.com",
    "avatar": "https://img.btstu.cn/api/images/5a041f3b95237.jpg"
  },
  {
    "name": "陈静",
    "id": "004",
    "desc": "热爱运动\n喜欢健身和跑步\n乐观开朗",
    "url": "https://chenjing.me",
    "avatar": "https://img.btstu.cn/api/images/5a0939823d03e.jpg"
  },
  {
    "name": "刘涛",
    "id": "005",
    "desc": "喜欢烹饪美食\n爱看电影\n善于交际",
    "url": "https://liutao.net",
    "avatar": "https://img.btstu.cn/api/images/5a0a954e7ebe9.jpg"
  },
  {
    "name": "赵丽",
    "id": "006",
    "desc": "热爱动物\n擅长绘画\n热心公益",
    "url": "https://zhaoli.com",
    "avatar": "https://img.btstu.cn/api/images/5a2f88928b264.jpg"
  },
  {
    "name": "杨洋",
    "id": "007",
    "desc": "喜欢写作\n爱好摄影\n乐于分享",
    "url": "https://yangyang.io",
    "avatar": "https://img.btstu.cn/api/images/5b57f2f78c206.jpg"
  },
  {
    "name": "张雅",
    "id": "008",
    "desc": "热爱自然\n喜欢户外活动\n性格开朗",
    "url": "https://zhangya.com",
    "avatar": "https://img.btstu.cn/api/images/5a041f3b95237.jpg"
  },
  {
    "name": "王强",
    "id": "009",
    "desc": "喜欢音乐\n爱看电影\n待人友善",
    "url": "https://wangqiang.me",
    "avatar": "https://img.btstu.cn/api/images/5a0939823d03e.jpg"
  },
  {
    "name": "刘雨",
    "id": "010",
    "desc": "热爱科学\n喜欢解决难题\n乐观向上",
    "url": "https://liuyu.org",
    "avatar": "https://img.btstu.cn/api/images/5a0a954e7ebe9.jpg"
  },
  {
    "name": "陈鹏",
    "id": "011",
    "desc": "喜欢旅行\n爱好摄影\n热心助人",
    "url": "https://chenpeng.net",
    "avatar": "https://img.btstu.cn/api/images/5a2f88928b264.jpg"
  },
  {
    "name": "张静",
    "id": "012",
    "desc": "喜欢阅读\n爱写作\n善于交际",
    "url": "https://zhangjing.com",
    "avatar": "https://img.btstu.cn/api/images/5b57f2f78c206.jpg"
  },
  {
    "name": "李超",
    "id": "013",
    "desc": "热爱体育\n擅长篮球\n性格开朗",
    "url": "https://lichao.com",
    "avatar": "https://img.btstu.cn/api/images/5a041f3b95237.jpg"
  },
  {
    "name": "王雪",
    "id": "014",
    "desc": "喜欢音乐\n爱好美食\n热心公益",
    "url": "https://wangxue.org",
    "avatar": "https://img.btstu.cn/api/images/5a0939823d03e.jpg"
  },
  {
    "name": "刘林",
    "id": "015",
    "desc": "热爱自然\n喜欢植物\n乐于分享",
    "url": "https://liulin.io",
    "avatar": "https://img.btstu.cn/api/images/5a0a954e7ebe9.jpg"
  },
  {
    "name": "赵琳",
    "id": "016",
    "desc": "喜欢写作\n爱看电影\n性格开朗",
    "url": "https://zhaolin.com",
    "avatar": "https://img.btstu.cn/api/images/5a041f3b95237.jpg"
  },
  {
    "name": "杨波",
    "id": "017",
    "desc": "热爱动物\n擅长绘画\n热心公益",
    "url": "https://yangbo.net",
    "avatar": "https://img.btstu.cn/api/images/5a0939823d03e.jpg"
  },
  {
    "name": "张青",
    "id": "018",
    "desc": "喜欢写作\n爱好摄影\n乐于分享",
    "url": "https://zhangqing.io",
    "avatar": "https://img.btstu.cn/api/images/5a0a954e7ebe9.jpg"
  }
];


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