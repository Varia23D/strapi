# adapted from the official Bun image
FROM node:20-alpine as base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json package-lock.json /temp/dev/
RUN cd /temp/dev && npm i

# install with --production (exclude devDependencies)
#RUN mkdir -p /temp/prod
#COPY package.json package-lock.json /temp/prod/
#RUN cd /temp/prod && npm ci --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN npm run build

# copy dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY --from=prerelease /app/config config
COPY --from=prerelease /app/public public
COPY --from=prerelease /app/build build
COPY --from=prerelease /app/src src
COPY --from=prerelease /app/.strapi .strapi
COPY --from=prerelease /app/package.json .

# run the app
#USER www-data
EXPOSE 1337/tcp
ENTRYPOINT [ "npm", "run", "start" ]

