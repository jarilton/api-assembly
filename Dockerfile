#imagem base
FROM node:18

#diretorio de trabalho
WORKDIR /app

#copiar arquivos do código fonte 
COPY . .

RUN npm install

#Executar o build
RUN npm run build

CMD ["node", "dist/main.js"]