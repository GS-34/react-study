import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';


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

              <Info stock={props.stock} />

              <button className="btn btn-danger" onClick={()=>{

                let array = [...props.stock];
                array[0]--;
                props.setStock(array);

              }}>주문하기</button>

              <button className="btn btn-danger" onClick={()=>{
                // history.goBack();
                history.push('/');
              }}>뒤로가기</button>

            </div>
          </div>
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

function Info(props){
  return (
      <p>재고 : {props.stock[0]}</p>
  )
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