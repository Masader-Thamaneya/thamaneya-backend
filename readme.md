# 🌍 API Access Instructions

Welcome! You can easily test our API using the instructions below.

---

## 🔗 Base URL for Testing (Dev Tunnel)

Use this base URL to access the API endpoints:

https://t2vhjcr3-3000.euw.devtunnels.ms/api/

Use this structure for all other routes, for example:

- `GET https://t2vhjcr3-3000.euw.devtunnels.ms/api/auth/login`
- `POST https://t2vhjcr3-3000.euw.devtunnels.ms/api/companies`
- `PUT https://t2vhjcr3-3000.euw.devtunnels.ms/api/reports/:id`

---

You can explore and test all API endpoints using the Postman collection:

🔗 **[Postman Documentation](https://red-rocket-605791.postman.co/workspace/97f0c804-5c6a-46f2-83e9-cf2a1c1fdb16/collection/32762412-77049098-6cdf-4ce6-9884-f4071c14c611)**

The collection includes:

- Auth endpoints
- Report creation
- Emissions calculations
- User management
- ...and more

If the dev tunnel is not working or you're developing locally, you can run the project using Docker:

- download doker desktop
- clone the project's development branch locally
- run this command in the root of the project
  docker compose up --build
- test on localhost:3000/api
