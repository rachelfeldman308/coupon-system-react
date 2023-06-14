class AppConfig {

    public loginUrl = "http://localhost:8080/auth/login";
    public adminUrl = "http://localhost:8080/api/admim";
    public companyUrl = "http://localhost:8080/api/company";
    public customerUrl = "http://localhost:8080/api/customer";
    public homerUrl = "http://localhost:8080/all-coupons";
}

const appConfig = new AppConfig(); 

export default appConfig;
