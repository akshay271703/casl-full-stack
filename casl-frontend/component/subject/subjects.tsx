export default function SubjectsHeaders({ subjects }: any) {
  return (
    <div
      style={{
        padding: '10px',
        width: '200px',
        textAlign: 'center',
        borderRight: '1px solid #eee',
      }}
    >
      <span>{subjects.toString()}</span>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '5px 10px',
            width: '50px',
          }}
        >
          C
        </span>
        <span
          style={{
            display: 'inline-block',
            padding: '5px 10px',
            width: '50px',
          }}
        >
          R
        </span>
        <span
          style={{
            display: 'inline-block',
            padding: '5px 10px',
            width: '50px',
          }}
        >
          U
        </span>
        <span
          style={{
            display: 'inline-block',
            padding: '5px 10px',
            width: '50px',
          }}
        >
          D
        </span>
      </div>
    </div>
  );
}
