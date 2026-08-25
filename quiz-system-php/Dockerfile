FROM php:8.3-apache

RUN a2enmod rewrite

# Copy application files
COPY public/ /var/www/html/
COPY api/ /var/www/html/api/
COPY database/ /var/www/html/database/

# Create data directory for SQLite database
RUN mkdir -p /var/www/html/data && chown -R www-data:www-data /var/www/html

EXPOSE 80
