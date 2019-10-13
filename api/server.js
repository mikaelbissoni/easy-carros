const app = require('./web/app');

app.listen(Number(process.env.PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on http://localhost:${process.env.PORT}`);
});
