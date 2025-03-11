FROM node:18 AS build_frontend

WORKDIR /app/frontend

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn install --frozen-lockfile
COPY frontend .
RUN yarn build

FROM node:18 AS build_backend

WORKDIR /app/backend

COPY backend/package.json backend/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY backend .

RUN yarn prisma generate

RUN yarn build

FROM node:18 AS production

WORKDIR /app/backend

COPY --from=build_backend /app/backend/build ./build
COPY --from=build_backend /app/backend/package.json ./package.json
COPY --from=build_backend /app/backend/yarn.lock ./yarn.lock
COPY --from=build_frontend /app/frontend/build /app/frontend/build

RUN yarn install --frozen-lockfile --production

RUN yarn prisma generate

ENV NODE_ENV=production
EXPOSE 3333
CMD [ "yarn", "start" ]