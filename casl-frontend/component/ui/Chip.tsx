export default function Chip({ name, onClick }: any) {
  return (
    <div
      style={{
        alignItems: 'center',
        padding: '5px 10px',
        background: 'green',
        color: 'white',
        marginRight: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
      }}
    >
      <span onClick={onClick}>{name}</span>
    </div>
  );
}
