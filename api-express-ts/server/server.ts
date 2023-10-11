import express from 'express';
import userRouter from './router/user.router';
import authRouter from './router/auth.router';

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);


app.listen(3000, () => {
    console.log(`Server listening on PORT 3000`)
});
