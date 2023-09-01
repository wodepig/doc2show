FROM node:18-alpine3.17
#maven:3.8.3-openjdk-11-slim
RUN npm config set registry http://registry.npmmirror.com \
    && echo npm config get registry