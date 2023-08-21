import React, { useState, useEffect } from "react";
import bot from "../images/bot.jpg";
import user from "../images/user.png";
import { getAI } from "./API_Connect";

export default function Chatbot() {
  const [userinput, changeInput] = useState("");
  const [chats, setChats] = useState(["How can i assist you ?"]);
  const [lock, setLock] = useState(0);

  const setInput = (event) => {
    changeInput(event.target.value);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function displayTypingAnimation(text, speed, addToChats) {
    let animatedText = "";
    for (let i = 0; i < text.length; i++) {
      // Build the animated text character by character
      animatedText = text.substring(0, i + 1);

      // Replace the last entry in chats with the animated text
      addToChats((chats) => [...chats.slice(0, -1), animatedText]);

      await sleep(speed); // Pause for a short time to simulate typing speed
    }
  }

  const callLLM = async () => {
    if (userinput.trim() === "") return;
    if (lock === 1) {
     alert("Please wait for the response to finish")
    } else {
      setLock(1)

      setChats((prevChats) => [...prevChats, userinput, "generating..."]);

      const response = await getAI(userinput);

      changeInput("");
      setChats((prevChats) => [...prevChats.slice(0, -1), response]);

      await displayTypingAnimation(response, 50, setChats);
      setLock(0)
    }
  };

  const clearChat = () => {
    if(lock === 1) alert("Please wait for the response to finish");
    else setChats(["How can i assist you ?"]);
  };

  return (
    <div className="container">
      <div className="content-container ">
        <h4>AssetAdvise</h4>

        {/* <div className="m-2 p-3">
          <p>
            Introducing our advanced Financial Data Chatbot – your intelligent
            financial analyst at your fingertips. Seamlessly integrating with
            your company's financial data, our chatbot utilizes cutting-edge AI
            technology to analyze complex financial metrics, trends, and
            performance indicators. With an in-depth understanding of your
            company's financial health, the chatbot confidently provides
            accurate responses to your inquiries, whether they're about revenue
            projections, cost structures, profitability, market trends, or other
            critical financial aspects. Empower your decision-making process
            with real-time insights and actionable information, all conveniently
            accessible through natural language conversations. Unleash the power
            of AI-driven financial analysis with our chatbot – your dedicated
            financial advisor for informed and strategic decision-making.
          </p>
        </div> */}

        <div className="d-flex flex-column">
          {chats.map((e) => {
            if (chats.indexOf(e) % 2 === 0) {
              return (
                <div className="d-flex flex-row " key={chats.indexOf(e)}>
                  <img
                    src={bot}
                    alt="Image"
                    className="rounded-circle"
                    width="100"
                    height="100"
                  />
                  <div className="text-box p-2 ms-2 my-3">{e}</div>
                </div>
              );
            }

            return (
              <div className="d-flex flex-row my-5" key={chats.indexOf(e)}>
                <img
                  src={user}
                  alt="Image"
                  className="rounded-circle"
                  width="100"
                  height="100"
                />
                <div className="user-box p-2">{e}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="search-container">
        <div className="input-group box custom-search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="What do you want to ask?"
            onChange={setInput}
            value={userinput}
          />

          <div className="input-group-append">
            <span className="input-group-text bg-white border-right-2 p-3 mx-2 custom-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-send-fill"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer" }}
                onClick={callLLM}
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </span>
          </div>

          <div className="input-group-append">
            <span className="input-group-text bg-white border-right-2 p-3 custom-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-eraser-fill"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer" }}
                onClick={clearChat}
              >
                <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
