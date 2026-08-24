FROM php:8.3-apache

RUN docker-php-ext-install pdo_mysql

COPY public/ /var/www/html/
COPY api/ /var/www/html/api/

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
