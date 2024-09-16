import { useState } from "react";

type NotifyDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const initText = JSON.stringify({
  type: "success",
  message: "Message sent successfully to all devices! Thank you! If you have any questions, please let us know. We are here to help!",
  id: Date.now().toString()
});

const NotifyDialog = ({ isOpen, onClose, onSubmit }: NotifyDialogProps) => {
  const [message, setMessage] = useState(initText);

  return (
    <dialog open={isOpen} style={{ minWidth: "450px" }}>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Send a message</h3>
        <button className="button button--icon" onClick={onClose}>
          <img src="assets/icons/close.svg" width="24" height="24" alt="Close" />
        </button>
      </div>
      <form method="post" style={{ width: "100%" }} onSubmit={onSubmit}>
        <div><label htmlFor="name">Message:</label></div>
        <textarea id="message"
          onChange={(e) => setMessage(JSON.stringify(e.target))} value={message} name="message" required rows={5} style={{ width: "100%" }}
        ></textarea>
        <div>
          <button className="button" style={{ display: 'inline-block', width: '100%', marginTop: '1rem' }} type="submit">
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default NotifyDialog;
