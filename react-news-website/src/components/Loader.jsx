const Loader = () => {
  return (
    <div className="loader-container">
      <div>
        <div className="loader"></div>
        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#6b7280' }}>Loading news...</p>
      </div>
    </div>
  );
};

export default Loader;