# NessJS microservices

## Introduction
This project using NestJS to perform a microservices architecture. I separate services into small part for better performance and easies to maintanace. It's might be not perfect in every path. Just feel free and let it be your good idea to make your own.

## Description
This project contains API gateway and microservices (only user-service for now) that communicate with GRPC. An HTTP request must be handled by API gateway, then use authentication guard and use internal service for next step if authentication is pass. 

## Getting started
- You can run docker-compose in gateway and microservices folder
- Then you can test api using http://localhost:3000/doc 

## Tech Stack
- NestJS
- GRPC
- Seqeulize 
- Swagger
- PostgreSQL
- Docker

## If I have more time, I would ...
- Improve unit tests for better performance
- Add migrations for with Seqeulize
- Handle more gracefuly logs and errors
- Use cache from NestJS or Redis (Redis is better choice)
- Implement message queue using Kafka
- Add load balancer with NGINX
- I would to create full-text-search and indexing data on PosrgreSQL for search performance

## Ref
- https://docs.nestjs.com/
- https://dev.to/carlillo/part-10-testing-backend-testing-unit-testing-controllers-573a
- https://sequelize.org/
- https://levelup.gitconnected.com/nestjs-microservices-with-grpc-api-gateway-and-authentication-part-1-2-650009c03686
- https://levelup.gitconnected.com/nestjs-microservices-with-grpc-api-gateway-and-authentication-part-2-2-d67dc8e3b86a
- https://microservices.io/patterns/data/database-per-service.html
