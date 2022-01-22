```dockerfile
FROM node:alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm","start"]
```

- FROM node:alpine
  - Specify base image
- WORKDIR /app
  - Set the working directory to '/app' in the container. All following commands will be issued relative to this dir
- COPY package.json ./
  - Copy over *only* the package.json file
- RUN npm install
  - Install all dependencies
- COPY ./ ./
  - Copy over all of our remaining source code
- CMD ["npm","start"]
  - Set the command to run when container starts up

How to build an image with custom name without using yml file:
```bash
docker build -t image_name .
```

How to run a container with custom name:
```bash
docker run -d --name container_name image_name
```

How to see [container logs](https://docs.docker.com/engine/reference/commandline/logs/):
```bash
docker logs --follow container_name
```