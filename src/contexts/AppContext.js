import { createContext, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
const API_KEY = process.env.REACT_APP_API_KEY

const MainContext = createContext();

const AppContext = ({ children }) => {

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
    try {
        const openai = new OpenAIApi(new Configuration({ apiKey: API_KEY }));
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: msg }],
        })
        setBotMsg(res.data.choices[0].message.content);
    }
    catch(err) {
        setBotMsg(`API issue !!! Could not fetch "${msg}"`)
        console.error(err);
    }
}