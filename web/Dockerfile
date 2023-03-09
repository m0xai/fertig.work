FROM node:18.15.0
WORKDIR /app/web
COPY ./package.json .
RUN npm install
RUN npm install -g @angular/cli
COPY . .
EXPOSE 4200 49153
# CMD ng serve --host 0.0.0.0 --poll=2000 --port 4200 49153 --disable-host-check
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "4200", "--disable-host-check"]