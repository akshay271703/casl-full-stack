export default function Table2080(props: any) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        borderBottom: '1px solid #eee',
      }}
    >
      {props.children}
    </div>
  );
}
