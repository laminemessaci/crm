# CRM Application

CRM (Customer Relationship Management) is a web application built with Symfony 6 and React for managing customer relationships and interactions. It allows you to keep track of customers, their interactions, and other related data.
## Demo: 



https://github.com/laminemessaci/crm/assets/60298344/4f2c729b-9681-4d0d-9fb6-ad2d08d1b2d0


## API: 
![ScreenShot_20231105154332](https://github.com/laminemessaci/crm/assets/60298344/8bf3b0f5-b166-4e05-b90c-aabb8651802e)



- **Customer Management:** Easily add, edit, and delete customer information.
- **Interaction Tracking:** Record customer interactions, notes, and communications.
- **Search and Filter:** Quickly find customers and interactions with powerful search and filter options.
- **Responsive Design:** The application is designed to work on both desktop and mobile devices.
- **Integration:** Seamlessly integrates Symfony and React for a modern and efficient development stack.

## Prerequisites

Before you get started, make sure you have the following dependencies installed:

- PHP (>=8.1)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (>=16.16.0)
- [Symfony CLI](https://symfony.com/download)
- Database (e.g., MySQL, PostgreSQL)

## Installation

Follow these steps to set up and run the application:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/crm.git
   cd crm
   composer install
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate
   symfony server:start
   npm run dev-server

* Visit http://localhost:8000 in your browser to access the CRM application.

  
## Dependancies: 

- [Symfony](https://symfony.com/): Symfony is a PHP framework for web applications.
- [Symfony Apache Pack](https://symfony.com/doc/current/setup/web_server_configuration.html): Provides an Apache web server configuration for Symfony.
- [API Platform](https://api-platform.com/): A framework for building modern web APIs with Symfony.
- [Doctrine](https://www.doctrine-project.org/): An object-relational mapping (ORM) for PHP.
- [Lexik JWT Authentication Bundle](https://github.com/lexik/LexikJWTAuthenticationBundle): Provides JWT (JSON Web Token) authentication for Symfony applications.
- [Nelmio Cors Bundle](https://github.com/nelmio/NelmioCorsBundle): A bundle for handling Cross-Origin Resource Sharing (CORS) in Symfony applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/): A library for routing in React applications.
- [axios](https://axios-http.com/): A promise-based HTTP client for JavaScript.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a .env file.
- [jwt-decode](https://www.npmjs.com/package/jwt-decode): Decodes JWTs (JSON Web Tokens) in JavaScript.
- [moment](https://momentjs.com/): A JavaScript library for parsing, validating, and formatting dates.
- [react-content-loader](https://github.com/danilowoz/react-content-loader): A library for creating placeholder loading components in React.
- [react-dom](https://reactjs.org/docs/react-dom.html): The entry point for working with the DOM in React.
- [react-loading](https://www.npmjs.com/package/react-loading): A set of loading animations for React applications.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): Provides routing components for React applications.
- [react-toastify](https://fkhadra.github.io/react-toastify/): A notification library for React applications.

## Usage

- Navigate to the homepage to start managing your customers and interactions.
- Use the search and filter options to quickly find the information you need.
- Add, edit, or delete customers and interactions as required.

## Contributing

We welcome contributions to enhance the CRM application. If you'd like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your fork.
5. Create a pull request to the `main` branch of the original repository.

## License

This CRM application is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need assistance, feel free to contact us at [lamine.messaci@gmail.com](mailto:lamine.messaci@gmail.com).

---

Enjoy using the CRM application! Thank you for choosing our solution.




