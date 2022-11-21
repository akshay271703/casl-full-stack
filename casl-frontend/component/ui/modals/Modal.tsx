export default function Modal(props: any) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        background: '#eee',
        zIndex: '10',
        color: 'black',
        borderRadius: '10px'
      }}
    >
      {props.children}
    </div>
  );
}
