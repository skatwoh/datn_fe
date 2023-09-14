FROM registry.k8s.local/cons-libs/node:18 as node-dev

WORKDIR /src

COPY package.json ./

RUN npm install
COPY . .

RUN npm run build

# Using nginx to serve front-end
# FROM registry-dev.truesight.asia/truesight/nginx:stable
FROM registry.k8s.local/cons-libs/nginx:stable

EXPOSE 8080

WORKDIR /var/www/html

USER root
RUN chmod -R g+w /var/cache/
RUN chmod -R g+w /var/run/

# Copy built artifacts
COPY --from=node-dev /src/dist/tools-fe/ ./

# Copy nginx configuration folder
COPY ./nginx/conf.d/tools.conf /etc/nginx/conf.d/default.conf
