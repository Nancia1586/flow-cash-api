const { PORT } = process.env;

const config = () => {
  return {
    port: parseInt(PORT, 10) || 3000,
  };
};

export default config;
