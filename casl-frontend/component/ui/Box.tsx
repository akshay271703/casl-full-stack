export function BoxCenterV({ styles, children }: any) {
  return (
    <section
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles
      }}
    >
      {children}
    </section>
  );
}

export function BoxCenterH({ styles, children }: any) {
  return (
    <section
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles
      }}
    >
      {children}
    </section>
  );
}