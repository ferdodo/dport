from dport-base
RUN npm outdated
RUN npm audit
RUN npm run build-types 
RUN npm run test