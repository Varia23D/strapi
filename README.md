## BACKEND FOR LIBRARY PROJECT

<a name="readme-top"></a>

<div align="center">
  <img src="https://img.shields.io/badge/Strapi-4.25.3-gray?style=for-the-badge&logo=strapi&logoColor=white&labelColor=4945ff&color=555555" alt="Strapi">
  <img src="https://img.shields.io/badge/NodeJS-20.15.1-gray?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=97c900&color=555555" alt="Nodejs">
  <img src="https://img.shields.io/badge/PostgreSQL-16.3-gray?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=4169E1&color=555555" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Docker-25-gray?style=for-the-badge&logo=docker&logoColor=white&labelColor=2496ED&color=555555" alt="Docker">
</div>


## A step-by-step guide about why we chose it and how to operate it 
<!-- <details> -->
  <!-- <summary>Содержание</summary> -->
  <ol>
    <li><a href="#prepare">Concept</a></li>
    <li><a href="#docker-launch">Запуск докера</a></li>
    <li><a href="#import-db">Импорт дампа бд в MySQL контейнер</a></li>
    <li><a href="#launch-wp">Запуск WP</a></li>
    <li><a href="#finish">Завершение разработки</a></li>
  </ol>
<!-- </details> -->

## Concept
<a name="concept"></a>

Strapi is a powerfull tool, that helps to provide API from database in an easiest way, making a lot of opportunity to operate with data.
Based on headless concept strapi connects database to ANY front-end via its API from the box.
The closest analog was Django or FastAPI. I chose Strapi since I worked with it on my workplace a lot.

![strapi concept](./doc/strapi-concept.png.png)

It also provides a nice and flexible admin pannel from the box, so we didn't have to build it ourselves.


* клонировать репозиторий 
* убедиться, что `wp-cli.phar` в корневом каталоге, если нет скачать <a href="https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar">отсюда</a> или <a href="https://wp-cli.org/">с сайта</a>
* при необходимости установить `PHP 5.6 or later`
* находясь в корне проекта для установки зависимостей запустить
  ```sh
  composer install
  ```
* создать файл `.env` в корне и скопировать внутрь данные из `.env.example`
* в `.env` изменить следующие значения для переменных: 
  ```env
  DB_NAME='blog'
  ```
  ```env
  DB_PASSWORD='password'
  ```
  ```env
  WP_HOME='http://localhost:8080'
  ```
* добавить 
  ```env
  DB_HOST='mysql'
  ```
* в терминале перейти в папку с темой
  ```sh
  cd web/app/themes/maximum-v3/
  ```
  и установить зависимости там 
  ```sh
  composer install
  ```
  и
  ```sh
  npm install
  ```
* раздобыть дамп базы данных для импорта в контейнер `MySQL` 
  пример такого файла `blog_localhost-2023_10_27_13_36_58-dump.sql`

* поместить дамп бд в корень проекта

  
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Запуск докера
<a name="docker-launch"></a>

![Docker](https://img.shields.io/badge/Docker-1.29.2-gray?style=for-the-badge&logo=docker&logoColor=white&labelColor=1C92D2)

* в корне проекта запустить докер контейнеры в режиме `watch` следующими командами:

  `Ubuntu`
  ```sh
  docker compose watch
  ```
  `Windows` `MacOS`
  ```sh
  docker-compose watch
  ```
* должны запуститься 4 контейнера: 
  - WP
  - MySQL
  - Redis
  - Adminer

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Импорт дампа бд в MySQL контейнер
<a name="import-db"></a>

![MySQL](https://img.shields.io/badge/MySQL-8.0-gray?style=for-the-badge&logo=mysql&logoColor=white&labelColor=f29111)

чтобы было на что смотреть нам понадобится база данных постов, импортируем её.
* Открыть новый терминал
* Скопировать дампа базы данных, находящегося в корне проекта в контейнер MySQL:

  **!ВАЖНО** 

  предполагается, что папка проекта blog, в противном случае изменить `blog`-mysql-1:/tmp/ на свою
  ```sh
  docker cp blog_localhost-2023_10_27_13_36_58-dump.sql blog-mysql-1:/tmp/
  ```
* Входим в контейнер MySQL:
  ```sh
  docker exec -it blog-prod-mysql-1 /bin/bash
  ```
* в контейнере запускаем (с паролем `password`)
  ```sh
  mysql -u root -p
  ```
* создаём пустую базу данных blog
  ```sh
  CREATE DATABASE blog;
  ```
* выходим (бд говорит нам Bye!)
  ```sh
  exit
  ```
* импортируем бд из `/tmp/` во вновь созданную пустую бд

  **Важно!**
  На время терминал подвиснет - нужно дождаться, когда закончится импорт 1-10 минут
  ```sh
  mysql -u root -p blog < /tmp/blog_localhost-2023_10_27_13_36_58-dump.sql
  ```
* терминал можно закрыть, теперь у нас есть база данных!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Запуск WP
<a name="launch-wp"></a>

![Wordpress](https://img.shields.io/badge/WordPress-5.8-gray?style=for-the-badge&logo=wordpress&logoColor=white&labelColor=blue)

запустим наш WP с возможностью слушать изменения, которые мы вносим.

* открыть новый терминал
* войти в контейнер WP_HOME
  ```sh
  docker exec -it blog-prod-wp-1 /bin/bash
  ```
* внутри контейнера перейти в папку темы
  ```sh
  cd web/app/themes/maximum-v3/
  ```
* запустить bud
  ```sh
  npm run dev
  ```
* сервер запустится на `localhost:3000` и `127.0.0.1:8080`
* теперь внесенные изменения в коде будут отображаться в браузере.

  **Важно!**
  если делать отправку комментариев к постам с localhost:3000 - в консоли ошибка cors, для её решения можно перейти на 127.0.0.1:8080 и отправлять оттуда

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Завершение разработки
<a name="finish"></a>

после внесенных изменений

* в терминале с запущенным bud нажать `CTRL+C`
* остановить докер
  ```sh
  docker compose down
  ```
  `Windows` `MacOS`
  ```sh
  docker-compose down
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>