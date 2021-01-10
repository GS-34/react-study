import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {stockContext,setStockContext} from "./App";
import {Nav} from "react-bootstrap";
import {CSSTransition} from "react-transition-group";

let 박스 = styled.div`
  padding : 20px;
`;

let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.color }
`;


function Detail(props) {

  let history = useHistory();
  let { id } = useParams();

  let product = props.product.find(element => element.id == id);

  let [isShowAlert, setShowAlert] = useState(true);
  let [switchs,setSwitch] = useState(false);

  let [tab, setTab] = useState(0);

  let stock = useContext(stockContext);
  let setStock = useContext(setStockContext);


  //랜더링이 완료 된 후 실행
  useEffect(() => {

    //[isShowAlert] 이라는 스테이트가 변경이 될 때만 변경,
    //[] 일경우 Detail 이 최초에 뜰때만 한번실행
    let 타이머 = setTimeout(()=>{
      setShowAlert(false);
    },2000);

    return ()=>{ clearTimeout(타이머)}

  },[]);

  useEffect(()=>{
    //해당 함수(DEtail 이 사라질때 실행 될 코드)
    return ()=>{ console.log('Detail 닫힘')}
  });

  if(product != null){
    return (
        <div className="container">
          <박스>
            <제목 color = "red">
              Detail
            </제목>
          </박스>
          {
            isShowAlert ?
                <div className="my-alert">
                  <p>재고가 얼마 안남음</p>
                </div>
                : null
          }

          <div className="row">
            <div className="col-md-6">
              <img src={"https://codingapple1.github.io/shop/shoes"+ (product.id+1) +".jpg"} width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{product.title}</h4>
              <p>상품설명</p>
              <p>{product.price} 원</p>

              <Info/>

              <button className="btn btn-danger" onClick={()=>{

                let array = [...stock];
                array[0]--;
                setStock(array);

              }}>주문하기</button>

              <button className="btn btn-danger" onClick={()=>{
                // history.goBack();
                history.push('/');
              }}>뒤로가기</button>

            </div>
          </div>

          <Nav variant="tabs" className="mt-5" defaultKey="link-0">
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={()=>{setTab(0);setSwitch(false);}}>Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={()=>{setTab(1);setSwitch(false);}}>Option 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-2" onClick={()=>{setTab(2);setSwitch(false);}}>Option 3</Nav.Link>
            </Nav.Item>
          </Nav>

          <CSSTransition in={switchs} classNames="wow" timeout={500}>
            <TabContent tab={tab} setSwitch={setSwitch}/>
          </CSSTransition>
        </div>
    )
  } else {
    return (
      <div className="container">
        찾는 상품 없음
      </div>
    )

  }

}

function Info(){

  let stock = useContext(stockContext);

  return (
      <p>재고 : {stock[0]}</p>
  )
}

function TabContent(props){

  useEffect(()=>{
    props.setSwitch(true);
  });

  if(props.tab === 0){
    return <div>0번째 내용입니다.</div>
  } else if (props.tab === 1){
    return <div>1번째 내용입니다.</div>
  } else if (props.tab === 2){
    return <div>2번째 내용입니다.</div>
  }
}

// class Detail2 extends React.Component {
//   componentDidMount(){
//     //Detail2 컴포넌트가 Mount 되고나서 실행할 코드
//   }
//   componentWillUnmount(){
//     //Detail2 컴포넌트가 Unmount 되기전에 실행할 코드
//   }
// }
export default Detail;