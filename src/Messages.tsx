import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Messages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [messageProgress, setMessageProgress] = useState(0);
    const [totalMessages, setTotalMessages] = useState(100);
    const [loading, setLoading] = useState(true);
    const [searchParams,] = useSearchParams();
    useEffect(() => {
        const url = `https://api.groupme.com/v3/groups/${searchParams.get('group_id')}/messages?token=${searchParams.get('access_token')}&limit=100`;
        fetch(url).then(
            (res) => res.json()).then(
                async (res) => {
                    let tempMessages = res.response.messages;
                    const totalCount = res.response.count;
                    setTotalMessages(totalCount);
                    // show the user something while we load the rest
                    setMessages(tempMessages);
                    let lastId = res.response.messages[res.response.messages.length - 1].id;
                    try {
                        for (let i=0; i<3000; i++) { // max of 300_000 messages to prevent infinite loop
                            const nextUrl = `https://api.groupme.com/v3/groups/${searchParams.get('group_id')}/messages?token=${searchParams.get('access_token')}&limit=100&before_id=${lastId}`;
                            const nextRes = await fetch(nextUrl);
                            const nextJson = await nextRes.json();
                            tempMessages = tempMessages.concat(nextJson.response.messages);
                            lastId = nextJson.response.messages[nextJson.response.messages.length - 1].id;
                            setMessageProgress(tempMessages.length);
                        }
                        // keep looping until SyntaxError due to unexpected end of JSON input
                    } catch {
                        setMessages(tempMessages);
                        setMessageProgress(tempMessages.length);
                        setLoading(false);
                    }
                }
            )
    }, [searchParams]);

    return (
        <div className="card m-2">
            <h3 className='card-title m-3'>Messages</h3>
            {loading ?
            (<div className="progress mx-3 mb-3">
                <div className="progress-bar" role="progressbar" aria-label="Loading messages" style={{width: Math.floor(100*messageProgress / totalMessages)+'%'}} aria-valuenow={messages.length} aria-valuemin={0} aria-valuemax={totalMessages}></div>
            </div>) : <p className="mx-3">All {messages.length} messages loaded. Use Ctrl+F to search</p>}
            <div className="list-group list-group-flush">
                {messages.length === 0 && 'Loading messages...'}
                {messages.map((msg) => (<div className="list-group-item" key={msg.id}>
                    <span style={{fontStyle: 'italic'}}>{new Date(msg.created_at*1000).toLocaleString('en-US')}</span>{' '}
                    <span style={{fontWeight: 'bold'}}>{msg.name}</span>:{' '}
                    <span>{msg.text}</span>
                    <span>{msg.attachments.map((att: any) => att.type === 'image' ? <img src={att.url} alt="idk" style={{maxWidth: 'calc(100vw - 64px)'}} key={att.url} /> : null)}</span>
                    </div>))}
            </div>
        </div>
    )
}