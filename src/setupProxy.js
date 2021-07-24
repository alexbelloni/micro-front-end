module.exports = (app) => {
  app.use((req, res, next) => {
    console.log('proxy',new Date().toString())
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });
  };