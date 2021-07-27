from dport-base
RUN npm outdated
RUN npm audit
COPY src src
RUN npm run build-types 
RUN npm run test