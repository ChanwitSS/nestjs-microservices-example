FROM node:20-alpine
WORKDIR /app

# RUN apk --no-cache add --update --virtual native-deps \
#   g++ gcc libgcc libstdc++ linux-headers make python3 postgresql-dev

# COPY microservice-package.json ./package.json

# COPY ./micro-package/node_modules ./node_modules
RUN npm install node-gyp -g && npm install

CMD [ "npm", "run", "start" ]