const baseStyle = {
  padding: '5px 15px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

const styles = {
  primary: {
    ...baseStyle,
    background: '#1976d2',
    color: '#fff',
  },
  secondary: {
    ...baseStyle,
    background: '#00796b',
    color: '#fff',
  },
  dark: {
    ...baseStyle,
    background: '#212121',
    color: '#fff',
  },
};

export default function Button({ text, type, onClick, css }: any) {
  function getButtonStyle(type: string) {
    switch (type) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'dark':
        return styles.dark;
      default:
        return styles.primary;
    }
  }
  const buttonStyle = getButtonStyle(type);
  const styledCss = {...buttonStyle, ...css}
  return (
    <button style={styledCss} onClick={onClick}>
      {text}
    </button>
  );
}
