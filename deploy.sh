#!/bin/bash

# Build the React app
npm run build

# Remove existing files in deployment folder
sudo rm -rf /var/www/apps/scholarm/*

# Copy build files to web server directory
sudo cp -r dist/* /var/www/apps/scholarm/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/apps/scholarm
sudo chmod -R 755 /var/www/apps/scholarm

echo "Deployment completed successfully!"
