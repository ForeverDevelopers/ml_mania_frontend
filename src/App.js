import axios from "axios";
import "./App.css";
import { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [
        {
          user: "bot",
          chat: "How can I help you",
        },
      ],
    };
  }

  render() {
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(event.target[0].value);

      if (event.target[0].value !== "") {
        var l = this.state.chats;

        l.push({ user: "client", chat: event.target[0].value });

        this.setState({
          chats: l,
        });

        console.log(chats);

        await axios
          .get("http://127.0.0.1:5000/" + event.target[0].value)
          .then((output) => {
            var newl = this.state.chats;

            output.data.response.forEach((element) => {
              newl.push({ user: "bot", chat: element });
            });

            this.setState({
              chats: newl,
            });
          });

        event.target[0].value = "";
      }
    };

    var chats = this.state.chats.map((value, index) => {
      return (
        <div className={`${value.user} chats`}>
          <p>{value.chat}</p>
        </div>
      );
    });

    return (
      <div className="App">
        <h1>Medical chat bot</h1>
        <div className="maincontainer">
          <div className="chat-window">{chats}</div>
          <div className="inputs">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter the problem you are currently facing"
              ></input>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
