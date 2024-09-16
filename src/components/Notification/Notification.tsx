type NotificationProps = {
  data: NotificationData;
  onClose: () => void;
};

const Notification = ({ data, onClose }: NotificationProps) => {
  const validUrl = window.location.href;
  const validateUrl = (url: string, accept: string = `${validUrl}.*`) => {
    const regex = new RegExp(accept);
    return regex.test(url);
  }
    
  return <div className={`notification notification--${data.type?.toLowerCase()}`}>
    <div>
      <p>{data.message}</p>
      <div>
        {data.url && validateUrl(data.url) ? <a href={data.url} target="_blank" rel="noreferrer">{data.url}</a> : <i>[!] {data.url}</i>}
      </div>
      <div>
        <small>{data.date}</small>
      </div>
    </div>
    <button className="button button--icon" onClick={onClose}>
      <img src="assets/icons/close.svg" width="16" height="16" alt="Close" />
    </button>
  </div>;
}

export default Notification;
