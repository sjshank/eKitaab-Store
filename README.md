# E-Kitaab Store

    _The purpose of the website is to provide an online catalog for a small local library, where users can browse, read available books and manage their accounts_

## Non-Functional Features

    - SEO support added : robots.txt, sitemap.xml, sitemap generator on every build run
    - CSP header added for all route : XSS protection, content security
    - Other headers added for all route : X_FRAME_OPTION, X_CONTENT_TYPE_OPTION, REFERRER_POLICY, STRICT_TRANSPORT_SECURITY, X-DNS-Prefetch-Control
    - CORS added for route handlers : Access-Control-Allow-Origin, Access-Control-Allow-Methods
    - Mongodb connection for Dev & Prod : Global type for Mongoclient (Dev)
    - Env variables support : security headers, sitemap, mongodb uri
    - Typescript support
    - Core Web-Vitals support
    - Responsive behavior
    - Bundle analyzer support
    - Enabled SWCMinify : Replaced Terser with SWC for minifying JavaScript
    - Express-validator : NextJS APIs validator with Middleware to integrate with express-validator
    - Formik & Yup : Implemented to render forms, submit data & client validation
    - useMemo, React.memo, useCallback : Memiozed & optimize component performance
    - HOC :  Reuse component logic, form layout, page layout
    - Constants : Static dropdown values
    - ValidationRules : Added to validate & sanitize inputs at API route handler
    - Helper : utility functions added
    - Engine Locking : Developers to use the same Node engine and package manager. (.nvmrc - which version of Node), (.npmrc - which package manager)
    - Code Formatting : Prettier take care of automatically formatting our files for us (.prettierrc)
    - Quality Tools : EsLint - For best practices on coding standards.  (.eslintrc.json)
    - Git Hooks : Husky is a tool for running scripts at different stages of the git process, for example add, commit, push, etc
        - npx husky add .husky/pre-commit "npm run lint" : Run eslint rules before commit
        - npx husky add .husky/pre-push "npm run build" : Build project before commit
        - commitlint.config.js : follow a standard convention for all our commit messages

## Dependencies

    - React :  [18.2](https://react.dev/learn/installation)
    - MUI : [5.15](https://mui.com/)
    - MongoDB : [6.4](https://www.mongodb.com/)
    - Formik : [2.4](https://formik.org/)
    - Typescript : [5](https://www.typescriptlang.org/)
    - Snyk : [1.12](https://snyk.io/)
