import './Message.css';

export function Message({ data }) {
  return <div className="message">{data.content}</div>;
}
