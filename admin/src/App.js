import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "./api/api";

const App = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePushNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      var data = {
        title: title,
        body: body,
        deviceToken: fcmToken,
      };
      const result = await api.post("/firebase/send-notification", data);
      console.log(result);
      if (result.status === 200) {
        toast.success("Notification send successfully", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen">
        <form className="w-full max-w-lg">
          <h1 className="text-3xl mb-10 text-center font-semibold">
            Push Notification System
          </h1>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="title"
                type="text"
                placeholder="Title"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="body"
              >
                Body
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="body"
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="fcmToken"
              >
                FCM Token
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="fcmToken"
                type="text"
                placeholder="FCM Token"
                value={fcmToken}
                onChange={(e) => setFcmToken(e.target.value)}
              />
            </div>
          </div>
          <div
            className="flex md:items-center md:justify-end lg:w-full
        "
          >
            <button
              onClick={handlePushNotification}
              disabled={loading}
              className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold w-full py-2 rounded"
              type="button"
            >
              {loading ? <span>Sending</span> : <span>Send</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
