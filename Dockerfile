FROM node:22.12 AS build_frontend

WORKDIR /app/frontend

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn install --frozen-lockfile --verbose
COPY frontend .
RUN yarn build

FROM node:22.12 AS build_backend

WORKDIR /app/backend

# COPY backend/package.json backend/yarn.lock ./
COPY backend .

RUN yarn install --frozen-lockfile --verbose

RUN yarn build

FROM node:22.12 AS production

WORKDIR /app/backend

COPY --from=build_backend /app/backend/build ./build
COPY --from=build_backend /app/backend/prisma ./prisma
COPY --from=build_backend /app/backend/files ./files
COPY --from=build_backend /app/backend/package.json /app/backend/yarn.lock ./
COPY --from=build_frontend /app/frontend/dist /app/frontend/dist

RUN yarn install --frozen-lockfile --production

ENV NODE_ENV=production
EXPOSE 3333
CMD [ "yarn", "start" ]