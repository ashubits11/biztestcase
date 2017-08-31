FROM docker.ttx.com/ttx-static-content-ng2:v1.9.15
MAINTAINER Ashish Gupta

COPY dist /usr/share/nginx/html
CMD ["/bin/bash", "-c", "nginx -g 'daemon off;'"]