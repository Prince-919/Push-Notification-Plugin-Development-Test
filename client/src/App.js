import { useEffect, useState } from "react";
import { onMessageListener, requestFCMToken } from "./utils/firebaseUtils";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [fcmToken, setFCMToken] = useState(null);

  const fetchFCMToken = async () => {
    try {
      const token = await requestFCMToken();
      setFCMToken(token);
      console.log(token);
    } catch (error) {
      console.error("Error fetching FCM token:", error);
    }
  };

  onMessageListener()
    .then((payload) => {
      toast(
        <div>
          <strong>{payload.notification.title}</strong>
          <div>{payload.notification.body}</div>
        </div>,
        { position: "top-right" }
      );
      console.log("Received a new message:", payload);
    })
    .catch((err) => {
      console.error("Error listening for messages:", err);
    });

  useEffect(() => {
    fetchFCMToken();
  }, []);
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center w-9/12 h-screen mx-auto ">
        <div className="bg-green-200 p-6 rounded-lg">
          <div>
            <span className="font-semibold text-slate-900">FCM Token: </span>
            <span className="text-slate-700">{fcmToken}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
