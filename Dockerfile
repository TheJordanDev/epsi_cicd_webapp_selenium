# Use the official Nginx image as the base
FROM nginx:alpine

# Copy static files to the default Nginx public directory
COPY ./src /usr/share/nginx/html

# Expose port 80
EXPOSE 80