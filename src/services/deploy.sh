#!/bin/bash

# Build the React app
npm run build

# Remove existing files in deployment folder
sudo rm -rf /var/www/apps/scholarm/*

# Copy build files to web server directory
sudo cp -r build/* /var/www/apps/scholarm/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/apps/my-app
sudo chmod -R 755 /var/www/apps/my-app

echo "Deployment completed successfully!"
