package com.estore.estore_backend;

import com.estore.estore_backend.catalog.entity.Category;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.catalog.repository.CategoryRepository;
import com.estore.estore_backend.catalog.repository.ProductRepository;
import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.repository.InventoryRepository;
import com.estore.estore_backend.review.entity.Review;
import com.estore.estore_backend.review.repository.ReviewRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("!test")
public class DataLoader implements CommandLineRunner {

    private final CategoryRepository categoryRepo;
    private final ProductRepository productRepo;
    private final InventoryRepository inventoryRepo;
    private final ReviewRepository reviewRepo;

    public DataLoader(CategoryRepository categoryRepo,
                      ProductRepository productRepo,
                      InventoryRepository inventoryRepo,
                      ReviewRepository reviewRepo) {
        this.categoryRepo = categoryRepo;
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
        this.reviewRepo = reviewRepo;
    }

    @Override
    public void run(String... args) {

        System.out.println("🚀 DataLoader started...");

        // =========================
        // 🗂️ CATEGORIES
        // =========================
        if (categoryRepo.count() == 0) {

            categoryRepo.save(new Category("Électronique", "Smartphones, laptops, gadgets"));
            categoryRepo.save(new Category("Livres", "Livres techniques et romans"));
            categoryRepo.save(new Category("Sport", "Équipements sportifs"));
            categoryRepo.save(new Category("Mode", "Vêtements et accessoires"));
            categoryRepo.save(new Category("Maison", "Décoration et électroménager"));

            System.out.println("📁 Categories inserted");
        }

        // =========================
        // 📦 PRODUCTS + INVENTORY
        // =========================
        if (productRepo.count() == 0) {

            Category electronics = categoryRepo.findAll().get(0);
            Category books = categoryRepo.findAll().get(1);
            Category sport = categoryRepo.findAll().get(2);
            Category fashion = categoryRepo.findAll().get(3);
            Category home = categoryRepo.findAll().get(4);

            // ✅ BASE IMAGE URL
            String baseUrl = "http://localhost:8080/images/";

            // =========================
            // 💻 ELECTRONICS
            // =========================
            Product laptop = productRepo.save(
                    new Product(
                            "Dell XPS 15",
                            12000,
                            electronics,
                            baseUrl + "laptop.jpg",
                            "Intel i7, 16GB RAM"
                    )
            );

            Product iphone = productRepo.save(
                    new Product(
                            "iPhone 14",
                            11000,
                            electronics,
                            baseUrl + "iphone.jpg",
                            "Apple smartphone"
                    )
            );

            Product samsung = productRepo.save(
                    new Product(
                            "Samsung S23",
                            9500,
                            electronics,
                            baseUrl + "s23.jpg",
                            "Android flagship"
                    )
            );

            // =========================
            // 📚 BOOKS
            // =========================
            Product cleanCode = productRepo.save(
                    new Product(
                            "Clean Code",
                            300,
                            books,
                            baseUrl + "cleancode.jpg",
                            "Robert C. Martin"
                    )
            );

            Product springBook = productRepo.save(
                    new Product(
                            "Spring Boot Guide",
                            400,
                            books,
                            baseUrl + "spring.jpg",
                            "Backend mastery"
                    )
            );

            // =========================
            // ⚽ SPORT
            // =========================
            Product ball = productRepo.save(
                    new Product(
                            "FIFA Ball",
                            250,
                            sport,
                            baseUrl + "ball.jpg",
                            "Official match ball"
                    )
            );

            Product shoes = productRepo.save(
                    new Product(
                            "Nike Running Shoes",
                            1200,
                            sport,
                            baseUrl + "shoes.jpg",
                            "Comfort running shoes"
                    )
            );

            // =========================
            // 👕 FASHION
            // =========================
            Product tshirt = productRepo.save(
                    new Product(
                            "Basic T-Shirt",
                            99,
                            fashion,
                            baseUrl + "tshirt.jpg",
                            "Cotton t-shirt"
                    )
            );

            Product jeans = productRepo.save(
                    new Product(
                            "Levi's Jeans",
                            499,
                            fashion,
                            baseUrl + "jeans.jpg",
                            "Slim fit jeans"
                    )
            );

            // =========================
            // 🏠 HOME
            // =========================
            Product blender = productRepo.save(
                    new Product(
                            "Blender Moulinex",
                            800,
                            home,
                            baseUrl + "blender.jpg",
                            "Kitchen blender"
                    )
            );

            Product lamp = productRepo.save(
                    new Product(
                            "LED Lamp",
                            150,
                            home,
                            baseUrl + "lamp.jpg",
                            "Modern lamp"
                    )
            );

            // =========================
            // 📊 INVENTORY
            // =========================
            inventoryRepo.save(new Inventory(laptop.getId(), 10));
            inventoryRepo.save(new Inventory(iphone.getId(), 20));
            inventoryRepo.save(new Inventory(samsung.getId(), 15));

            inventoryRepo.save(new Inventory(cleanCode.getId(), 50));
            inventoryRepo.save(new Inventory(springBook.getId(), 40));

            inventoryRepo.save(new Inventory(ball.getId(), 30));
            inventoryRepo.save(new Inventory(shoes.getId(), 25));

            inventoryRepo.save(new Inventory(tshirt.getId(), 100));
            inventoryRepo.save(new Inventory(jeans.getId(), 60));

            inventoryRepo.save(new Inventory(blender.getId(), 18));
            inventoryRepo.save(new Inventory(lamp.getId(), 45));

            System.out.println("📦 Products + Inventory inserted");
        }

        // =========================
        // 🌟 REVIEWS
        // =========================
        if (reviewRepo.count() == 0) {

            Product product1 = productRepo.findAll().get(0);
            Product product2 = productRepo.findAll().get(1);
            Product product3 = productRepo.findAll().get(2);

            Review r1 = new Review();
            r1.setProductId(product1.getId());
            r1.setUserId(1L);
            r1.setUserName("Karim");
            r1.setRating(5);
            r1.setComment("Produit incroyable, très performant !");
            reviewRepo.save(r1);

            Review r2 = new Review();
            r2.setProductId(product2.getId());
            r2.setUserId(2L);
            r2.setUserName("Sara");
            r2.setRating(4);
            r2.setComment("Très bon mais un peu cher");
            reviewRepo.save(r2);

            Review r3 = new Review();
            r3.setProductId(product3.getId());
            r3.setUserId(3L);
            r3.setUserName("Youssef");
            r3.setRating(5);
            r3.setComment("Excellent rapport qualité/prix");
            reviewRepo.save(r3);

            System.out.println("🌟 Reviews inserted");
        }

        System.out.println("✅ DataLoader finished");
    }
}