### Installation
1. **Clone this repo**
2. **Access the project directory**
3. ***For the backend***
```
cd api
```
**Install the Project Dependencies from the Composer**
```
composer install
```
**Install NPM Dependencies**
```
npm install
```
**Create a Copy of Your .env File**
```
cp .env.example .env
```
**Generate Your Encryption Key**
```
php artisan key:generate
```
**Add the Tables of Your Database with Migrations**
```
php artisan migrate
```
**Run the server**
```
php artisan serve
```

4. ***For the frontend***
```
npm install
```
```
npm run dev
```
