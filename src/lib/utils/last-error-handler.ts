const lastErrorHandler = () => {
  if (chrome?.runtime?.lastError) return;
};

export default lastErrorHandler;
