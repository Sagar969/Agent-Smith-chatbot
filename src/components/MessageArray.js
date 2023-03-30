import { useContext, useEffect } from 'react';
import { MainContext } from '../contexts/AppContext';
import styled, { keyframes } from 'styled-components';

const slideLeftAni = keyframes`
0% { transform: translateX(150%) scale(0); }
100% { transform: translateX(0%) scale(1); }
`;
const slideRightAni = keyframes`
0% { transform: translateX(-150%) scale(0); }
100% { transform: translateX(0%) scale(1); }
`;
let AniDiv = styled.div`
`;

const MessageArray = () => {
  const { msgs } = useContext(MainContext);
  return (
    <div className="message-array">
      {(() => {
        const list = [];
        for (let i = 0; i < msgs.length; i++) {
          list.push(
            <Message key={i} item={i} msgs={msgs} />
          );
        }
        return list;
      })()}
    </div>
  );
};

export default MessageArray;

const Message = ({ item, msgs }) => {
    const entity = msgs[item].entity;
    const time = msgs[item].time;
    let msg = msgs[item].msg;
    if(Array.isArray(msgs[item].msg)) {
      const msgArr = msgs[item].msg;
      msg = msgArr.map(msg => <p>{msg}</p>)
    }

    AniDiv =
      item !== msgs.length - 1
        ? styled.div``
        : styled.div`
            animation: .5s ${entity === 'user' ? slideLeftAni : slideRightAni} 1;
          `;
    
  useEffect(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  }, []);
  return (
    <AniDiv className={`message ${entity}-box`}>
      <div>
        <span></span>
        <p className={entity}>{msg}</p>
        <p className="time">{time}</p>
      </div>
    </AniDiv>
  );
};