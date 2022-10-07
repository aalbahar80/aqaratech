pnpm build && \
pnpm -F @self/backend --prod deploy ./packages/backend/pruned && \
pnpm -F @self/site --prod deploy ./packages/site/pruned && \
docker compose up --build