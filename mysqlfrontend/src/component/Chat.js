// import React, { useEffect, useState } from "react";
import tigersheet_logo from '../assets/tigersheet_logo.jpg'
import user_logo from '../assets/user_logo.jpg'
const Chat = (props) => {

    let message = props.message;

    return (
        <>
            {
                message.map((data, ind) => (
                    data.role === "assistant" ?
                        <div className="direct-chat-msg" key={ind}>
                            <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-left">TigerSheet</span>
                                <span className="direct-chat-timestamp float-right">{data.time}</span>
                            </div>
                            <img className="direct-chat-img" src={tigersheet_logo} alt="message" />
                            <div className="direct-chat-text">
                                {
                                    typeof (data.content) === "object" ?
                                        <pre className='pretext' style={{ backgroundColor: '#ECF0F1' }}>
                                            <>
                                                <div>
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                {Object.keys(data.content[data.content.length - 1]).map(key => (
                                                                    <th className="text-center" key={key}>{key}</th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.content.map((item, index) => (
                                                                <tr key={index}>
                                                                    {Object.keys(item).map(key => (
                                                                        <td className="text-center" key={key}>{item[key] !== null && item[key] !== undefined && item[key].length !== 0 ? item[key] : "-"}</td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                        </pre>
                                        :
                                        <pre className='pretext'>{data.content}</pre>
                                }

                            </div>
                        </div> :
                        <div className="direct-chat-msg right" key={ind}>
                            <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-right">You</span>
                                <span className="direct-chat-timestamp float-left">{data.time}</span>
                            </div>
                            <img className="direct-chat-img" src={user_logo} alt="message" />
                            <div className="direct-chat-text" style={{ backgroundColor: '#D7DBDD' }}>
                                <pre className='pretext'>
                                    {data.content}
                                </pre>
                            </div>
                        </div>
                ))
            }
        </>
    )
}
export default Chat