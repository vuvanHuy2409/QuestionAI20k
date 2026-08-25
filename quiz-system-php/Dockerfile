FROM php:8.3-apache

RUN a2enmod rewrite

# Copy application files
COPY public/ /var/www/html/
COPY api/ /var/www/html/api/
COPY database/ /var/www/html/database/
COPY data/ /var/www/html/data/

# Create data directory permissions
RUN mkdir -p /var/www/html/data && chown -R www-data:www-data /var/www/html && chmod -R 777 /var/www/html/data

EXPOSE 80
