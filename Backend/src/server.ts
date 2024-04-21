import app from './app';

const startServer = async () =>{
  const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
}

startServer();