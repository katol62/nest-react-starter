import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

export default (app: any) => {
    app.use(
        '/graphql',
        createProxyMiddleware( {
            target: 'http://localhost:3010',
            changeOrigin: true,
            secure: false
        })
    )
};
