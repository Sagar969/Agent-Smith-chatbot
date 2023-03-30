import { createContext, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

let API_KEY;
const getApiKey = async () => {
    const querySnapshot = await getDocs(collection(db, 'openaiapikey'));
    querySnapshot.forEach((doc) => {
        API_KEY = doc.data().API_KEY;
    });
};

const MainContext = createContext();

const AppContext = ({ children }) => {
    getApiKey();

    const [msg, setMsg] = useState('');
    const [botMsg, setBotMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getTime = () => {
        const now = new Date();
        const hours =
          now.getHours() > 9 ? now.getHours() : '0' + now.getHours();
        const minutes =
          now.getMinutes() > 9 ? now.getMinutes() : '0' + now.getMinutes();
        return `${hours} : ${minutes}`;
    }

    useEffect(() => {
        if(msg) {
            setMsgs(prev => [...prev, { msg: msg, entity: 'user', time: getTime() }])
            setIsFetching(true);
            callChatbot(msg, setBotMsg)
        }
        setMsg('')
    }, [msg])
    useEffect(() => {
        setIsFetching(false)
    }, [botMsg])
    useEffect(() => {
        if(isFetching) setTimeout(() => {
            setMsgs(prev => [...prev, { msg: 'fetching...', entity: 'bot', time: getTime() }])
        }, 500);
        else {
            if(msgs.length > 0) {
                setMsgs(prev => prev.filter(item => item.msg !== 'fetching...' || item.entity !== 'bot'))
                if(botMsg) setMsgs(prev => [...prev, { msg: botMsg, entity: 'bot', time: getTime() }])
                setBotMsg('')
            }
        }
    }, [isFetching])

    const changeState = (state, changeTo) => {
        if(state === 'msg') setMsg(changeTo)
    }

    const value = {
        msg, changeState, msgs, isFetching
    }

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    )
}

export { MainContext, AppContext }

const callChatbot = async (msg, setBotMsg) => {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${API_KEY}`
            },
            body:JSON.stringify({
                model: "gpt-3.5-turbo",
                messages:[{ role: 'user', content: msg }]
            })
        })
        const data = await res.json();
        setBotMsg(data.choices[0].message.content.split('\n'));
    }
    catch(err) {
        setBotMsg(`API issue !!! Could not fetch "${msg}"`)
        console.error(err);
    }
}