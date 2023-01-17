import { 
    Application, 
    Router,
    config,
    viewEngine,
    ejsEngine,
    oakAdapter, } from "./deps.ts";

const router = new Router();
const colors = [];
const configData = await config();
const PORT = configData['PORT'] || 8000;
const app = new Application();

app.use(
    viewEngine(oakAdapter, ejsEngine, {
        viewRoot: "./views",
    })
);

router
    .post("/", async (ctx) => {
        const body = ctx.request.body({ type: "form" });
        const value = body.value;
        const color = (await value).get("color");
        colors.push(color);
        ctx.response.redirect("/");
        console.log(color)
    })
    .get("/", (ctx) => {
        ctx.render("form.ejs", { colors });
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: Number(PORT) });